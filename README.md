# SmartFly - منصة حجز الرحلات الذكية

## نظرة عامة

SmartFly هي منصة حجز رحلات طيران ذكية تستخدم React و Firebase مع دمج Gemini AI للبحث الذكي والتفاعل الطبيعي.

## الميزات الرئيسية

### 🚀 الميزات الأساسية
- **واجهة مستخدم حديثة** باستخدام React و Bootstrap
- **إدارة الرحلات** - إضافة وتعديل وحذف الرحلات
- **البحث الذكي** باستخدام Gemini AI
- **قاعدة بيانات في الوقت الفعلي** باستخدام Firebase Firestore
- **Cloud Functions** للعمليات المعقدة
- **دعم اللغة العربية** في الواجهة والبحث

### 🤖 الذكاء الاصطناعي
- **البحث باللغة الطبيعية** - "رحلات من الرياض إلى جدة"
- **تحليل الاستعلامات** باستخدام Gemini AI
- **فلترة ذكية** للرحلات حسب المعايير المختلفة
- **دعم متعدد اللغات** (العربية والإنجليزية)

### 🔥 Firebase Integration
- **Firestore Database** لتخزين البيانات
- **Cloud Functions** للعمليات الخلفية
- **Authentication** (قابل للتطوير)
- **Hosting** للنشر
- **Real-time updates** للتحديثات الفورية

## التقنيات المستخدمة

### Frontend
- **React 19** - مكتبة واجهة المستخدم
- **React Router** - التنقل بين الصفحات
- **Bootstrap 5** - تصميم متجاوب
- **Font Awesome** - الأيقونات

### Backend & Database
- **Firebase Firestore** - قاعدة البيانات
- **Firebase Cloud Functions** - الخدمات الخلفية
- **Firebase Hosting** - استضافة التطبيق

### AI & Search
- **Google Gemini AI** - البحث الذكي
- **Natural Language Processing** - معالجة اللغة الطبيعية

## التثبيت والتشغيل

### المتطلبات الأساسية
- Node.js (v16 أو أحدث)
- npm أو yarn
- حساب Firebase
- مفتاح Gemini API

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd smartfly
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد Firebase**
```bash
npm install -g firebase-tools
firebase login
firebase init
```

4. **إعداد متغيرات البيئة**
أنشئ ملف `.env` في مجلد المشروع:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

5. **تشغيل المشروع**
```bash
npm start
```

### إعداد Firebase

راجع ملف `FIREBASE_SETUP.md` للحصول على دليل مفصل لإعداد Firebase.

## هيكل المشروع

```
smartfly/
├── src/
│   ├── components/          # مكونات React
│   │   ├── MainNavbar.js   # شريط التنقل الرئيسي
│   │   ├── Sidebar.js      # الشريط الجانبي
│   │   └── FlightCard.js   # بطاقة الرحلة
│   ├── pages/              # صفحات التطبيق
│   │   ├── Home.js         # الصفحة الرئيسية
│   │   ├── Airlines.js     # صفحة شركات الطيران
│   │   └── CreateFlight.js # إضافة رحلة جديدة
│   ├── utils/              # أدوات مساعدة
│   │   └── geminiService.js # خدمة Gemini AI
│   ├── firebase.js         # إعدادات Firebase
│   └── App.js              # المكون الرئيسي
├── functions/              # Firebase Cloud Functions
│   ├── index.js           # وظائف السحابة
│   └── package.json       # تبعيات Functions
├── firestore.rules        # قواعد أمان Firestore
├── firestore.indexes.json # فهارس Firestore
└── firebase.json          # إعدادات Firebase
```

## كيفية الاستخدام

### إضافة رحلة جديدة
1. اذهب إلى صفحة "Add Flight"
2. املأ البيانات المطلوبة
3. اضغط "Save Flight"
4. ستظهر الرحلة في الصفحة الرئيسية

### البحث الذكي
يمكنك البحث باستخدام جمل طبيعية مثل:
- "رحلات من الرياض إلى جدة"
- "أرخص رحلات من دبي"
- "رحلات السعودية غداً"
- "رحلات أقل من 1000 ريال"

### التنقل
- استخدم الشريط الجانبي للتنقل بين الصفحات
- الشريط الجانبي قابل للطي في الشاشات الصغيرة

## API Endpoints

### Cloud Functions

#### البحث الذكي
```http
POST /searchFlights
Content-Type: application/json

{
  "query": "رحلات من الرياض إلى جدة"
}
```

#### إضافة رحلة
```http
POST /addFlight
Content-Type: application/json

{
  "flightNumber": "SV-123",
  "airline": "Saudi Airlines",
  "departure": "Riyadh",
  "arrival": "Jeddah",
  "date": "2024-01-15",
  "time": "10:00",
  "price": 500
}
```

#### جلب الرحلات
```http
GET /getFlights
```

## النشر

### النشر المحلي
```bash
npm run build
firebase serve
```

### النشر للإنتاج
```bash
npm run build
firebase deploy
```

## المراقبة والصيانة

### مراقبة الأداء
```bash
firebase functions:log
```

### مراقبة قاعدة البيانات
- اذهب إلى Firebase Console
- اختر "Firestore Database"
- راقب الاستخدام والأداء

### النسخ الاحتياطي
```bash
firebase firestore:export
```

## المساهمة

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. أنشئ Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الدعم

إذا واجهت أي مشاكل أو لديك أسئلة:
1. راجع ملف `FIREBASE_SETUP.md`
2. تحقق من سجلات Firebase Functions
3. راجع وثائق Firebase و Gemini API

## التطوير المستقبلي

- [ ] إضافة نظام المصادقة
- [ ] دعم المدفوعات
- [ ] إشعارات في الوقت الفعلي
- [ ] تطبيق موبايل
- [ ] دعم المزيد من اللغات
- [ ] تحسينات في الذكاء الاصطناعي

## الشكر والتقدير

- Firebase Team للبنية التحتية الممتازة
- Google AI Team لـ Gemini API
- React Team للواجهة الممتازة
- Bootstrap Team للتصميم المتجاوب
