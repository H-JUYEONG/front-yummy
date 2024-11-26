import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';
import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/statistics.css'; // 대시보드 전용 스타일
const API_URL = process.env.REACT_APP_API_URL;

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // API 호출
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/reviews`, {
                    params: { venderId: 39 }, // venderId는 동적으로 변경 가능
                });
                setReviews(response.data);
            } catch (error) {
                console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchReviews();
    }, []);

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
                    <div>
                        <h1>리뷰 관리</h1>
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
                                {reviews.map((review) => {
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
                                            <td>{hasReviewed ? "답글 있음" : "답글 없음"}</td>
                                            <td>
                                                {hasReviewed ? (
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
