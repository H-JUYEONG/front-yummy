import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import "../../assets/css/user/userauditionboard.css";

const UserAuditionBoard = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("전체"); // 기본값은 전체 보기
    const totalPages = 5; // 예시 페이지 수

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleImageClick = () => {
        navigate("/user/audition/ongoing");
    };

    const cardData = [
        { id: 1, title: "아빠 생일 축하드립니다", author: "참여 10명", status: "진행 중" },
        { id: 2, title: "생일 케이크 도시락", author: "참여 3명", status: "종료" },
        { id: 3, title: "고구마로 3호 케이크", author: "참여 12명", status: "진행 중" },
        // ... (추가 카드 데이터)
    ];

    // 선택된 필터에 맞게 카드 데이터 필터링
    const filteredData = cardData.filter(card => filter === "전체" || card.status === filter);

    return (
        <div id="user-wrap" className="text-center">
            <header id="user-wrap-head">
                <Header />
            </header>

            <main id="user-wrap-body" className="clearfix">
                <div className="user-audition-board-list">
                    <div>
                        <h2>나만의 케이크를 의뢰하세요.</h2>
                        <p>
                            마음에 드는 디자인을 발견하면 <strong>'케이크 오디션'</strong>을
                            통해 제작 요청을 남겨보세요!
                        </p>
                    </div>

                    {/* 상태 필터 버튼 */}
                    <div className="filter-buttons">
                        <button
                            className={`filter-button ${filter === "전체" ? "active" : ""}`}
                            onClick={() => setFilter("전체")}
                        >
                            전체
                        </button>
                        <button
                            className={`filter-button ${filter === "진행 중" ? "active" : ""}`}
                            onClick={() => setFilter("진행 중")}
                        >
                            진행 중
                        </button>
                        <button
                            className={`filter-button ${filter === "종료" ? "active" : ""}`}
                            onClick={() => setFilter("종료")}
                        >
                            종료
                        </button>
                    </div>

                    <div id="user-cake-design-add" className="clearfix">
                        <div className="user-cake-design-all">ALL {filteredData.length}</div>
                        <div className="user-cake-design-add-btn">
                            <button onClick={() => navigate("/user/audition/add")}>
                                등록하기
                            </button>
                        </div>
                    </div>

                    <div className="user-cake-design-list-grid">
                        {filteredData.map((card) => (
                            <div key={card.id} className="user-cake-design-card">
                                <div className="user-cake-design-card-image">
                                    <img
                                        src="/images/2호_일반케이크.jpg"
                                        onClick={handleImageClick}
                                        alt="케이크 도안"
                                    />
                                    <span className={`status-badge ${card.status === "진행 중" ? "ongoing" : "completed"}`}>
                                        {card.status}
                                    </span>
                                </div>
                                <div className="user-cake-design-card-info">
                                    <h3 className="user-cake-design-card-title">{card.title}</h3>
                                    <p className="user-cake-design-card-subtitle">{card.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="user-cake-design-pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-arrow pagination-arrow-left"
                        >
                            {"<"}
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`pagination-page-number ${currentPage === index + 1 ? "pagination-page-active" : ""}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-arrow pagination-arrow-right"
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </main>

            <footer id="user-wrap-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default UserAuditionBoard;
