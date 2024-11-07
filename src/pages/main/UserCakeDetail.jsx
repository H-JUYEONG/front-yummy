import React, { useState } from 'react';
import "../../assets/css/main/CakeOrder.css"
import '../../assets/css/all.css';

const UserCakeDetail = () => {
    const [selectedTab, setSelectedTab] = useState('상품 상세정보');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviews, setReviews] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimeSelect, setShowTimeSelect] = useState(false);
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');

    //이미지 관련 함수
    const images = [
        '/images/2호_일반케이크.jpg',
        '/images/3호_특별한케이크(달력).jpg',
        '/images/2호_일반케이크.jpg',  // 예시 이미지들입니다. 실제 이미지로 교체해주세요
        '/images/3호_특별한케이크(달력).jpg'
    ];

    const handleAddReview = () => {
        if (reviewContent.trim()) {
            setReviews([
                ...reviews,
                {
                    id: Date.now(),
                    content: reviewContent,
                    replies: [],
                },
            ]);
            setReviewContent('');
        }
    };

    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };


    const handleAddReply = (reviewId, replyContent) => {
        setReviews(
            reviews.map((review) =>
                review.id === reviewId
                    ? {
                        ...review,
                        replies: [
                            ...review.replies,
                            { id: Date.now(), content: replyContent },
                        ],
                    }
                    : review
            )
        );
    };

    const tabs = ['상품 상세정보', '배송/교환/환불', '상품후기', '상품문의'];

    const renderTabContent = () => {
        switch (selectedTab) {
            case '상품 상세정보':
                return <div>상품 상세정보 내용</div>;
            case '배송/교환/환불':
                return <div>배송/교환/환불 내용</div>;
            case '상품후기':
                return (
                    <div className="reviews">
                        <div className="review-input">
                            <textarea
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                placeholder="후기를 작성해주세요"
                            />
                            <button onClick={handleAddReview}>작성하기</button>
                        </div>
                        <div className="review-list">
                            {reviews.map((review) => (
                                <div key={review.id} className="review-item">
                                    <p>{review.content}</p>
                                    <div className="replies">
                                        {review.replies.map((reply) => (
                                            <div key={reply.id} className="reply-item">
                                                <p>{reply.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case '상품문의':
                return <div>상품문의 내용</div>;
            default:
                return null;
        }
    };

    return (
        <div id="wrap" className="text-center">
            {/* Header */}
            <header id="wrap-head">
                <h1>Header 영역</h1>
            </header>

            <main id="wrap-body" className="clearfix">

                
                <div className="cake-order-container">
                    <div className="left-section">
                        <div className="product-image">
                            <img src="/images/2호_일반케이크.jpg" alt="케이크" className="main-image" />
                            <div className="thumbnail-images">
                                <img src="/images/3호_특별한케이크(달력).jpg" alt="썸네일1" />
                                <img src="/thumbnail2.jpg" alt="썸네일2" />
                            </div>
                        </div>

                        <div className="product-tabs">
                            <div className="tabs-header">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                                        onClick={() => setSelectedTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="product-info">
                            <h2>Lettering 데이시_레터크림 (1호,2호)</h2>
                            <p className="price">46,000 won</p>
                        </div>

                        <div className="options">
                            <div className="option-group">
                                <h3>크림 색상</h3>
                                <div className="color-options">
                                    <button className="color-option pink"></button>
                                    <button className="color-option yellow"></button>
                                    <button className="color-option orange"></button>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>픽업 장소</h3>
                                <div className="location-select">
                                    <div className="map-placeholder">지도 영역</div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>픽업 날짜</h3>
                                <div className="date-select">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="date-input"
                                    />
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>픽업 시간</h3>
                                <div className="time-select">
                                    <select
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="time-input"
                                    >
                                        <option value="">시간 선택</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="submit-button">
                            주문하기
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserCakeDetail;