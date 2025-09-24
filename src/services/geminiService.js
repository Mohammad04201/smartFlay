// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// تهيئة Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyACEJkJRFoCN666hCHEWs9MvbKmVngwTWU');

// تحليل استعلام المستخدم باستخدام Gemini
export async function analyzeFlightQuery(userQuery) {
  try {
    // استخدام Gemini API مباشرة
    console.log('Using Gemini API for query analysis');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    تحليل استعلام رحلة طيران وتحويله إلى معايير بحث.
    
    استعلام المستخدم: "${userQuery}"
    
    قم بتحليل النص واستخراج المعلومات التالية:
    - مدينة المغادرة (departure)
    - مدينة الوصول (arrival)
    - التاريخ (date) - إذا تم تحديده
    - الوقت (time) - إذا تم تحديده
    - شركة الطيران (airline) - إذا تم تحديدها
    - السعر الأقصى (maxPrice) - إذا تم تحديده
    
    أعد النتيجة كـ JSON object فقط بدون أي تنسيق إضافي أو تعليقات:
    {
      "departure": "اسم المدينة أو null",
      "arrival": "اسم المدينة أو null", 
      "date": "التاريخ أو null",
      "time": "الوقت أو null",
      "airline": "اسم الشركة أو null",
      "maxPrice": "السعر أو null"
    }
    
    إذا لم يتم العثور على معلومات محددة، استخدم null.
    لا تضيف أي نصوص أخرى أو تنسيق Markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // محاولة تحليل JSON مع معالجة تنسيق Markdown
    try {
      // إزالة تنسيق Markdown إذا وجد
      let cleanText = text.trim();
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      return JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', text);
      return performLocalSearch(userQuery);
    }
  } catch (error) {
    console.error('Error analyzing query with Gemini:', error);
    // في حالة فشل Gemini، استخدم البحث المحلي
    return performLocalSearch(userQuery);
  }
}

// البحث المحلي كبديل لـ Gemini
function performLocalSearch(userQuery) {
  const query = userQuery.toLowerCase();
  const result = {
    departure: null,
    arrival: null,
    date: null,
    time: null,
    airline: null,
    maxPrice: null
  };

  // المدن المتاحة
  const cities = [
    'riyadh', 'jeddah', 'dammam', 'mecca', 'medina',
    'dubai', 'abu dhabi', 'sharjah', 'al ain',
    'doha', 'manama', 'kuwait', 'muscat',
    'cairo', 'alexandria', 'amman', 'beirut', 'baghdad'
  ];

  // شركات الطيران
  const airlines = [
    'saudi airlines', 'emirates', 'qatar airways', 
    'gulf air', 'kuwait airways', 'oman air'
  ];

  // البحث عن مدينة المغادرة
  for (const city of cities) {
    if (query.includes(city)) {
      if (!result.departure) {
        result.departure = city;
      } else if (!result.arrival) {
        result.arrival = city;
      }
    }
  }

  // البحث عن شركة الطيران
  for (const airline of airlines) {
    if (query.includes(airline)) {
      result.airline = airline;
      break;
    }
  }

  // البحث عن السعر
  const priceMatch = query.match(/(\d+)\s*(دينار|دولار|usd|sar)/i);
  if (priceMatch) {
    result.maxPrice = priceMatch[1];
  }

  return result;
}

// البحث الذكي في الرحلات باستخدام Gemini مع فهم طبيعي للغة
export async function smartFlightSearch(userQuery, flights, context = null) {
  try {
    // إذا كان هناك سياق كامل، استخدم Gemini للرد الذكي
    if (context) {
      return await generateSmartResponse(userQuery, context);
    }
    
    // استخدام Gemini لفهم الاستعلام وإنشاء رد ذكي
    const intelligentResponse = await generateIntelligentChatResponse(userQuery, flights);
    
    return intelligentResponse;
  } catch (error) {
    console.error('Error in smart flight search:', error);
    // في حالة الخطأ، استخدم البحث المحلي الذكي
    return await fallbackIntelligentSearch(userQuery, flights);
  }
}

