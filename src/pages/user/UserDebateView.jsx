import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userdebateview.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { FaEye, FaHeart } from "react-icons/fa";

const UserDebateView = () => {
  const [leftVoteCount, setLeftVoteCount] = useState(10);
  const [rightVoteCount, setRightVoteCount] = useState(15);

  const totalVotes = leftVoteCount + rightVoteCount;
  const leftVotePercentage = totalVotes > 0 ? (leftVoteCount / totalVotes) * 100 : 0;
  const rightVotePercentage = totalVotes > 0 ? (rightVoteCount / totalVotes) * 100 : 0;

  const handleLeftVote = () => setLeftVoteCount(leftVoteCount + 1);
  const handleRightVote = () => setRightVoteCount(rightVoteCount + 1);

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-view-container">
          <div className="debate-view-header">
            <div className="user-debate-title">
              <span>토론 제목 예시</span>
            </div>

            <div className="debate-meta-info">
              <span><FaEye /> 조회수 120</span>
              <span>투표수 25</span>
              <span>작성자: 작성자A</span>
              <span>2024-11-01</span>
            </div>
          </div>

          {/* Images and Progress Bar Container */}
          <div className="debate-images-progress-container">
            <div className="debate-image-section">
              <div className="debate-image-container">
                <img src="/images/peach-cat-goma.gif" alt="케이크 A" />
                <button className="vote-button vote-button-a" onClick={handleLeftVote}>케이크 A 버튼</button>
              </div>
              <div className="vs-text">VS</div>
              <div className="debate-image-container">
                <img src="/images/doconghoa.gif" alt="케이크 B" />
                <button className="vote-button vote-button-b" onClick={handleRightVote}>케이크 B 버튼</button>
              </div>
            </div>

            <div className="vote-progress-bar">
              <div className="left-bar" style={{ width: `${leftVotePercentage}%` }}>
                {leftVotePercentage.toFixed(1)}% ({leftVoteCount}명)
              </div>
              <div className="right-bar" style={{ width: `${rightVotePercentage}%` }}>
                {rightVotePercentage.toFixed(1)}% ({rightVoteCount}명)
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="debate-description">
            <h2>내용</h2>
            <p>10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            10년지기 친구한테 줄 케이크를 사주려고 합니다...
            </p>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h2>댓글</h2>
            <div className="comment-input-wrapper">
              <div className="comment-textarea-container">
                <textarea placeholder="댓글 쓰기"></textarea>
              </div>
              <div className="comment-submit-container">
                <button className="submit-comment">등록</button>
              </div>
            </div>
            <div className="comment">
              <div className="comment-author">캣맘</div>
              <p>좋은 정보 감사합니다!</p>
            </div>
            <div className="comment">
              <div className="comment-author">내가달콤한거사줄게</div>
              <p>케이크 B가 정말 맛있어 보여요.</p>
            </div>
          </div>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateView;
