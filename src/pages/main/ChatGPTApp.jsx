import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function ChatGPTApp() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        if (!input.trim()) return; // 빈 입력 방지

        const userMessage = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setLoading(true);
        setError(null);

        try {
            // API 호출
            const res = await axios.post(`${API_BASE_URL}/api/chatgpt`, { message: input }, {
                headers: { "Content-Type": "application/json" },
            });
            const assistantMessage = { role: "assistant", content: res.data };

            // 응답 메시지 추가
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error("Error communicating with the server:", error);
            setError("응답을 가져오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>FAQ 상담 봇</h2>
            <div style={{ height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                        <strong>{msg.role === "user" ? "You" : "GPT"}:</strong> {msg.content}
                    </p>
                ))}
            </div>
            {loading && <p>응답을 기다리는 중...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatGPTApp;
