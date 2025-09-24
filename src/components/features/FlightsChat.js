import React, { useState, useEffect, useRef } from 'react';
import { smartFlightSearch } from '../../services/geminiService';
import { getFlights } from '../../services/firebaseService';
import '../../styles/components/SmartChat.css';
import '../../styles/simplified-flights.css';

const defaultMessages = [
  {
    id: 1,
    type: 'bot',
    content: 'مرحباً! أنا مساعدك الذكي في SmartFly 🛩️\n\nيمكنني فهم كلامك الطبيعي والمساعدة في:\n• البحث عن رحلات محددة\n• مقارنة الأسعار والخيارات\n• تقديم نصائح السفر\n• الإجابة على أسئلتك العامة\n\nاكتب أي شيء تريده بشكل طبيعي!',
    timestamp: new Date(),
    suggestions: [
      'كيف حالك؟',
      'أريد رحلة من الرياض إلى دبي',
      'ما هي أرخص الرحلات؟',
      'ساعدني في اختيار رحلة'
    ]
  }
];

const FlightCardMini = ({ flight }) => (
  <div className="chat-flight-card" style={{
    background: 'var(--jordan-white)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: 'var(--soft-shadow)',
    border: '1px solid #f1f5f9'
  }}>
    <div style={{ color: 'var(--jordan-royal)', fontWeight: '600', marginBottom: '8px' }}>
      <i className="fas fa-plane me-2" style={{ color: 'var(--jordan-gold)' }}></i>
      {flight.airline}
    </div>
    <div style={{ color: 'var(--jordan-stone)', marginBottom: '4px' }}>
      {flight.departure} → {flight.arrival}
    </div>
    <div style={{ fontSize: '14px', color: 'var(--jordan-stone)' }}>
      {flight.date} | {flight.time}
    </div>
    <div style={{ color: 'var(--jordan-gold)', fontWeight: '600', marginTop: '8px' }}>
      {flight.price} دينار
    </div>
  </div>
);

const FlightsChat = ({ flights, setFilteredFlights, setSearchCriteria }) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState(null);
  const [chatMode, setChatMode] = useState('gemini');
  const [liveFlights, setLiveFlights] = useState([]);
  const chatBodyRef = useRef(null);
  
  // جلب البيانات الحية من Firebase
  useEffect(() => {
    const fetchLiveFlights = async () => {
      try {
        const firebaseFlights = await getFlights();
        setLiveFlights(firebaseFlights);
      } catch (error) {
        console.error('Error fetching live flights:', error);
        setLiveFlights(flights); // استخدام البيانات المحلية كبديل
      }
    };
    
    fetchLiveFlights();
  }, [flights]);


  useEffect(() => {
    if (showChat && chatMessages.length === 0) {
      setChatMessages(defaultMessages);
    }
  }, [showChat, chatMessages.length]);

  useEffect(() => {
    if (showChat && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, showChat]);


  const sendChatMessage = async (message) => {
    if (!message.trim()) return;
    setError(null);
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== 'pending');
      return [...filtered, userMessage];
    });
    
    setChatInput('');
    setIsChatLoading(true);
    
    setChatMessages(prev => [
      ...prev.filter(msg => msg.id !== 'pending'),
      {
        id: 'pending',
        type: 'bot',
        content: '🧠 **جاري التفكير والتحليل...**\n\nأفهم طلبك وأبحث في قاعدة البيانات...',
        timestamp: new Date()
      }
    ]);
    
    try {
      // استخدام البحث المبسط
      const currentFlights = liveFlights.length > 0 ? liveFlights : flights;
      const intelligentResponse = await smartFlightSearch(message, currentFlights);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: intelligentResponse.reply,
        timestamp: new Date(),
        suggestions: intelligentResponse.suggestions || [],
        flights: intelligentResponse.flights || []
      };
      
      setChatMessages(prev => prev.map(msg =>
        msg.id === 'pending' ? botMessage : msg
      ));
      
      // تحديث الرحلات المفلترة إذا كان الاستعلام متعلق بالرحلات
      if (intelligentResponse.isFlightRelated && intelligentResponse.flights) {
        setFilteredFlights(intelligentResponse.flights);
      }
      
      setChatMode('gemini');
      
    } catch (error) {
      console.error('Chat Error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى أو إعادة صياغة السؤال.',
        timestamp: new Date(),
        suggestions: [
          'أرني جميع الرحلات المتاحة',
          'أريد رحلة من الرياض إلى دبي',
          'ساعدني في البحث عن رحلة'
        ]
      };
      
      setChatMessages(prev => prev.map(msg =>
        msg.id === 'pending' ? errorMessage : msg
      ));
    } finally {
      setIsChatLoading(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setChatInput(suggestion);
  };

  const clearChat = () => {
    setChatMessages(defaultMessages);
    setError(null);
    setChatMode('gemini');
  };

  return (
    <>
      <button className="smart-chat-btn" onClick={() => setShowChat(!showChat)}>
        <i className="fas fa-comments"></i> الشات الذكي المتقدم
      </button>
      
      {showChat && (
        <div className="smart-chat-window">
          <div className="smart-chat-header">
            <span>
              🧠 الشات الذكي المتقدم 
              {chatMode === 'gemini' && <span className="gemini-badge">Gemini AI</span>}
              {chatMode === 'local' && <span className="local-badge">AI محلي</span>}
            </span>
            <div className="header-actions">
              <button className="clear-btn" onClick={clearChat} title="مسح المحادثة">
                <i className="fas fa-trash"></i>
              </button>
              <button className="close-btn" onClick={() => setShowChat(false)}>&times;</button>
            </div>
          </div>
          
          <div className="smart-chat-body" ref={chatBodyRef}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`msg-bubble ${msg.type === 'user' ? 'user' : 'ai'}`}> 
                <div className="msg-content">
                  {msg.content.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                  
                  {/* عرض بطاقات الرحلات إذا وجدت */}
                  {msg.flights && msg.flights.length > 0 && (
                    <div className="chat-flights-list">
                      {msg.flights.map((flight, i) => (
                        <FlightCardMini key={i} flight={flight} />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="msg-time">{msg.timestamp.toLocaleTimeString()}</div>
                
                {msg.suggestions && msg.suggestions.map((s, i) => (
                  <button key={i} className="suggestion-btn" onClick={() => selectSuggestion(s)}>
                    {s}
                  </button>
                ))}
              </div>
            ))}
            
            {isChatLoading && (
              <div className="msg-bubble ai">
                <div className="msg-content loading">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="msg-bubble ai error">
                <div className="msg-content">{error}</div>
              </div>
            )}
          </div>
          
          <form className="smart-chat-input" onSubmit={e => { e.preventDefault(); sendChatMessage(chatInput); }}>
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="اكتب استعلامك باللغة الطبيعية... (مثل: ساعدني في اختيار رحلة)"
              disabled={isChatLoading}
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendChatMessage(chatInput);
                }
              }}
            />
            <button type="submit" disabled={isChatLoading || !chatInput.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FlightsChat;