// إنشاء رد ذكي شامل باستخدام Gemini
export async function generateIntelligentChatResponse(userQuery, flights) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `أنت مساعد ذكي لحجز الطيران يشبه ChatGPT/Gemini. يجب أن تفهم الاستعلامات الطبيعية وتجيب بذكاء.

الرحلات المتاحة:
${JSON.stringify(flights.slice(0, 20), null, 2)}

استعلام المستخدم: "${userQuery}"

تعليمات مهمة:
1. إذا كان الاستعلام عام (مثل "كيف حالك" أو "مرحبا") - أجب بطريقة ودية ولا تعرض رحلات
2. إذا كان الاستعلام متعلق بالرحلات - ابحث وفلتر الرحلات المناسبة
3. إذا لم تجد رحلات مناسبة - اقترح بدائل أو اسأل عن تفاصيل أكثر
4. كن طبيعياً ومفيداً مثل مساعد ذكي حقيقي

أعد الرد كـ JSON object:
{
  "response": "الرد النصي باللغة العربية",
  "flights": [الرحلات المناسبة أو مصفوفة فارغة],
  "suggestions": ["اقتراح 1", "اقتراح 2", "اقتراح 3"],
  "isFlightRelated": true/false
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // تنظيف الرد من تنسيق Markdown
    text = text.trim();
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const parsedResponse = JSON.parse(text);
    
    return {
      reply: parsedResponse.response,
      flights: parsedResponse.flights || [],
      suggestions: parsedResponse.suggestions || [],
      searchCriteria: null,
      isFlightRelated: parsedResponse.isFlightRelated
    };
    
  } catch (error) {
    console.error('Error generating intelligent response:', error);
    return await fallbackIntelligentSearch(userQuery, flights);
  }
}

// نظام احتياطي ذكي للرد على الاستعلامات
export async function fallbackIntelligentSearch(userQuery, flights) {
  const query = userQuery.toLowerCase();
  
  // فحص إذا كان الاستعلام عام أم متعلق بالرحلات
  const generalGreetings = ['مرحبا', 'السلام عليكم', 'كيف حالك', 'أهلا', 'hello', 'hi', 'how are you'];
  const isGeneral = generalGreetings.some(greeting => query.includes(greeting));
  
  if (isGeneral) {
    return {
      reply: 'مرحباً بك! أنا مساعدك الذكي في SmartFly. يمكنني مساعدتك في البحث عن الرحلات وحجزها. كيف يمكنني مساعدتك اليوم؟',
      flights: [],
      suggestions: [
        'أرني الرحلات المتاحة',
        'أريد رحلة من الرياض إلى دبي',
        'ما هي أرخص الرحلات؟',
        'ساعدني في اختيار رحلة'
      ],
      searchCriteria: null,
      isFlightRelated: false
    };
  }
  
  // البحث في الرحلات
  const searchCriteria = performLocalSearch(userQuery);
  let filteredFlights = flights;
  
  // تطبيق الفلاتر
  if (searchCriteria.departure) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.departure && flight.departure.toLowerCase().includes(searchCriteria.departure)
    );
  }
  
  if (searchCriteria.arrival) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.arrival && flight.arrival.toLowerCase().includes(searchCriteria.arrival)
    );
  }
  
  if (searchCriteria.airline) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.airline && flight.airline.toLowerCase().includes(searchCriteria.airline)
    );
  }
  
  if (searchCriteria.maxPrice) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.price && parseFloat(flight.price) <= parseFloat(searchCriteria.maxPrice)
    );
  }
  
  let reply = '';
  if (filteredFlights.length > 0) {
    reply = `وجدت ${filteredFlights.length} رحلة تناسب طلبك:\n\n`;
    filteredFlights.slice(0, 5).forEach((flight, i) => {
      reply += `${i + 1}. ${flight.airline} - ${flight.departure} → ${flight.arrival}\n`;
      reply += `   📅 ${flight.date} | 💰 ${flight.price} دينار\n\n`;
    });
  } else {
    reply = 'لم أجد رحلات تناسب طلبك. يمكنك تجربة معايير بحث أخرى أو اسألني عن رحلات محددة.';
  }
  
  return {
    reply,
    flights: filteredFlights.slice(0, 10),
    suggestions: [
      'أرني المزيد من الرحلات',
      'أريد رحلة أرخص',
      'ما هي أفضل شركة طيران؟',
      'ساعدني في اختيار التاريخ'
    ],
    searchCriteria,
    isFlightRelated: true
  };
}

// إنشاء رد ذكي باستخدام Gemini مع السياق الكامل
export async function generateSmartResponse(userQuery, context) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${context}

أجب بطريقة ودية ومفيدة باللغة العربية. استخدم المعلومات المتاحة لتقديم إجابة دقيقة ومفيدة.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating smart response:', error);
    return 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.';
  }
}
