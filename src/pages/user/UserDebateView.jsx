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

  const textContent = `10년 지기 친구에게 줄 특별한 케이크를 준비하고 있는데, 친구가 고양이를 정말 좋아해서 케이크 디자인에 고양이 캐릭터를 넣으려고 해요. 
              두 가지 다 매력적이어서 결정하기가 정말 어려운데, 과연 어떤 고양이 캐릭터로 친구에게 완벽한 케이크를 선물할 수 있을까요?`;

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-view-container">
          <div className="debate-view-header">
            <div className="user-debate-title">
              <span>캐릭터 둘 중에 어떤 게 케이크로 만드는 게 좋을까요?</span>
            </div>

            <div className="debate-meta-info">
              <span><FaEye /> 조회수 120</span>
              <span>투표수 25</span>
              <span>작성자: 캣타워</span>
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
            <p>
              {textContent.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
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

            <div className="comment-list">
  <div className="comment">
    <div className="comment-profile-pic">
      <img
        src="https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="캣맘의 프로필"
      />
    </div>
    <div className="comment-content">
      <div className="comment-author-vote">
        <span className="comment-author">캣맘</span>
        <span className="user-vote-indicator-a">투표: 케이크 A</span>
      </div>
      <p>둘 다 만들어 주시죠!</p>
    </div>
  </div>
  <div className="comment">
    <div className="comment-profile-pic">
      <img
        src="https://via.placeholder.com/40"
        alt="내가달콤한거사줄게의 프로필"
      />
    </div>
    <div className="comment-content">
      <div className="comment-author-vote">
        <span className="comment-author">내가달콤한거사줄게</span>
        <span className="user-vote-indicator-b">투표: 케이크 B</span>
      </div>
      <p>케이크 B가 정말 맛있어 보여요.</p>
    </div>
  </div>
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
