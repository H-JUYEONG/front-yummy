import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/css/ChatGPTApp.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function ChatGPTApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 스크롤을 최신 메시지로 이동
  useEffect(() => {
    const chatMessagesElement = document.querySelector(".chat-messages");
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }, [messages]); // 메시지가 업데이트될 때마다 실행

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chatgpt`, input, {
        headers: { "Content-Type": "text/plain" },
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: res.data },
      ]);
    } catch (error) {
      console.error("Error communicating with the server:", error);
      setError("응답을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-gpt-app">
        {/* 메시지 영역 */}
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <p
                    key={index}
                    className={msg.role === "user" ? "chat-user-message" : "chat-gpt-message"}
                >
                    <strong>{msg.role === "user" ? "" : ""}</strong>{" "}
                    {msg.content}
                </p>
            ))}
        </div>

        {/* 입력 영역 */}
        <div className="chat-input-container">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(); // 엔터키로 메시지 전송
                }}
                placeholder="메시지를 입력하세요..."
                className="chat-input"
            />
            <button onClick={handleSendMessage} className="chat-send-button">
                Send
            </button>
        </div>
    </div>
);
  
}

export default ChatGPTApp;
