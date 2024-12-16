import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, Circle, Code, Mail, Globe, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import profileImage from "./assets/profile.jpg";
import ChatbotModal from "./modal/ChatbotModal";
import ReusableModal from "./modal/ReusableModal";
  

import './style.css';



function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Individual modal states
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = {
      role: "bot",
      text: `You asked: "${input}". I'm here to help! 🚀`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-72"
        } bg-gray-800 p-4 border-r border-gray-700 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
          <h2
              className={`text-2xl font-bold flex items-center gap-2 ${
                collapsed ? "hidden" : "block"
              }`}
            >
              <Circle className="w-6 h-6 text-green-400" />
              Atcham Chatbot
            </h2>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="space-y-2 flex flex-col items-start">
            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="w-full flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <Briefcase className="w-5 h-5 text-green-400" />
              {!collapsed && "Projects"}
            </button>
            <button
              onClick={() => setIsSkillsModalOpen(true)}
              className="w-full flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <Code className="w-5 h-5 text-green-400" />
              {!collapsed && "Skills"}
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <Mail className="w-5 h-5 text-green-400" />
              {!collapsed && "Contact"}
            </button>
            <button
              onClick={() => setIsLinksModalOpen(true)}
              className="w-full flex items-center gap-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <Globe className="w-5 h-5 text-green-400" />
              {!collapsed && "Links"}
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-400 transition"
        >
          <Plus className="w-5 h-5" />
          {!collapsed && "New Chat"}
        </button>
      </aside>


      {/* Main Area */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-8">
        {/* Portfolio Welcome Screen */}
        {messages.length === 0 && (
          <div className="text-center">
           {/* Profile Section */}
<img
  src={profileImage} // Ensure the correct path
  alt="Profile"
  className="w-48 h-48 rounded-full mx-auto mb-4 border-8 border-green-400 shadow-xl"
/>
<h1 className="text-4xl font-bold mb-2">Hi, I'm Atcham</h1>
<p className="text-gray-400 mb-6">
  A passionate Front-End Developer and UI/UX Designer 🚀
</p>
            {/* Cards for Portfolio Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition text-center">
                <Briefcase className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold">Projects</h3>
                <p className="text-gray-400 text-sm">Explore my latest work</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition text-center">
                <Code className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold">Skills</h3>
                <p className="text-gray-400 text-sm">View my technical skills</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition text-center">
                <Mail className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold">Contact</h3>
                <p className="text-gray-400 text-sm">Let's connect and collaborate</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition text-center">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold">Links</h3>
                <p className="text-gray-400 text-sm">Visit my profiles</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Window */}
        {messages.length > 0 && (
          <div className="w-full max-w-4xl h-[600px] bg-gray-800 rounded-lg overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.role === "user" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-gray-900 border-t border-gray-700 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 bg-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-green-500 p-3 rounded-r-lg hover:bg-green-400 transition"
              >
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />

       {/* Modals */}
       <ReusableModal
  isOpen={isProjectsModalOpen}
  onClose={() => setIsProjectsModalOpen(false)}
  title="Projects"
  content={
    <>
      <p>Here are some of my projects with GitHub links:</p>
      <ul className="list-disc list-inside text-blue-400 space-y-2">
        <li>
          <a
            href="https://github.com/2Atcham7/SportsStore-TULOD-04671.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Sports Store Project
          </a>
        </li>
        <li>
          <a
            href="https://github.com/2Atcham7/roadguard_admin.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            RoadGuard Admin Panel
          </a>
        </li>
        <li>
          <a
            href="https://github.com/2Atcham7/ROADGUARD_FINAL.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            RoadGuard Final Version
          </a>
        </li>
        <li>
          <a
            href="https://github.com/2Atcham7/TULOD_INTPROG_04671.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            INTPROG Project
          </a>
        </li>
        <li>
          <a
            href="https://github.com/2Atcham7/Simple-Payroll-System.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Simple Payroll System
          </a>
        </li>
      </ul>
    </>
  }
/>
      <ReusableModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        title="Skills"
        content="My technical skills include React, JavaScript, TypeScript, UI/UX Design, and Tailwind CSS."
      />

      <ReusableModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact"
        content="Feel free to email me at charinamieabeniotulod@gmail.com"
      />

      <ReusableModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        title="Links"
        content="Here are my online profiles: 
          - GitHub: github.com/atcham
          - LinkedIn: linkedin.com/in/atcham
          - Portfolio: atcham.dev"
      />
    </div>
  );
}

export default App;
