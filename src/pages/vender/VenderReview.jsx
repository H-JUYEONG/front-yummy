import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';
import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/venderreview.css'; // 대시보드 전용 스타일
const API_URL = process.env.REACT_APP_API_URL;

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const reviewsPerPage = 5; // 항상 고정된 리뷰 개수
    const [filter, setFilter] = useState("all"); // 필터 상태 (all, replied, notReplied)
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const [loading, setLoading] = useState(true);
    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기

    // 필터링된 리뷰
    const filteredReviews = reviews.filter((review) => {
        if (filter === "replied") return review.reply_status === 'replied';
        if (filter === "notReplied") return review.reply_status === 'notReplied';
        return true; // "all"
    });
    // 페이지 데이터 슬라이싱
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    // 페이지 변경
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/reviews`, {
                    params: { venderId },
                });
                setReviews(response.data); // 기존 데이터를 덮어씌우기
            } catch (error) {
                console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        setReviews([]); // 상태 초기화
        fetchReviews();
    }, [venderId]); // venderId가 변경될 때만 호출
    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="vender-container">
            <div className="vender-content-wrapper">
                {/* 사이드바 */}
                <VenderSidebar />
                {/* 콘텐츠 영역 */}
                <div className="vender-content">
                    <header className="vender-header">
                        <VenderHeader />
                    </header>
                    <div className="vender-reviewlist">
                        <h1>리뷰 관리</h1>
                        {/* 필터 버튼 */}
                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                                onClick={() => setFilter("all")}
                            >
                                전체 보기
                            </button>
                            <button
                                className={`filter-btn ${filter === "replied" ? "active" : ""}`}
                                onClick={() => setFilter("replied")}
                            >
                                답글 있음
                            </button>
                            <button
                                className={`filter-btn ${filter === "notReplied" ? "active" : ""}`}
                                onClick={() => setFilter("notReplied")}
                            >
                                답글 없음
                            </button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>리뷰 ID</th>
                                    <th>상품 ID</th>
                                    <th>상품 이름</th>
                                    <th>리뷰 내용</th>
                                    <th>별점</th>
                                    <th>상태</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReviews.map((review) => {

                                    const hasReviewed = !!review.reply_status; // 답글 여부
                                    return (
                                        <tr key={review.review_id}>
                                            <td>{review.review_id}</td>
                                            <td>
                                                <Link to={`/user/cakedetail/${review.product_id}/${review.vender_id}`}>
                                                    {review.product_id}
                                                </Link>
                                            </td>
                                            <td>{review.product_name}</td>
                                            <td>{review.review_content}</td>
                                            <td>{review.review_rating}</td>
                                            <td>
                                                <span className={`status ${review.reply_status === 'replied' ? 'has-review' : 'no-review'}`}>
                                                    {review.reply_status === 'replied' ? "답글 있음" : "답글 없음"}
                                                </span>
                                            </td>
                                            <td>
                                                {review.reply_status === 'replied' ?(
                                                    <Link
                                                        to={`/user/cakedetail/${review.product_id}/${review.vender_id}`}
                                                        className="action-btn"
                                                    >
                                                        리뷰 보기
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to={`/user/cakedetail/${review.product_id}/${review.vender_id}`}
                                                        className="action-btn"
                                                    >
                                                        리뷰 쓰기
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            reviewsPerPage={reviewsPerPage}
                            totalReviews={filteredReviews.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ reviewsPerPage, totalReviews, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`page-btn ${currentPage === number ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}
        </nav>
    );
};


export default ReviewList;
