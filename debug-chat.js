// debug-chat.js - تصحيح مشكلة الشات
const { GoogleGenerativeAI } = require('@google/generative-ai');

// مفتاح API الخاص بك
const API_KEY = 'AIzaSyACEJkJRFoCN666hCHEWs9MvbKmVngwTWU';

// بيانات رحلات وهمية للاختبار
const sampleFlights = [
  {
    id: '1',
    flightNumber: 'SV-123',
    airline: 'Saudi Airlines',
    departure: 'Riyadh',
    arrival: 'Jeddah',
    date: '2024-01-15',
    time: '10:00',
    price: 500,
    status: 'Available'
  },
  {
    id: '2',
    flightNumber: 'EK-456',
    airline: 'Emirates',
    departure: 'Dubai',
    arrival: 'Riyadh',
    date: '2024-01-16',
    time: '14:30',
    price: 800,
    status: 'Available'
  },
  {
    id: '3',
    flightNumber: 'QR-789',
    airline: 'Qatar Airways',
    departure: 'Doha',
    arrival: 'Jeddah',
    date: '2024-01-17',
    time: '09:15',
    price: 600,
    status: 'Available'
  }
];

async function debugChat() {
  try {
    console.log('🔍 تصحيح مشكلة الشات...\n');
    
    // اختبار 1: تحليل الاستعلام
    console.log('📝 اختبار 1: تحليل الاستعلام "ساعدني في اختيار رحلة"');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    تحليل استعلام رحلة طيران وتحويله إلى معايير بحث.
    
    استعلام المستخدم: "ساعدني في اختيار رحلة"
    
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
    
    console.log('🤖 رد Gemini:', text);
    
    // معالجة JSON
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('\n🧹 النص النظيف:', cleanText);
    
    // تحليل JSON
    try {
      const parsed = JSON.parse(cleanText);
      console.log('\n✅ تم تحليل JSON بنجاح!');
      console.log('📊 النتائج:');
      console.log('- المغادرة:', parsed.departure);
      console.log('- الوصول:', parsed.arrival);
      console.log('- التاريخ:', parsed.date);
      console.log('- الوقت:', parsed.time);
      console.log('- شركة الطيران:', parsed.airline);
      console.log('- السعر الأقصى:', parsed.maxPrice);
      
      // اختبار 2: البحث في الرحلات
      console.log('\n🔍 اختبار 2: البحث في الرحلات');
      
      let filteredFlights = sampleFlights;
      
      if (parsed.departure) {
        filteredFlights = filteredFlights.filter(f => 
          f.departure.toLowerCase().includes(parsed.departure.toLowerCase())
        );
      }
      
      if (parsed.arrival) {
        filteredFlights = filteredFlights.filter(f => 
          f.arrival.toLowerCase().includes(parsed.arrival.toLowerCase())
        );
      }
      
      if (parsed.airline) {
        filteredFlights = filteredFlights.filter(f => 
          f.airline.toLowerCase().includes(parsed.airline.toLowerCase())
        );
      }
      
      if (parsed.maxPrice) {
        filteredFlights = filteredFlights.filter(f => 
          f.price <= parseInt(parsed.maxPrice)
        );
      }
      
      console.log(`\n🎯 نتائج البحث: ${filteredFlights.length} رحلة`);
      filteredFlights.forEach(f => {
        console.log(`- ${f.airline}: ${f.departure} → ${f.arrival} | ${f.date} | ${f.price} ريال`);
      });
      
      // اختبار 3: بناء رد الشات
      console.log('\n💬 اختبار 3: بناء رد الشات');
      
      let botResponse = '';
      if (filteredFlights.length > 0) {
        botResponse = `🎯 **نتائج البحث الذكي من Gemini AI:**\n\n`;
        botResponse += `✅ **تم العثور على ${filteredFlights.length} رحلة:**\n\n`;
        
        if (parsed.departure) {
          botResponse += `🛫 **من:** ${parsed.departure}\n`;
        }
        if (parsed.arrival) {
          botResponse += `🛬 **إلى:** ${parsed.arrival}\n`;
        }
        if (parsed.airline) {
          botResponse += `✈️ **شركة الطيران:** ${parsed.airline}\n`;
        }
        if (parsed.maxPrice) {
          botResponse += `💰 **السعر الأقصى:** ${parsed.maxPrice} ريال\n`;
        }
        
        botResponse += `\n📊 **أفضل النتائج:**\n`;
      } else {
        botResponse = `❌ **لم أجد رحلات تناسب طلبك**\n\n`;
        botResponse += `**Gemini AI يقول:** جرب تغيير معايير البحث أو اسألني بطريقة أخرى.\n\n`;
        botResponse += `**نصائح:**\n`;
        botResponse += `• استخدم أسماء المدن باللغة العربية أو الإنجليزية\n`;
        botResponse += `• حدد تاريخاً محدداً (مثل: 2025-08-25)\n`;
        botResponse += `• اذكر شركة الطيران المفضلة\n`;
        botResponse += `• حدد نطاق السعر (مثل: أقل من 1000 ريال)`;
      }
      
      console.log('\n🤖 رد الشات:');
      console.log(botResponse);
      
      console.log('\n🎉 تصحيح الشات تم بنجاح!');
      console.log('✅ Gemini API يعمل');
      console.log('✅ تحليل JSON يعمل');
      console.log('✅ البحث في الرحلات يعمل');
      console.log('✅ بناء رد الشات يعمل');
      
    } catch (parseError) {
      console.log('\n❌ فشل في تحليل JSON:', parseError.message);
      console.log('🔍 النص الأصلي:', text);
    }
    
  } catch (error) {
    console.error('\n❌ خطأ في تصحيح الشات:', error.message);
  }
}

// تشغيل التصحيح
console.log('🚀 بدء تصحيح مشكلة الشات...\n');
debugChat();








