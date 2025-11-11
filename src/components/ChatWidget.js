"use client";
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { X } from "lucide-react";
import { io } from "socket.io-client";


// 🔹 Connect to Socket.IO backend
const socket = io("http://localhost:8080");

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([
    {
      text: "Hello! 👋 Welcome to SmaranAI. How can we assist you today? You can also chat with us on WhatsApp!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const nodeRef = useRef(null);

  // 🔹 Show chat with animation
  useEffect(() => setVisible(true), []);

  // 🔹 Detect mobile mode
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Listen for bot replies
  useEffect(() => {
    const handleBotReply = (reply) => {
      const botMsg = {
        text: reply,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    };

    socket.on("botReply", handleBotReply);
    return () => socket.off("botReply", handleBotReply);
  }, []);

  const sendMessage = (msgText) => {
    if (!msgText.trim()) return;
    const newMsg = {
      text: msgText,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    socket.emit("sendMessage", msgText);
  };

  const openWhatsApp = () => {
    const phoneNumber = "9687351816";
    const message = encodeURIComponent(
      "Hi! I’d like to know more about your projects and internships."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Draggable
      handle=".handle"
      cancel=".no-drag"
      nodeRef={nodeRef}
      disabled={isMobile} // ✅ Disable dragging on mobile
    >
      <div
        ref={nodeRef}
        className={`fixed bottom-0 sm:bottom-24 right-0 sm:right-10
          ${
            isMobile
              ? "w-full h-[100vh] rounded-none"
              : "w-[400px] h-[500px] rounded-2xl"
          }
          bg-white dark:bg-[#0E1835] shadow-2xl border border-gray-200 dark:border-gray-700 
          flex flex-col overflow-hidden z-[9999]
          transition-transform duration-500 ease-out
          ${visible ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* 🔹 Header */}
        <div
          className={`handle relative flex items-center justify-center h-[60px] px-3 
            bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md 
            ${isMobile ? "cursor-default" : "cursor-move"}
          `}
        >
          <FaRobot className="absolute left-4 w-7 h-7 text-white" />
          <span className="font-semibold text-lg text-center">
            SmaranAI Assistant
          </span>

          {/* 🔹 Close button (only for mobile) */}
          {isMobile && (
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onClose, 300);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 
               flex items-center justify-center
               w-8 h-8 rounded-full bg-transparent text-white
               hover:scale-110 active:scale-95 transition-all duration-200"
              title="Close chat"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* 🔹 Messages */}
        <div className="flex-1 p-3 overflow-y-auto bg-gray-50 dark:bg-[#0A0F2C] flex flex-col justify-start">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-4">
              <div
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <FaRobot className="w-6 h-6 text-emerald-500 mr-2 self-end" />
                )}
                <div
                  className={`relative max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow break-words ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-br-none text-right"
                      : "bg-white dark:bg-[#16224F] text-gray-800 dark:text-gray-200 rounded-bl-none text-left"
                  }`}
                >
                  <p className="break-words pr-6">{msg.text}</p>
                  <span
                    className={`text-[10px] block mt-1 ${
                      msg.sender === "user"
                        ? "text-emerald-100 text-right"
                        : "text-gray-500 dark:text-gray-400 text-right"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="User"
                    className="w-6 h-6 rounded-full ml-2 self-end"
                  />
                )}
              </div>

              {/* 💡 Internship Button */}
              {msg.sender === "bot" && /internship/i.test(msg.text) && (
                <div className="flex justify-start mt-2 ml-8">
                  <button
                    onClick={() =>
                      window.open("https://smaranai.in/hr", "_blank")
                    }
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Apply for Internship
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 🔹 Input Section */}
        <div className="p-3 flex items-end border-t bg-white dark:bg-[#0E1835] dark:border-gray-700">
          <textarea
            rows={1}
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0A0F2C] 
                       text-gray-900 dark:text-gray-200 rounded-2xl px-3 py-2 text-sm focus:outline-none 
                       focus:ring-2 focus:ring-emerald-500 resize-none overflow-hidden transition-all no-drag"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Type your message..."
            style={{ maxHeight: "120px" }}
          />

          <button
            onClick={() => sendMessage(input)}
            className="ml-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:opacity-90 
                       transition-all flex items-center justify-center w-11 h-11 shadow-md"
          >
            <FaPaperPlane size={18} />
          </button>

          <button
            onClick={openWhatsApp}
            className="ml-2 bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white rounded-xl 
                       transition-all flex items-center justify-center w-11 h-11 shadow-md"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={22} />
          </button>
        </div>
      </div>
    </Draggable>
  );
}
