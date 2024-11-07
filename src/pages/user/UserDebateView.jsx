// Import libraries
import React from 'react';
import '../../assets/css/user/userdebateview.css';
import '../../assets/css/all.css';
// Import components (if any additional components are needed)

const UserDebateView = () => {
    return (
        <div className="j-container">
            {/* Header */}
            <header className="j-header">
                <h1>게시물 상세 보기</h1>
            </header>

            {/* Navigation */}
            <nav className="j-nav">
                {/* href="#" 대신 button 요소로 대체 */}
                <button onClick={() => alert("홈으로 이동")}>홈</button>
                <button onClick={() => alert("업체 리스트로 이동")}>업체 리스트</button>
                <button onClick={() => alert("마이페이지로 이동")}>마이페이지</button>
            </nav>

            {/* Main Content */}
            <div className="j-content">
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

                {/* Images Section */}
                <div className="j-images-section">
                    <div className="j-image-container">
                        <img src="https://via.placeholder.com/300" alt="케이크 A" />
                        <div className="j-caption">케이크 사진 A</div>
                    </div>
                    <div className="j-vs-divider">VS</div>
                    <div className="j-image-container">
                        <img src="https://via.placeholder.com/300" alt="케이크 B" />
                        <div className="j-caption">케이크 사진 B</div>
                    </div>
                </div>

                {/* Post Content Section */}
                <div className="j-post-content">
                    <p>10년지기 친구한테 줄 케이크를 사주려고 합니다. 스폰지밥을 좋아하는 것 같은데 둘 중 어떤 디자인이 더 좋을까요?</p>
                </div>

                {/* Voting Buttons Section */}
                <div className="j-voting-buttons">
                    <button className="j-vote-button">케이크 A 버튼</button>
                    <span className="j-click-count">Clicked: 10</span>
                    <button className="j-vote-button">케이크 B 버튼</button>
                    <span className="j-click-count">Clicked: 15</span>
                </div>

                {/* Comment Section */}
                <div className="j-comment-section">
                    <textarea className="j-comment-box" placeholder="댓글 쓰는 섹션"></textarea>
                    <button className="j-comment-submit">등록</button>

                    {/* Display of Other Comments */}
                    <div className="j-other-comments">
                        <div className="j-comment">
                            <img src="https://via.placeholder.com/40" alt="작성자B의 프로필" className="j-profile-pic" />
                            <div className="j-comment-content">
                                <span className="j-comment-author">작성자B</span>
                                <span className="j-user-side">(소비자 편)</span>
                                <p>좋은 정보 감사합니다!</p>
                            </div>
                        </div>
                        <div className="j-comment">
                            <img src="https://via.placeholder.com/40" alt="작성자C의 프로필" className="j-profile-pic" />
                            <div className="j-comment-content">
                                <span className="j-comment-author">작성자C</span>
                                <span className="j-user-side">(업자 편)</span>
                                <p>케이크 B가 정말 맛있어 보여요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="j-footer">
                <p>케이크 사이트 © 2024. 모든 권리 보유.</p>
            </footer>
        </div>
    );
};

export default UserDebateView;
