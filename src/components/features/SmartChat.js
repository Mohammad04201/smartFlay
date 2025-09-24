import React, { useState, useRef } from 'react';
import '../../styles/components/SmartChat.css';

const suggestionsList = [
  'أرخص الرحلات اليوم',
  'رحلات من الرياض إلى جدة',
  'ما هي رحلات طيران الإمارات؟',
  'أرني الرحلات المتوفرة غداً',
  'ساعدني في اختيار رحلة'
];

const SmartChat = ({ onSend, loading, messages, onSuggestion }) => {
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  React.useEffect(() => {
    if (show && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, show]);

  return (
    <>
      <button className="smart-chat-btn" onClick={() => setShow(!show)}>
        <i className="fas fa-comments"></i> الشات الذكي
      </button>
      {show && (
        <div className="smart-chat-window">
          <div className="smart-chat-header">
            <span>الشات الذكي</span>
            <button className="close-btn" onClick={() => setShow(false)}>&times;</button>
          </div>
          <div className="smart-chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}> 
                <div className="msg-content">{msg.text}</div>
                <div className="msg-time">{msg.time}</div>
              </div>
            ))}
            {loading && (
              <div className="msg-bubble ai">
                <div className="msg-content loading">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
          <div className="smart-chat-suggestions">
            {suggestionsList.map((s, i) => (
              <button key={i} className="suggestion-btn" onClick={() => onSuggestion(s)}>{s}</button>
            ))}
          </div>
          <form className="smart-chat-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب رسالتك..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SmartChat;
