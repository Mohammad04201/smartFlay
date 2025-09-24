// test-gemini.js - ملف اختبار Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');

// مفتاح API الخاص بك
const API_KEY = 'AIzaSyACEJkJRFoCN666hCHEWs9MvbKmVngwTWU';

async function testGeminiAPI() {
  try {
    console.log('🧪 بدء اختبار Gemini API...\n');
    
    // تهيئة Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('✅ تم تهيئة Gemini بنجاح');
    
    // الحصول على النموذج
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('✅ تم الحصول على النموذج gemini-1.5-flash');
    
    // اختبار بسيط
    const prompt = 'أجب على هذا السؤال باللغة العربية: ما هي عاصمة المملكة العربية السعودية؟';
    console.log('\n📝 إرسال الاستعلام:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n🤖 رد Gemini:');
    console.log(text);
    console.log('\n✅ تم اختبار Gemini API بنجاح!');
    
    // اختبار أكثر تعقيداً
    console.log('\n🧪 اختبار متقدم: تحليل استعلام رحلة طيران...');
    
    const flightPrompt = `
    تحليل استعلام رحلة طيران وتحويله إلى معايير بحث.
    
    استعلام المستخدم: "أريد رحلة من الرياض إلى دبي غداً"
    
    قم بتحليل النص واستخراج المعلومات التالية:
    - مدينة المغادرة (departure)
    - مدينة الوصول (arrival)
    - التاريخ (date)
    - الوقت (time)
    - شركة الطيران (airline)
    - السعر الأقصى (maxPrice)
    
    أعد النتيجة كـ JSON object.
    `;
    
    const flightResult = await model.generateContent(flightPrompt);
    const flightResponse = await flightResult.response;
    const flightText = flightResponse.text();
    
    console.log('\n✈️ رد Gemini على استعلام الرحلة:');
    console.log(flightText);
    
    // محاولة تحليل JSON
    try {
      const parsed = JSON.parse(flightText);
      console.log('\n✅ تم تحليل JSON بنجاح:');
      console.log(JSON.stringify(parsed, null, 2));
    } catch (parseError) {
      console.log('\n⚠️ لم يتم تحليل JSON، لكن API يعمل:');
      console.log(parseError.message);
    }
    
    console.log('\n🎉 جميع الاختبارات تمت بنجاح! Gemini API يعمل بشكل صحيح.');
    
  } catch (error) {
    console.error('\n❌ خطأ في اختبار Gemini API:');
    console.error('نوع الخطأ:', error.name);
    console.error('رسالة الخطأ:', error.message);
    
    if (error.message.includes('API_KEY')) {
      console.error('\n💡 المشكلة: مفتاح API غير صحيح أو منتهي الصلاحية');
      console.error('🔑 تأكد من أن المفتاح صحيح:', API_KEY);
    } else if (error.message.includes('quota')) {
      console.error('\n💡 المشكلة: تم استنفاذ الحصة اليومية');
      console.error('📊 تحقق من استخدام API في Google Cloud Console');
    } else if (error.message.includes('network')) {
      console.error('\n💡 المشكلة: مشكلة في الاتصال بالشبكة');
      console.error('🌐 تحقق من اتصال الإنترنت');
    } else {
      console.error('\n💡 مشكلة غير معروفة، تحقق من:');
      console.error('1. صحة مفتاح API');
      console.error('2. تفعيل Gemini API في Google Cloud');
      console.error('3. إعدادات الأمان والقيود');
    }
  }
}

// تشغيل الاختبار
console.log('🚀 بدء اختبار Gemini API...\n');
testGeminiAPI();
