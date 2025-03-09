import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";  // useNavigate 추가
import AppRoutes from "./routes/Routes";
import './assets/css/App.css'; // 스타일 적용
import WebRTCReceiver from './features/webrtc/WebRTCReceiver';
import ChatGPTApp from './pages/main/ChatGPTApp.jsx';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // 챗봇 열림/닫힘 상태
  const [isTooltipVisible, setIsTooltipVisible] = useState(true); // 말풍선 보임 상태
  const [isAnimationRunning, setIsAnimationRunning] = useState(true); // 말풍선 애니메이션 상태

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // 챗봇 열림/닫힘 상태 토글
    setIsAnimationRunning(false); // 애니메이션 멈춤
    setIsTooltipVisible(false); // 말풍선 숨기기
  };

  useEffect(() => {
    // 애니메이션이 활성화된 경우에만 말풍선 반복 동작
    let interval;
    if (isAnimationRunning) {
      interval = setInterval(() => {
        setIsTooltipVisible((prev) => !prev);
      }, 3000); // 3초 간격으로 토글
    }
    console.log('isTooltipVisible:', isTooltipVisible);
    console.log('isChatOpen:', isChatOpen);

    return () => {
      if (interval) clearInterval(interval); // 컴포넌트 언마운트 시 정리
    };
  }, [isAnimationRunning]); // 애니메이션 상태가 변경될 때만 실행

  return (
    <div className="app-container">
      <AppRoutes />

      <BrowserRouter>
        <Routes>
          <Route path='/stream/:orderId' element={<WebRTCReceiver />} />
          {/* GPT Routes */}
          <Route path='/gpt' element={<ChatGPTApp />} />
        </Routes>
      </BrowserRouter>

      {/* 오른쪽 하단 플로팅 버튼 */}
      <div className="floating-chat-container">
        <div className={`chat-tooltip ${isTooltipVisible ? "visible" : "hidden"}`}>
          <div className="tooltip-text">
            <span>도움이 필요하시면</span>
            <br />
            <strong>눌러주세요!</strong>
          </div>
          <div className="tooltip-arrow"></div>
        </div>
        <div className="floating-chat-button" onClick={toggleChat}>
          🍰
        </div>
      </div>
      {/* 플로팅 버튼에서 열리는 ChatGPTApp */}
      {isChatOpen && (
        <div className="chat-bot-container">
          <div className="chat-header">
            <span>🍰 YUMMY 상담 봇</span>
            <button className="close-chat" onClick={toggleChat}>
              ×
            </button>
          </div>
          <ChatGPTApp />
        </div>
      )}
    </div>
  );
}

export default App;