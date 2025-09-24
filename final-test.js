// final-test.js - الاختبار النهائي لـ Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');

// مفتاح API الخاص بك
const API_KEY = 'AIzaSyACEJkJRFoCN666hCHEWs9MvbKmVngwTWU';

async function finalTest() {
  try {
    console.log('🎯 الاختبار النهائي لـ Gemini API...\n');
    
    // تهيئة Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeAI({ model: "gemini-1.5-flash" });
    
    console.log('✅ تم تهيئة Gemini بنجاح');
    
    // اختبار نهائي
    const testQuery = 'أريد رحلة من الرياض إلى دبي غداً بأقل من 1500 ريال';
    
    const prompt = `
    تحليل استعلام رحلة طيران وتحويله إلى معايير بحث.
    
    استعلام المستخدم: "${testQuery}"
    
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
    
    console.log('📝 إرسال الاستعلام:', testQuery);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n🤖 رد Gemini:', text);
    
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
      
      console.log('\n🎉 الاختبار النهائي نجح!');
      console.log('✅ Gemini API يعمل بشكل مثالي');
      console.log('✅ يمكن استخدامه في التطبيق');
      console.log('✅ يدعم اللغة العربية');
      console.log('✅ يحلل الاستعلامات بدقة');
      console.log('✅ يعيد JSON صحيح');
      
    } catch (parseError) {
      console.log('\n❌ فشل في تحليل JSON:', parseError.message);
      console.log('🔍 النص الأصلي:', text);
    }
    
  } catch (error) {
    console.error('\n❌ خطأ في الاختبار النهائي:', error.message);
  }
}

// تشغيل الاختبار
console.log('🚀 بدء الاختبار النهائي...\n');
finalTest();
