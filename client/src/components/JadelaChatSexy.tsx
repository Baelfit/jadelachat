import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

type Message = {
  sender: string;
  text: string;
};

// Sexy dark-haired gothic woman avatar URL
const AVATAR_URL = "https://i.pinimg.com/originals/67/1a/11/671a110fc9ea618d67ce1f866986b146.jpg"; // Dark-haired gothic woman with pale skin and gothic makeup

const translations = {
  en: {
    title: 'Whispers with Jadela99',
    online: 'online'
  },
  es: {
    title: 'Susurros con Jadela99',
    online: 'en línea'
  }
};

export default function JadelaChatSexy() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'jadela99', text: 'Hey there... I\'m Jadela99, part of TheFreek team. 🦇 Ready for a thrilling chat?' }
  ]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en'); // Add language state
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Send message mutation with server API
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      // Use server API which handles all fallbacks
      return await apiRequest('POST', '/api/chat', { message });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'jadela99', text: data.response }]);
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history'] });
    },
    onError: (error) => {
      console.error("Error in chat mutation:", error);
      setMessages(prev => [...prev, { 
        sender: 'jadela99', 
        text: "I seem to have lost my connection to the other side... Can you try again?" 
      }]);
    }
  });

  // Get chat history
  useQuery({
    queryKey: ['/api/chat/history']
  });

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message to state
    setMessages(prev => [...prev, { sender: 'you', text: input }]);

    // Send to API and get response
    sendMessageMutation.mutate(input);

    // Clear input
    setInput('');
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed inset-0 flex overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #000000, #600, #400, #000)',
        animation: 'gradient-shift 30s ease infinite',
        backgroundSize: '400% 400%',
        boxShadow: 'inset 0 0 100px rgba(255, 0, 0, 0.3)'
      }}>
      {/* Large Corner Bat */}
      <div className="fixed top-0 right-0 w-32 h-32 p-4 animate-[batHover_4s_ease-in-out_infinite]">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/616/616494.png" 
          alt="Corner Bat" 
          className="w-full h-full opacity-80 filter invert"
          style={{filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))'}}
        />
      </div>
      {/* Decorative Bats */}
      <div className="absolute top-2 left-2 animate-pulse">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-8 h-8 md:w-10 md:h-10 opacity-70 filter invert" />
      </div>
      <div className="absolute top-2 right-12 animate-pulse delay-100">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-6 h-6 md:w-8 md:h-8 opacity-70 filter invert" />
      </div>
      <div className="absolute bottom-10 left-10 animate-pulse">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-7 h-7 md:w-9 md:h-9 opacity-70 filter invert" />
      </div>
      <div className="absolute bottom-2 right-2 animate-pulse delay-300">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-6 h-6 md:w-8 md:h-8 opacity-70 filter invert" />
      </div>

      {/* Flying Bats */}
      <div className="absolute top-1/4 left-0" style={{animation: 'batFlyRight 15s linear infinite'}}>
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Flying Bat" className="w-8 h-8 opacity-60 filter invert" />
      </div>
      <div className="absolute top-1/3 right-0" style={{animation: 'batFlyLeft 12s linear infinite'}}>
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Flying Bat" className="w-6 h-6 opacity-50 filter invert" />
      </div>
      <div className="absolute top-2/3 left-0" style={{animation: 'batFlyRight 18s linear infinite 2s'}}>
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Flying Bat" className="w-7 h-7 opacity-40 filter invert" />
      </div>
      <div className="absolute top-1/3 left-5 animate-pulse delay-200">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-5 h-5 md:w-7 md:h-7 opacity-50 filter invert" />
      </div>
      <div className="absolute top-2/3 right-5 animate-pulse delay-150">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat" className="w-5 h-5 md:w-7 md:h-7 opacity-50 filter invert" />
      </div>

      {/* Spider Web Decoration */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-20">
        <img src="https://www.freepnglogos.com/uploads/spider-web-png/spider-web-download-best-spider-web-png-clipartmagcom-1.png" alt="Spider Web" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20">
        <img src="https://www.freepnglogos.com/uploads/spider-web-png/spider-web-download-best-spider-web-png-clipartmagcom-1.png" alt="Spider Web" className="w-full h-full" />
      </div>

      {/* Avatar Overlay - Position fixed to always stay at bottom regardless of content size */}
      <div className="fixed z-10 left-0 bottom-0 lg:left-0 lg:bottom-0 w-[40%] lg:w-[30%] h-[35vh] lg:h-[50vh] pointer-events-none">
        <div className="relative h-full">
          <img 
            src={AVATAR_URL} 
            alt="Jadela99" 
            className="h-full object-contain object-bottom lg:object-left-bottom opacity-90"
            style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.7))' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70"></div>
        </div>
      </div>

      {/* Chat Container - Positioned in a way that allows avatar to overlap */}
      <div className="w-full h-full flex justify-end items-center p-0">
        {/* Right Side - Chat Interface */}
        <div className="w-full lg:w-[85%] h-full flex items-center justify-end relative z-20 lg:pl-16 pr-2 lg:pr-4">
          <div className="w-full h-full bg-black bg-opacity-90 border border-red-700 rounded-lg shadow-lg shadow-red-900/30 flex flex-col text-red-300" 
            style={{ 
              fontFamily: '"Courier New", monospace',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-leather.png")',
              backgroundBlendMode: 'overlay'
            }}>

            {/* Chat Header with Gothic Elements */}
            <div className="bg-gradient-to-r from-red-900 via-black to-red-800 text-red-100 p-3 rounded-t-xl text-base font-bold flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Bat Icon" className="w-5 h-5 mr-2 invert-[80%]" />
                <span className="font-serif tracking-wider text-sm">{translations[lang].title}</span>
                <button 
                  onClick={() => setLang(curr => curr === 'en' ? 'es' : 'en')}
                  className="ml-3 px-2 py-1 text-xs bg-red-900 hover:bg-red-800 rounded-md transition-colors"
                >
                  {lang === 'en' ? '🇪🇸' : '🇺🇸'}
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1 animate-pulse"></div>
                <span className="text-xs text-red-400">{translations[lang].online}</span>
              </div>
            </div>

            {/* Messages Container with Gothic Theme */}
            <div 
              ref={messagesContainerRef} 
              className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-black to-red-900/40 message-container" 
              style={{ 
                scrollBehavior: 'smooth',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/scratches.png")',
                backgroundBlendMode: 'soft-light',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
              }}
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out_forwards]`}
                >
                  {msg.sender !== 'you' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 hidden sm:block flex-shrink-0 ring-1 ring-red-600 shadow-lg">
                      <img src={AVATAR_URL} alt="Jadela99" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div 
                    className={`px-3 py-2 rounded-lg shadow-lg max-w-[80%] ${
                      msg.sender === 'you' 
                        ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border-2 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.3)]' 
                        : 'bg-gradient-to-br from-red-800/95 via-black to-red-950/80 text-red-100 border-2 border-red-700 shadow-[0_0_15px_rgba(255,0,0,0.2)]'
                    }`}
                  >
                    <div className={`font-semibold text-xs ${msg.sender === 'you' ? '' : 'text-red-300'} flex items-center`}>
                      {msg.sender === 'you' ? (
                        <span className="flex items-center">
                          <span className="text-xs">You</span>
                          <span className="ml-1 text-xs text-red-300 opacity-75 text-[10px]">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="font-serif tracking-wide text-xs">Jadela99</span>
                          <span className="ml-1 text-xs text-red-400 opacity-75 text-[10px]">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </span>
                      )}
                    </div>
                    <div className="leading-relaxed text-xs">{msg.text}</div>
                  </div>
                </div>
              ))}

              {sendMessageMutation.isPending && (
                <div className="flex justify-start animate-pulse">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 hidden sm:block flex-shrink-0 ring-1 ring-red-600">
                    <img src={AVATAR_URL} alt="Jadela99" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-3 py-2 rounded-lg shadow-lg bg-gradient-to-br from-red-900/95 via-black to-red-950/80 text-red-100 max-w-[80%] border border-red-800">
                    <div className="font-semibold text-xs text-red-300 font-serif tracking-wide">Jadela99</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Improved Input Area with Gothic Design */}
            <div className="p-3 border-t border-red-800 flex items-center bg-black bg-opacity-70">
              <div className="relative flex-1">
                <input
                  className="w-full bg-red-950/80 text-white text-sm p-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-red-400/70 border border-red-800 pr-8"
                  placeholder="Whisper in the darkness..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                {input.length > 0 && (
                  <button 
                    onClick={() => setInput('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white text-sm px-4 py-3 rounded-r-lg transition-colors duration-200 font-medium focus:outline-none flex items-center shadow-lg"
                onClick={handleSend}
                disabled={sendMessageMutation.isPending}
              >
                <span className="mr-1">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}