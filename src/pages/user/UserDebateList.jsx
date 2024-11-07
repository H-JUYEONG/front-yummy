// Import libraries
import React from 'react';
import '../../assets/css/board/debateList.css';
import '../../assets/css/all.css';
// Import components (if any additional components are needed)

const UserDebateList = () => {
    return (
        <div id="wrap" className="text-center">
            {/* Header */}
            <header id="wrap-head">
                <h1>어떤 도안이 이쁜지 모르겠나요? 한번 올려보세요! 🧁</h1>
            </header>

            {/* Navigation Bar */}
            <nav id="wrap-nav" className="clearfix">
                <ul className="j-nav-menu">
                    <li>자유 게시판</li>
                    <li>도안 게시판</li>
                    <li className="j-active">토론 게시판</li>
                </ul>
            </nav>

            {/* Main Content */}
            <main id="wrap-body" className="clearfix">
                {/* Main Section */}
                <section id="wrap-main">
                    <h2>토론 게시판</h2>
                    <p>원하는 토론 주제를 선택하거나 새 글을 작성해보세요.</p>

                    {/* Toolbar */}
                    <div className="j-discussion-toolbar">
                        <select className="j-category-select">
                            <option value="all">전체</option>
                            <option value="design">도안 토론</option>
                            <option value="vendor">업체 토론</option>
                        </select>
                        <div className="j-search-bar">
                            <input type="text" placeholder="검색어를 입력하세요" />
                            <button className="j-search-btn">검색</button>
                        </div>
                    </div>

                    {/* Discussion Table */}
                    <table className="j-discussion-list">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>카테고리</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>첫 번째 토론 주제</td>
                                <td>도안 토론</td>
                                <td>작성자A</td>
                                <td>2024-11-01</td>
                                <td>120</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>두 번째 토론 주제</td>
                                <td>업체 토론</td>
                                <td>작성자B</td>
                                <td>2024-11-01</td>
                                <td>85</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>세 번째 토론 주제</td>
                                <td>도안 토론</td>
                                <td>작성자C</td>
                                <td>2024-11-01</td>
                                <td>300</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Pagination and Write Button */}
                    <div className="j-bottom-toolbar">
                        <div className="j-pagination">
                            <button className="j-page-btn">1</button>
                            <button className="j-page-btn">2</button>
                            <button className="j-page-btn">3</button>
                            <button className="j-next-btn">다음 &gt;</button>
                        </div>
                        <button className="j-write-btn">글쓰기</button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="full-width">
                <p>게시물의 의견은 해당 사용자에게 있습니다.</p>
            </footer>
        </div>
    );
};

export default UserDebateList;
