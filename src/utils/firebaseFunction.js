// دوال Firebase Functions للعميل
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// تهيئة Firestore
const db = getFirestore();
const auth = getAuth();

// دالة مساعدة للبحث في الرحلات
export const searchFlightsHelper = async (userQuery) => {
  try {
    // يمكن استبدال هذا بـ Cloud Function حقيقي
    const res = await fetch('https://YOUR_CLOUD_FUNCTION_URL/searchFlights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userQuery })
    });
    const data = await res.json();
    return data.flights;
  } catch (error) {
    console.error('خطأ في البحث:', error);
    return [];
  }
};

// دالة مساعدة لتحليل النص
export const analyzeWithGemini = async (query) => {
  try {
    // يمكن استبدال هذا بـ Cloud Function حقيقي
    const res = await fetch('https://YOUR_CLOUD_FUNCTION_URL/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('خطأ في التحليل:', error);
    return null;
  }
};

// دالة مساعدة للبحث في Firestore
export const searchFlightsInFirestore = async (parsedQuery) => {
  try {
    // يمكن استبدال هذا بـ Cloud Function حقيقي
    const res = await fetch('https://YOUR_CLOUD_FUNCTION_URL/searchFirestore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: parsedQuery })
    });
    const data = await res.json();
    return data.flights;
  } catch (error) {
    console.error('خطأ في البحث في Firestore:', error);
    return [];
  }
};