// Import libraries
import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userdebateview.css";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserDebateView = () => {
  const [leftVoteCount, setLeftVoteCount] = useState(10);
  const [rightVoteCount, setRightVoteCount] = useState(15);

  // Calculate the total votes and percentages for each side
  const totalVotes = leftVoteCount + rightVoteCount;
  const leftVotePercentage =
    totalVotes > 0 ? (leftVoteCount / totalVotes) * 100 : 0;
  const rightVotePercentage =
    totalVotes > 0 ? (rightVoteCount / totalVotes) * 100 : 0;

  const handleLeftVote = () => setLeftVoteCount(leftVoteCount + 1);
  const handleRightVote = () => setRightVoteCount(rightVoteCount + 1);

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Navigation */}

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <section id="user-wrap-main">
          {/* Title Section */}
          <div className="j-title-section">
            <h2>제목: 게시물 제목 예시</h2>
          </div>
          {/* Meta Data Section */}
          <div className="j-meta-data">
            <span>등록자: 작성자A</span>
            <span>등록일: 2024-11-01</span>
            <span>조회수: 120</span>
            <span>투표수: 25</span>
          </div>

          <div className="j-images-section">
            <div className="j-image-container">
              <img src="https://via.placeholder.com/300" alt="케이크 A" />
              <div className="j-caption">케이크 사진 A</div>
              <button className="j-vote-button" onClick={handleLeftVote}>
                케이크 A 버튼
              </button>
            </div>
            <div className="j-vs-divider">VS</div>
            <div className="j-image-container">
              <img src="https://via.placeholder.com/300" alt="케이크 B" />
              <div className="j-caption">케이크 사진 B</div>
              <button className="j-vote-button" onClick={handleRightVote}>
                케이크 B 버튼
              </button>
            </div>
          </div>

          {/* Post Content Section */}
          <div className="post-text">
            <p>
              10년지기 친구한테 줄 케이크를 사주려고 합니다. 스폰지밥을 좋아하는
              것 같은데 둘 중 어떤 디자인이 더 좋을까요?
            </p>
          </div>

          {/* Combined Horizontal Progress Bar */}
          <div className="j-combined-progress-bar">
            <div
              className="j-bar-left"
              style={{ width: `${leftVotePercentage}%` }}
            >
              {leftVotePercentage > 10 && (
                <>
                  {leftVotePercentage.toFixed(1)}% ({leftVoteCount}명)
                </>
              )}
            </div>
            <div
              className="j-bar-right"
              style={{ width: `${rightVotePercentage}%` }}
            >
              {rightVotePercentage > 10 && (
                <>
                  {rightVotePercentage.toFixed(1)}% ({rightVoteCount}명)
                </>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="j-comment-section">
            <div className="j-comment-input-container">
              <textarea
                className="j-comment-box"
                placeholder="댓글 쓰는 섹션"
              ></textarea>
              <button className="j-comment-submit">등록</button>
            </div>
          </div>

          {/* Display of Other Comments */}
          <div className="j-other-comments">
            <div className="j-comment">
              <img
                src="https://via.placeholder.com/40"
                alt="작성자B의 프로필"
                className="j-profile-pic"
              />
              <div className="j-comment-content">
                <span className="j-comment-author">작성자B</span>
                <span className="j-user-side">(소비자 편)</span>
                <p>좋은 정보 감사합니다!</p>
              </div>
            </div>
            <div className="j-comment">
              <img
                src="https://via.placeholder.com/40"
                alt="작성자C의 프로필"
                className="j-profile-pic"
              />
              <div className="j-comment-content">
                <span className="j-comment-author">작성자C</span>
                <span className="j-user-side">(업자 편)</span>
                <p>케이크 B가 정말 맛있어 보여요.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateView;
