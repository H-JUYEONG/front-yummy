import React from 'react';
import '../../assets/css/vender/venderreview.css'; // 업체 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';

const VenderReview = () => {
    const reviews = [
        {
            rating: '★★★★☆',
            author: '네이버아이디 구슬자',
            content: '케이크가 정말 맛있었어요! 배송도 매우 빨랐습니다.',
            date: '2024-06-22 13:00:52',
        },
        {
            rating: '★★★★★',
            author: '네이버아이디 구슬자',
            content: '너무 예쁜 디자인으로 만족스러웠습니다.',
            date: '2023-08-02 14:00:00',
        },
        {
            rating: '★★★★☆',
            author: '김소희',
            content: '배송 빠르고, 맛도 최고였어요.',
            date: '2022-12-13 17:30:10',
        }
    ];

    return (
        <>
            <div className="vender-container">
                <div className="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <main>
                            <section className="review-management-section">
                                <h2 className="review-info-text">
                                   리뷰 관리
                                </h2>
                                <table className="review-table">
                                    <thead>
                                        <tr>
                                            <th>별점</th>
                                            <th>작성자 아이디</th>
                                            <th>리뷰 내용</th>
                                            <th>작성 날짜</th>
                                            <th>관리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((review, index) => (
                                            <tr key={index}>
                                                <td>{review.rating}</td>
                                                <td>{review.author}</td>
                                                <td>{review.content}</td>
                                                <td>{review.date}</td>
                                                <td>
                                                    <button className="delete-button">삭제</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenderReview;
