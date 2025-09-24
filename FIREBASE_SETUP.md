# دليل إعداد Firebase للمشروع

## 1. إعداد مشروع Firebase

### الخطوة الأولى: إنشاء مشروع Firebase
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "Add project"
3. أدخل اسم المشروع: `smartfly`
4. اتبع الخطوات لإكمال إنشاء المشروع

### الخطوة الثانية: تفعيل الخدمات المطلوبة

#### تفعيل Firestore Database
1. في لوحة التحكم، اذهب إلى "Firestore Database"
2. انقر على "Create database"
3. اختر "Start in test mode" (للاختبار)
4. اختر موقع قاعدة البيانات (الأقرب لمنطقتك)

#### تفعيل Cloud Functions
1. اذهب إلى "Functions"
2. انقر على "Get started"
3. اتبع الخطوات لتفعيل Cloud Functions

#### تفعيل Hosting (اختياري)
1. اذهب إلى "Hosting"
2. انقر على "Get started"
3. اتبع الخطوات لتفعيل Hosting

## 2. تثبيت Firebase CLI

```bash
npm install -g firebase-tools
```

## 3. تسجيل الدخول إلى Firebase

```bash
firebase login
```

## 4. تهيئة المشروع

```bash
cd smartfly
firebase init
```

اختر الخدمات التالية:
- Firestore
- Functions
- Hosting (اختياري)

## 5. إعداد متغيرات البيئة

### إعداد Gemini API Key
```bash
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
```

### إعداد متغيرات أخرى
```bash
firebase functions:config:set project.id="popoop-ecf85"
```

## 6. نشر Cloud Functions

```bash
firebase deploy --only functions
```

## 7. نشر قواعد Firestore

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## 8. اختبار الوظائف

### اختبار إضافة رحلة
```bash
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/addFlight \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "SV-123",
    "airline": "Saudi Airlines",
    "departure": "Riyadh",
    "arrival": "Jeddah",
    "date": "2024-01-15",
    "time": "10:00",
    "price": 500
  }'
```

### اختبار البحث الذكي
```bash
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/searchFlights \
  -H "Content-Type: application/json" \
  -d '{
    "query": "رحلات من الرياض إلى جدة"
  }'
```

## 9. مراقبة الأداء

### عرض سجلات Functions
```bash
firebase functions:log
```

### مراقبة Firestore
- اذهب إلى Firebase Console
- اختر "Firestore Database"
- انقر على "Usage" لمراقبة الاستخدام

## 10. إعدادات الأمان

### تحديث قواعد Firestore
عدّل ملف `firestore.rules` حسب احتياجاتك:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /flights/{flightId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 11. استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### مشكلة: Functions لا تعمل
```bash
# تأكد من تثبيت التبعيات
cd functions
npm install

# اختبار محلي
firebase emulators:start
```

#### مشكلة: قواعد Firestore تمنع الكتابة
- تأكد من أن المستخدم مسجل دخول
- تحقق من قواعد الأمان في `firestore.rules`

#### مشكلة: Gemini API لا يعمل
- تأكد من صحة مفتاح API
- تحقق من تفعيل Gemini API في Google Cloud Console

## 12. تحسين الأداء

### إضافة فهارس للاستعلامات المعقدة
عدّل ملف `firestore.indexes.json` حسب احتياجاتك.

### تحسين Cloud Functions
- استخدم caching للبيانات المتكررة
- قلل من عدد استدعاءات API الخارجية

## 13. النشر للإنتاج

### بناء التطبيق
```bash
npm run build
```

### نشر Hosting
```bash
firebase deploy --only hosting
```

### نشر كل شيء
```bash
firebase deploy
```

## 14. مراقبة التكلفة

### مراقبة استخدام Firestore
- اذهب إلى Firebase Console
- اختر "Usage and billing"
- راقب استخدام Firestore و Functions

### نصائح لتقليل التكلفة
- استخدم الفهارس بحكمة
- قلل من عدد استدعاءات Functions
- استخدم caching حيثما أمكن

## 15. النسخ الاحتياطي

### تصدير بيانات Firestore
```bash
firebase firestore:export --project=popoop-ecf85
```

### استيراد البيانات
```bash
firebase firestore:import --project=popoop-ecf85
```

## ملاحظات مهمة

1. **الأمان**: تأكد من تحديث قواعد Firestore قبل النشر للإنتاج
2. **التكلفة**: راقب استخدام Firebase لتجنب التكاليف غير المتوقعة
3. **الأداء**: استخدم الفهارس لتحسين أداء الاستعلامات
4. **النسخ الاحتياطي**: احتفظ بنسخ احتياطية منتظمة من البيانات
5. **المراقبة**: راقب سجلات Functions والأخطاء بانتظام
