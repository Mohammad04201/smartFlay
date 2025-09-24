# دليل التشغيل السريع - SmartFly

## 🚀 تشغيل المشروع في 5 خطوات

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد متغيرات البيئة
أنشئ ملف `.env` في مجلد المشروع وأضف:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. تشغيل المشروع
```bash
npm start
```

### 4. فتح المتصفح
اذهب إلى: `http://localhost:3000`

### 5. اختبار الميزات
- ✅ التنقل بين الصفحات
- ✅ إضافة رحلات جديدة
- ✅ البحث الذكي (إذا كان Gemini API مفعل)

## 🔧 إعداد Firebase (اختياري)

### تثبيت Firebase CLI
```bash
npm install -g firebase-tools
```

### تسجيل الدخول
```bash
firebase login
```

### تهيئة المشروع
```bash
firebase init
```

### نشر Functions
```bash
firebase deploy --only functions
```

## 🎯 الميزات المتاحة

### ✅ تعمل بدون إعداد إضافي
- التنقل بين الصفحات
- واجهة المستخدم
- إضافة الرحلات (محلياً)
- عرض شركات الطيران

### 🔄 تحتاج إعداد إضافي
- البحث الذكي (Gemini API)
- حفظ البيانات في Firebase
- Cloud Functions

## 🐛 استكشاف الأخطاء

### مشكلة: المشروع لا يبدأ
```bash
# تأكد من تثبيت التبعيات
npm install

# امسح الكاش
npm start -- --reset-cache
```

### مشكلة: البحث الذكي لا يعمل
- تأكد من إضافة مفتاح Gemini API في ملف `.env`
- تأكد من تفعيل Gemini API في Google Cloud Console

### مشكلة: Firebase لا يعمل
- تأكد من إعداد Firebase CLI
- تأكد من نشر Functions
- تحقق من قواعد Firestore

## 📱 اختبار التطبيق

### إضافة رحلة تجريبية
1. اذهب إلى "Add Flight"
2. املأ البيانات:
   - Flight Number: `SV-123`
   - Airline: `Saudi Airlines`
   - Departure: `Riyadh`
   - Arrival: `Jeddah`
   - Date: `2024-01-15`
   - Time: `10:00`
   - Price: `500`
3. اضغط "Save Flight"

### اختبار التنقل
- انقر على الروابط في الشريط الجانبي
- تأكد من إغلاق الـ Sidebar عند النقر

## 🎨 تخصيص التطبيق

### تغيير الألوان
عدّل ملف `src/App.css` لتغيير الألوان

### إضافة شركات طيران جديدة
عدّل مصفوفة `airlines` في `src/pages/Airlines.js`

### تغيير المدن المتاحة
عدّل مصفوفة `cities` في `src/pages/CreateFlight.js`

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع ملف `FIREBASE_SETUP.md` لإعداد Firebase
2. راجع ملف `README.md` للدليل الشامل
3. تحقق من سجلات الأخطاء في المتصفح (F12)

## 🚀 النشر للإنتاج

### بناء المشروع
```bash
npm run build
```

### نشر على Firebase Hosting
```bash
firebase deploy --only hosting
```

### نشر كل شيء
```bash
firebase deploy
```

---

**ملاحظة**: هذا الدليل السريع يغطي التشغيل الأساسي. للحصول على جميع الميزات، راجع الدليل الشامل في `README.md`
