# 🛩️ SmartFly - هيكل المشروع المحسن

## 📋 نظرة عامة

تم إعادة تنظيم مشروع SmartFly ليكون أكثر وضوحاً وقابلية للصيانة والتطوير. الهيكل الجديد يتبع أفضل الممارسات في تطوير تطبيقات React.

## 🏗️ الهيكل الجديد

```
smartfly/src/
├── 📁 components/           # المكونات القابلة لإعادة الاستخدام
│   ├── 📁 ui/              # مكونات واجهة المستخدم الأساسية
│   │   ├── FlightCard.js
│   │   ├── AiSearchBox.js
│   │   ├── FlightsFilters.js
│   │   └── FlightsGrid.js
│   ├── 📁 layout/          # مكونات التخطيط
│   │   ├── MainNavbar.js
│   │   └── Sidebar.js
│   └── 📁 features/        # مكونات الميزات المحددة
│       ├── SmartChat.js
│       ├── FlightsChat.js
│       └── ResultsSummary.js
├── 📁 pages/               # صفحات التطبيق
│   ├── Home.js
│   ├── Flights.js
│   ├── Airlines.js
│   ├── CreateFlight.js
│   ├── DataManager.js
│   └── SmartDataChat.js
├── 📁 services/            # خدمات API والبيانات
│   ├── firebaseService.js
│   ├── geminiService.js
│   └── firestoreDataService.js
├── 📁 hooks/               # React Hooks مخصصة
│   └── index.js
├── 📁 utils/               # دوال مساعدة عامة
│   ├── sampleData.js
│   └── firebaseFunction.js
├── 📁 constants/           # الثوابت
│   └── index.js
├── 📁 styles/              # ملفات CSS
│   ├── 📁 components/
│   └── 📁 pages/
├── 📁 types/               # أنواع TypeScript (مستقبلاً)
├── 📄 index-exports.js     # التصدير المركزي
├── 📄 README.md           # هذا الملف
└── 📄 App.js              # الملف الرئيسي
```

## 🎯 المبادئ التوجيهية

### 1. **المكونات (Components)**
- **ui/**: مكونات واجهة المستخدم الأساسية القابلة لإعادة الاستخدام
- **layout/**: مكونات التخطيط الرئيسية (Navbar, Sidebar)
- **features/**: مكونات الميزات المحددة

### 2. **الصفحات (Pages)**
- كل صفحة تحتوي على المنطق الخاص بها
- تستورد المكونات من مجلد components
- تحتوي على CSS الخاص بها في مجلد styles

### 3. **الخدمات (Services)**
- **firebaseService.js**: خدمات Firebase الأساسية
- **geminiService.js**: خدمات Gemini AI
- **firestoreDataService.js**: خدمات قاعدة البيانات

### 4. **Hooks المخصصة**
- **useFirestoreData**: لجلب البيانات من Firestore
- **useChatState**: لإدارة حالة الشات
- **useSidebar**: لإدارة التخطيط الجانبي
- **useSearch**: لإدارة البحث
- **useLoading**: لإدارة التحميل
- **useError**: لإدارة الأخطاء
- **useLocalStorage**: لإدارة التخزين المحلي
- **useForm**: لإدارة النماذج

### 5. **الثوابت (Constants)**
- **APP_CONFIG**: إعدادات التطبيق
- **COLORS**: ألوان التطبيق
- **AIRLINES**: شركات الطيران
- **CITIES**: المدن
- **MESSAGES**: الرسائل
- **LAYOUT**: إعدادات التخطيط

## 📝 قواعد التسمية

### الملفات:
- **PascalCase** للمكونات: `FlightCard.js`
- **camelCase** للخدمات والدوال: `firebaseService.js`
- **kebab-case** للأنماط: `flight-card.css`

### المجلدات:
- **camelCase** للمجلدات العامة: `components`, `services`
- **kebab-case** للمجلدات المحددة: `smart-data-chat`

## 🔧 أفضل الممارسات

### 1. **فصل المسؤوليات**
```javascript
// ✅ صحيح - كل ملف له مسؤولية واحدة
// components/ui/FlightCard.js - عرض بطاقة الرحلة فقط
// services/firebaseService.js - خدمات Firebase فقط
```

### 2. **إعادة الاستخدام**
```javascript
// ✅ صحيح - مكون قابل لإعادة الاستخدام
import { FlightCard } from '../components/ui/FlightCard';

// يمكن استخدامه في عدة صفحات
```

### 3. **التوثيق**
```javascript
/**
 * مكون بطاقة الرحلة
 * @param {Object} flight بيانات الرحلة
 * @param {Function} onBook دالة الحجز
 * @returns {JSX.Element} بطاقة الرحلة
 */
const FlightCard = ({ flight, onBook }) => {
  // ...
};
```

### 4. **إدارة الحالة**
```javascript
// ✅ صحيح - استخدام Hooks مخصصة
const { data, loading, error } = useFirestoreData();
const { sidebarOpen, toggleSidebar } = useSidebar();
```

## 🚀 كيفية الاستخدام

### إضافة مكون جديد:
```javascript
// 1. إنشاء الملف في components/ui/NewComponent.js
import React from 'react';
import { COLORS } from '../../constants';

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div style={{ color: COLORS.PRIMARY }}>
      {/* محتوى المكون */}
    </div>
  );
};

export default NewComponent;

// 2. إضافة التصدير في index-exports.js
export { default as NewComponent } from './components/ui/NewComponent';

// 3. استخدام المكون
import { NewComponent } from './index-exports';
```

### إضافة خدمة جديدة:
```javascript
// في services/newService.js
import { API_ENDPOINTS } from '../constants';

export const newService = {
  async fetchData() {
    const response = await fetch(API_ENDPOINTS.DATA);
    return response.json();
  },
  
  async saveData(data) {
    const response = await fetch(API_ENDPOINTS.DATA, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

### إضافة Hook جديد:
```javascript
// في hooks/index.js
export const useNewFeature = () => {
  const [state, setState] = useState(null);
  
  const updateState = (newState) => {
    setState(newState);
  };
  
  return { state, updateState };
};
```

## 📊 المميزات الجديدة

### 1. **التنظيم المحسن**
- ✅ ملفات منظمة في مجلدات منطقية
- ✅ فصل واضح بين المكونات والخدمات
- ✅ سهولة العثور على الملفات

### 2. **إعادة الاستخدام**
- ✅ مكونات قابلة لإعادة الاستخدام
- ✅ Hooks مخصصة للاستخدام العام
- ✅ ثوابت مركزية

### 3. **الصيانة**
- ✅ كود مفهوم ومنظم
- ✅ تعليقات واضحة باللغة العربية
- ✅ توثيق شامل

### 4. **الأداء**
- ✅ تحميل كسول للمكونات
- ✅ إدارة حالة محسنة
- ✅ تحسين التحديثات

## 🔄 التحديثات المستقبلية

### 1. **TypeScript**
- إضافة أنواع TypeScript للكود
- تحسين الأمان والكشف عن الأخطاء

### 2. **اختبارات**
- إضافة اختبارات وحدة
- اختبارات التكامل
- اختبارات واجهة المستخدم

### 3. **تحسينات الأداء**
- تحميل كسول للصفحات
- تحسين حجم الحزمة
- تحسين التحديثات

## 📞 الدعم

لأي استفسارات أو مشاكل:
- راجع هذا الملف أولاً
- تحقق من التعليقات في الكود
- استخدم أدوات التطوير في المتصفح

---

**SmartFly** - منصة حجز الطيران الذكية 🛩️
