import React, { useState, useEffect } from 'react';
import { getAllFirestore } from '../services/firestoreDataService';
import { smartFlightSearch } from '../services/geminiService';
import '../styles/pages/SmartDataChat.css';

const SmartDataChat = () => {
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [dataStats, setDataStats] = useState(null);

  // جلب جميع البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('جاري جلب جميع البيانات من Firestore...');
      const data = await getAllFirestore();
      setAllData(data);
      setDataStats(data.statistics);
      
      // إضافة رسالة ترحيب ذكية
      const welcomeMessage = generateWelcomeMessage(data);
      setChatMessages([{
        id: 'welcome',
        type: 'ai',
        content: welcomeMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA')
      }]);
      
      console.log('✅ تم جلب البيانات بنجاح:', data);
      
    } catch (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
      setError('فشل في جلب البيانات من قاعدة البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إنشاء رسالة ترحيب ذكية بناءً على البيانات
  const generateWelcomeMessage = (data) => {
    const stats = data.statistics;
    return `مرحباً! أنا المساعد الذكي لموقع SmartFly 🛩️

أنا على دراية بجميع بيانات الموقع:
• ${stats.totalFlights} رحلة متاحة
• ${stats.totalAirlines} شركة طيران
• ${stats.totalUsers} مستخدم مسجل
• ${stats.totalBookings} حجز مكتمل
• إجمالي الإيرادات: ${stats.totalRevenue.toLocaleString()} دينار

يمكنني مساعدتك في:
• البحث عن رحلات محددة
• معلومات عن شركات الطيران
• إحصائيات الموقع
• نصائح السفر
• أي استفسار آخر

كيف يمكنني مساعدتك اليوم؟`;
  };

  // إرسال رسالة للـ AI
  const sendMessage = async () => {
    if (!currentMessage.trim() || !allData) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA')
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // إنشاء سياق شامل للـ AI
      const context = createAIContext(allData, currentMessage);
      
      // إرسال للـ Gemini مع السياق الكامل
      const aiResponse = await smartFlightSearch(currentMessage, allData.flights, context);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };

      setChatMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('خطأ في الرد الذكي:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
        timestamp: new Date().toLocaleTimeString('ar-SA'),
        isError: true
      };

      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // إنشاء سياق شامل للـ AI
  const createAIContext = (data, userQuery) => {
    const context = {
      systemInfo: {
        totalFlights: data.statistics.totalFlights,
        totalAirlines: data.statistics.totalAirlines,
        totalUsers: data.statistics.totalUsers,
        totalBookings: data.statistics.totalBookings,
        totalRevenue: data.statistics.totalRevenue,
        activeFlights: data.statistics.activeFlights
      },
      availableData: {
        flights: data.flights.slice(0, 10), // أول 10 رحلات للسياق
        airlines: data.airlines,
        airports: data.airports,
        promotions: data.promotions
      },
      userQuery: userQuery,
      timestamp: new Date().toISOString()
    };

    return `أنت مساعد ذكي لموقع حجز الطيران SmartFly. لديك معلومات شاملة عن:

إحصائيات النظام:
- إجمالي الرحلات: ${context.systemInfo.totalFlights}
- شركات الطيران: ${context.systemInfo.totalAirlines}
- المستخدمين: ${context.systemInfo.totalUsers}
- الحجوزات: ${context.systemInfo.totalBookings}
- الإيرادات: ${context.systemInfo.totalRevenue} دينار

البيانات المتاحة:
${JSON.stringify(context.availableData, null, 2)}

استفسار المستخدم: "${userQuery}"

أجب باللغة العربية بطريقة ودية ومفيدة.`;
  };

  // اقتراحات سريعة
  const quickSuggestions = [
    'أرني الرحلات المتاحة من الرياض',
    'ما هي أفضل شركات الطيران؟',
    'إحصائيات الموقع',
    'رحلات رخيصة إلى دبي',
    'كيف أحجز رحلة؟'
  ];

  const handleSuggestion = (suggestion) => {
    setCurrentMessage(suggestion);
  };

  // إعادة تحميل البيانات
  const refreshData = () => {
    fetchAllData();
  };

  if (loading) {
    return (
      <div className="smart-data-chat-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h3>جاري تحميل البيانات الذكية...</h3>
          <p>يرجى الانتظار بينما نجلب جميع معلومات الموقع</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="smart-data-chat-container">
        <div className="error-screen">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>خطأ في تحميل البيانات</h3>
          <p>{error}</p>
          <button onClick={refreshData} className="btn btn-primary">
            <i className="fas fa-refresh"></i>
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="smart-data-chat-container">
      {/* Chat Content Container */}
      <div className="chat-content">
        {/* Chat Messages */}
        <div className="chat-messages">
          {chatMessages.map((message) => (
            <div key={message.id} className={`message ${message.type} ${message.isError ? 'error' : ''}`}>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-type">
                    {message.type === 'user' ? (
                      <i className="fas fa-user"></i>
                    ) : (
                      <i className="fas fa-robot"></i>
                    )}
                    {message.type === 'user' ? 'أنت' : 'المساعد الذكي'}
                  </span>
                  <span className="message-time">{message.timestamp}</span>
                </div>
                <div className="message-text">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {/* Quick Suggestions inside chat */}
          {chatMessages.length <= 1 && (
            <div className="quick-suggestions">
              <h4>اقتراحات سريعة:</h4>
              <div className="suggestions-grid">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(suggestion)}
                    className="suggestion-btn"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isTyping && (
            <div className="message ai typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>المساعد الذكي يكتب...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="chat-input">
          <div className="input-container">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="اكتب سؤالك هنا..."
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="send-btn"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <div className="input-actions">
            <button onClick={refreshData} className="refresh-btn" title="تحديث البيانات">
              <i className="fas fa-sync-alt"></i>
            </button>
            <span className="data-info">
              آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDataChat;
