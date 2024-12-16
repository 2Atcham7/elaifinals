import React, { useState } from "react";
import { X, Send, Minimize2 } from "lucide-react"; // Add Minimize2 icon for the minimize button
import GoogleGenerativeAI from "./GoogleGenerativeAI";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyC3YMwzYGLKRh-YTmrcuYBrlbf49YCG498");
      const result = await genAI.generateContent(input);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: result,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) return null;

  return (
    <div
  className={`fixed bottom-4 right-4 z-50 ${isMinimized ? "h-16" : "min-h-[400px] h-auto max-h-[700px] w-[400px]"} transition-all duration-300`}
>
      <div className="bg-gray-800 rounded-xl shadow-2xl flex flex-col h-full w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-t-xl">
          <h2 className="text-white font-bold">AI Chatbot</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize} // Button to toggle the minimize state
              className="text-gray-300 hover:text-white"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        {!isMinimized && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-full p-3 rounded-xl ${
                    message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-200"
                  }`}
                  style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-200 p-3 rounded-xl">
                  <div className="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        {!isMinimized && (
          <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-green-500 p-2 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
            >
              <Send className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Footer with Copyright */}
        <div className="bg-gray-700 text-gray-400 text-center py-2 rounded-b-xl">
          © 2024 Charina Mie. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
