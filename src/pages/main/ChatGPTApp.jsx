import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/css/ChatGPTApp.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function ChatGPTApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 초기 메시지 설정
  useEffect(() => {
    const initialMessage = {
      role: "assistant",
      content: "안녕하세요! 무엇을 도와드릴까요?",
    };
    setMessages([initialMessage]);
  }, []);

  // 스크롤을 최신 메시지로 이동
  useEffect(() => {
    const chatMessagesElement = document.querySelector(".chat-messages");
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const payload = {
        message: input,
        sessionId: "user123",
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/chatgpt`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      let assistantMessage = res.data.replace(/\n/g, "<br>");
      let additionalLink = null;

      // 도안 관련 문의 확인
      if (input.includes("도안")) {
        additionalLink = (
          <button
            onClick={() => window.open(`${API_BASE_URL}/user/cakeDesign/board`, "_blank")}
            className="chat-button"
          >
            도안 게시판 바로가기
          </button>
        );
      }

      // 케이크 주문 관련 문의 확인
      if (input.includes("케이크") && input.includes("주문")) {
        additionalLink = (
          <button
            onClick={() => window.open(`${API_BASE_URL}/user/audition/board`, "_blank")}
            className="chat-button"
          >
            케이크 요청 게시판 바로가기
          </button>
        );
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantMessage },
        ...(additionalLink ? [{ role: "assistant", content: additionalLink }] : []),
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
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "chat-user-message" : "chat-gpt-message"}
          >
            {typeof msg.content === "string" ? (
              <span dangerouslySetInnerHTML={{ __html: msg.content }} />
            ) : (
              msg.content /* JSX 버튼 렌더링 */
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
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
