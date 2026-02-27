import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface ContactProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isDark?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ chatHistory, setChatHistory, isDark = false }) => {
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    const historyForAPI = chatHistory.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getGeminiResponse(chatInput, historyForAPI);

    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
  };

  return (
    <section className={`py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto h-[calc(100vh-120px)] md:h-[80vh] flex flex-col animate-in slide-in-from-bottom-8 duration-700 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-heading font-medium mb-2 md:mb-4 italic">Heritage Advisor</h2>
        <p className={`text-[9px] md:text-sm tracking-widest uppercase transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>Consulting on Space, History & Innovation</p>
      </div>

      <div className={`flex-grow rounded-[2rem] md:rounded-[2.5rem] flex flex-col overflow-hidden border transition-all duration-700 shadow-xl ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/40 border-black/5'}`}>
        <div className="flex-grow p-6 md:p-10 overflow-y-auto space-y-6 md:space-y-8 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-6">
              <div className="w-16 h-px bg-white/30"></div>
              <p className={`text-center max-w-xs font-serif italic text-lg md:text-xl transition-colors ${isDark ? 'text-white/60' : 'text-black/60'}`}>How may I assist your heritage synthesis today?</p>
              <div className="w-16 h-px bg-white/30"></div>
            </div>
          )}
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[80%] px-5 md:px-8 py-3.5 md:py-5 text-xs md:text-sm leading-relaxed transition-all ${msg.role === 'user'
                ? 'bg-[#FF660F] text-white font-semibold rounded-xl md:rounded-2xl rounded-tr-none'
                : isDark
                  ? 'bg-white/10 text-white/90 border border-white/5 font-light rounded-xl md:rounded-2xl rounded-tl-none shadow-sm'
                  : 'bg-[#0a0a0b]/10 text-black/90 border border-black/5 font-light rounded-xl md:rounded-2xl rounded-tl-none shadow-sm'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="text-white animate-pulse text-[10px] italic tracking-widest uppercase font-bold">Synthesizing...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className={`p-5 md:p-8 border-t flex flex-col md:flex-row gap-4 md:gap-6 ${isDark ? 'bg-[#0a0a0b]/20 border-white/5' : 'bg-white/40 border-black/5'}`}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about monument adaptation..."
            className={`flex-grow bg-transparent border-b py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40 font-light ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
          />
          <button
            type="submit"
            disabled={isTyping}
            className="w-full md:w-auto px-10 h-12 md:h-14 bg-[#FF660F] text-white text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all disabled:opacity-20 rounded-full shadow-lg"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};