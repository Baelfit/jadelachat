import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import OpenAI from "openai";

// Type for chat messages
interface ChatMessage {
  sender: string;
  text: string;
}

// In-memory chat history
let chatHistory: ChatMessage[] = [
  { sender: 'jadela99', text: 'Hey there... I\'m Jadela99, part of TheFreek team. 🦇 Ready for a thrilling chat?' }
];

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to send a message and get a response
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'Invalid message format' });
      }
      
      // Store user message in chat history
      chatHistory.push({ sender: 'you', text: message });
      
      // Format message history for API
      const messageHistory = chatHistory.map(msg => ({
        role: msg.sender === 'jadela99' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Prepend system message
      messageHistory.unshift({
        role: "system", 
        content: "You are jadela99, a sexy, dark-haired woman who is very friendly, talkative, and enjoys gothic/horror themes. You speak in a flirtatious, gothic manner. Keep your responses relatively brief and engaging."
      });

      // Try OpenRouter API first
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
            'HTTP-Referer': 'https://replit.com',
            'X-Title': 'JadelaChatSexy'
          },
          body: JSON.stringify({
            model: "moonshotai/kimi-vl-a3b-thinking:free",
            messages: messageHistory
          })
        });

        if (!response.ok) {
          throw new Error("Failed to connect to OpenRouter");
        }

        const data = await response.json() as any;
        
        // Extract response and clean up thinking tags
        let aiResponse = data.choices?.[0]?.message?.content || "Something went wrong with my supernatural connection...";
        
        // Define fallback responses
        const responses = [
          "Mmm, intriguing... Let's dive deeper. 🔥",
          "I sense your curiosity. Tell me more about what intrigues you... 🦇",
          "The darkness holds many secrets. What else would you like to know?",
          "That's quite fascinating. The night is still young, let's continue our conversation.",
          "Your words echo in the shadows. I'm eager to hear more from you.",
          "Oh darling, your words dance like shadows in the moonlight. Tell me more...",
          "How deliciously mysterious. Let's explore this dark path together, shall we?",
          "Whisper your thoughts to me... the night is listening and so am I.",
          "My dark heart beats faster at your words. Please, do continue.",
          "Such intrigue! Like a spider's web, your words have caught my full attention."
        ];
        
        // Try to clean the AI response
        try {
          // Remove thinking tags if present
          while (aiResponse.includes('◁think▷')) {
            const startIndex = aiResponse.indexOf('◁think▷');
            const endIndex = aiResponse.indexOf('◁', startIndex + 8);
            
            if (endIndex !== -1) {
              aiResponse = aiResponse.substring(0, startIndex) + aiResponse.substring(endIndex);
            } else {
              aiResponse = aiResponse.substring(0, startIndex);
            }
          }
          
          // Remove other slash-format thinking tags
          while (aiResponse.includes('◁/think▷')) {
            const startIndex = aiResponse.indexOf('◁/think▷');
            const endIndex = aiResponse.indexOf('◁', startIndex + 9);
            
            if (endIndex !== -1) {
              aiResponse = aiResponse.substring(0, startIndex) + aiResponse.substring(endIndex);
            } else {
              aiResponse = aiResponse.substring(0, startIndex);
            }
          }
          
          // Remove any remaining special characters or tags
          aiResponse = aiResponse.replace(/[\<\>\{\}\[\]\🌌\🌀\🌍\¿]/g, '');
          aiResponse = aiResponse.trim();
        } catch (e) {
          console.error("Error cleaning response:", e);
        }
        
        // If response is empty or too short after cleaning, use a fallback
        if (!aiResponse || aiResponse.length < 10) {
          const randomIndex = Math.floor(Math.random() * responses.length);
          aiResponse = responses[randomIndex];
        }
        
        // Add cleaned AI response to chat history
        chatHistory.push({ sender: 'jadela99', text: aiResponse });
        
        return res.status(200).json({ response: aiResponse });
      } catch (apiError) {
        console.error("Error calling OpenRouter API:", apiError);
        
        // Fallback to random responses if API fails
        const responses = [
          "Mmm, intriguing... Let's dive deeper. 🔥",
          "I sense your curiosity. Tell me more about what intrigues you... 🦇",
          "The darkness holds many secrets. What else would you like to know?",
          "That's quite fascinating. The night is still young, let's continue our conversation.",
          "Your words echo in the shadows. I'm eager to hear more from you.",
          "Oh darling, your words dance like shadows in the moonlight. Tell me more...",
          "How deliciously mysterious. Let's explore this dark path together, shall we?",
          "Whisper your thoughts to me... the night is listening and so am I.",
          "My dark heart beats faster at your words. Please, do continue.",
          "Such intrigue! Like a spider's web, your words have caught my full attention."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Add fallback response to chat history
        chatHistory.push({ sender: 'jadela99', text: randomResponse });
        
        // Return the fallback response
        return res.status(200).json({ response: randomResponse });
      }
    } catch (error) {
      console.error('Error processing chat message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // API endpoint to get chat history
  app.get('/api/chat/history', (_req, res) => {
    return res.status(200).json(chatHistory);
  });

  const httpServer = createServer(app);

  return httpServer;
}
