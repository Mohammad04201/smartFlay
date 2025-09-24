# SmartFly - هيكل المشروع

## 📁 هيكل المجلدات

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── ui/             # مكونات واجهة المستخدم الأساسية
│   │   ├── FlightCard.js
│   │   ├── AiSearchBox.js
│   │   ├── FlightsFilters.js
│   │   └── FlightsGrid.js
│   ├── layout/         # مكونات التخطيط
│   │   ├── MainNavbar.js
│   │   └── Sidebar.js
│   └── features/       # مكونات الميزات المحددة
│       ├── SmartChat.js
│       ├── FlightsChat.js
│       └── ResultsSummary.js
├── pages/              # صفحات التطبيق
│   ├── Home.js
│   ├── Flights.js
│   ├── Airlines.js
│   ├── CreateFlight.js
│   ├── DataManager.js
│   └── SmartDataChat.js
├── services/           # خدمات API والبيانات
│   ├── firebaseService.js
│   ├── geminiService.js
│   └── firestoreDataService.js
├── hooks/              # React Hooks مخصصة
├── utils/              # دوال مساعدة عامة
│   ├── sampleData.js
│   └── firebaseFunction.js
├── constants/          # الثوابت
├── styles/             # ملفات CSS
│   ├── components/
│   └── pages/
└── types/              # أنواع TypeScript (إذا كان مستخدماً)
```

## 🎯 المبادئ التوجيهية

### 1. **المكونات (Components)**
- **ui/**: مكونات واجهة المستخدم الأساسية القابلة لإعادة الاستخدام
- **layout/**: مكونات التخطيط الرئيسية (Navbar, Sidebar)
- **features/**: مكونات الميزات المحددة

### 2. **الصفحات (Pages)**
- كل صفحة في مجلد منفصل
- تحتوي على المنطق الخاص بالصفحة
- تستورد المكونات من مجلد components

### 3. **الخدمات (Services)**
- خدمات API الخارجية
- خدمات قاعدة البيانات
- خدمات الذكاء الاصطناعي

### 4. **الأدوات المساعدة (Utils)**
- دوال مساعدة عامة
- معالجة البيانات
- تحويلات التنسيق

### 5. **الأنماط (Styles)**
- ملفات CSS منظمة حسب المكونات والصفحات
- متغيرات CSS مشتركة
- أنماط متجاوبة

## 📝 قواعد التسمية

### الملفات:
- **PascalCase** للمكونات: `FlightCard.js`
- **camelCase** للخدمات والدوال: `firebaseService.js`
- **kebab-case** للأنماط: `flight-card.css`

### المجلدات:
- **camelCase** للمجلدات العامة: `components`, `services`
- **kebab-case** للمجلدات المحددة: `smart-data-chat`

## 🔧 أفضل الممارسات

1. **فصل المسؤوليات**: كل ملف له مسؤولية واحدة واضحة
2. **إعادة الاستخدام**: المكونات قابلة لإعادة الاستخدام
3. **التوثيق**: تعليقات واضحة باللغة العربية
4. **التنظيم**: ملفات منظمة في مجلدات منطقية
5. **الأداء**: تحسين الأداء من خلال التحميل الكسول

## 🚀 كيفية الاستخدام

### إضافة مكون جديد:
```javascript
// في components/ui/NewComponent.js
import React from 'react';
import './NewComponent.css';

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="new-component">
      {/* محتوى المكون */}
    </div>
  );
};

export default NewComponent;
```

### إضافة خدمة جديدة:
```javascript
// في services/newService.js
export const newService = {
  async fetchData() {
    // منطق الخدمة
  },
  
  async saveData(data) {
    // منطق الحفظ
  }
};
```

### إضافة صفحة جديدة:
```javascript
// في pages/NewPage.js
import React from 'react';
import NewComponent from '../components/ui/NewComponent';
import './NewPage.css';

const NewPage = () => {
  return (
    <div className="new-page">
      <NewComponent />
    </div>
  );
};

export default NewPage;
```
