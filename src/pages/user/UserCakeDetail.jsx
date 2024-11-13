import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VenderHeader from '../vender/include/VenderHeader';
import "../../assets/css/user/CakeOrder.css"
import '../../assets/css/user/usermain.css';

const UserCakeDetail = () => {
    /* ===== 상태 관리 영역 시작 ===== */
    const location = useLocation();  // cakeorder에서 이동했을때

    const [selectedTab, setSelectedTab] = useState(
        location.state?.openReview ? '후기' : '상품 상세정보'
    );      // 현재 선택된 탭 관리
    const [selectedDate, setSelectedDate] = useState('');              // 선택된 픽업 날짜
    const [selectedTime, setSelectedTime] = useState('');              // 선택된 픽업 시간
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');  // 현재 표시되는 메인 이미지
    const [selectedFlavor, setSelectedFlavor] = useState('');          // 선택된 맛 옵션
    const [selectedSize, setSelectedSize] = useState('');              // 선택된 사이즈 옵션
    const [selectedColor, setSelectedColor] = useState(''); // 색상 선택을 위한 state 추가
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(128); // 초기 찜 개수

    const [isDragging, setIsDragging] = useState(false); //옵션 스크롤 효과
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const flavorContainerRef = useRef(null);
    const sizeContainerRef = useRef(null);
    const tabContentRef = useRef(null);




    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 스크롤
    }, []);
    // 리뷰 작성을 위한 상태
    const [newReview, setNewReview] = useState({
        rating: 5,        // 기본 별점은 5점으로 설정
        content: '',      // 리뷰 내용
        image: null       // 리뷰에 첨부될 이미지
    });
    const [imagePreview, setImagePreview] = useState(null);            // 업로드된 이미지 미리보기 URL

    // 리뷰 데이터 상태 (나중에 서버에서 받아올 데이터)
    const [reviews] = useState([
        {
            id: 1,
            rating: 5,
            author: 'cara0929',
            date: '2022.10.04',
            content: '아버님 환갑이셔서 컵케이크로 준비했어요! 보내드렸더니 너무너무 좋아하셨어요! 그려고 전에 맛보니깐 아직도잊 못하겠음요~',
            image: '/images/review1.jpg'
        },
        {
            id: 2,
            rating: 5,
            author: 'gika',
            date: '2022.05.14',
            content: '예쁘게 잘 만들어주셔서 감사합니당 >_<',
            image: '/images/review2.jpg'
        }
    ]);
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 스크롤
    }, []);
    useEffect(() => {
        // 리뷰 탭이 선택되었을 때 리뷰 섹션으로 스크롤
        if (location.state?.openReview) {
            const reviewSection = document.getElementById('리뷰');
            if (reviewSection) {
                setTimeout(() => {
                    reviewSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);  // 약간의 지연을 주어 렌더링 후 스크롤되도록 함
            }
        }
    }, [location.state?.openReview]);
  

    // 별점 통계 데이터
    const ratingStats = {
        5: 12,    // 5점 리뷰 개수
        4: 0,     // 4점 리뷰 개수
        3: 0,     // 3점 리뷰 개수
        2: 0,     // 2점 리뷰 개수
        1: 0,     // 1점 리뷰 개수
        average: 5 // 평균 평점
    };

    // 상품 이미지 배열
    const images = [
        '/images/2호_일반케이크.jpg',
        '/images/3호_특별한케이크(달력).jpg',
        '/images/1호_일반케이크 1.jpg',
        '/images/4호_달걀 한판 케이크.png'
    ];

    // 케이크 맛 옵션 데이터
    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/기브미 쪼꼬레또.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/바닐라.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/딸기.jpg' },
        { id: 'matcha', name: '말차', image: '/images/말차.png' },
        { id: 'cheese', name: '치즈', image: '/images/치즈.jpg' },
        { id: 'redvelvet', name: '레드벨벳', image: '/images/레드벨벳.jpg' }
    ];

    // 색깔 옵션
    const colorOptions = [
        { id: 'pink', name: '핑크', className: 'pink' },
        { id: 'yellow', name: '노랑', className: 'yellow' },
        { id: 'orange', name: '오렌지', className: 'orange' },
        { id: 'blue', name: '파랑', className: 'blue' },
        { id: 'green', name: '초록', className: 'green' },
        { id: 'purple', name: '보라', className: 'purple' },
        { id: 'brown', name: '갈색', className: 'brown' }
    ];
    // 케이크 사이즈 옵션 데이터
    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/1호.jpg' },
        { id: 'size2', name: '2호', image: '/images/2호.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' }
    ];

    /* ===== 이벤트 핸들러 영역 시작 ===== */

    // 썸네일 이미지 클릭 핸들러
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    // 찜 핸들러
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    };

    // 신고 핸들러
    const handleReportReview = (reviewId) => {
        const confirmed = window.confirm('이 리뷰를 신고하시겠습니까?');
        if (confirmed) {
            console.log(`리뷰 ${reviewId} 신고됨`);
            alert('신고가 접수되었습니다.');
        }
    };

    //옵션 스크롤 핸들러
    const handleMouseDown = (e, ref) => {
        setIsDragging(true);
        const container = ref.current;
        container.classList.add('dragging');
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
    };

    const handleMouseMove = (e, ref) => {
        if (!isDragging) return;
        e.preventDefault();
        const container = ref.current;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = (ref) => {
        setIsDragging(false);
        ref.current.classList.remove('dragging');
    };

    const handleMouseLeave = (ref) => {
        setIsDragging(false);
        ref.current.classList.remove('dragging');
    };

    // 옵션 선택 핸들러
    const handleFlavorSelect = (flavorId) => setSelectedFlavor(flavorId);
    const handleSizeSelect = (sizeId) => setSelectedSize(sizeId);
    const handleColorSelect = (colorId) => setSelectedColor(colorId);

    // 탭 클릭 핸들러
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        if (tab === '후기') {
            const reviewSection = document.getElementById('리뷰');
            if (reviewSection) {
                reviewSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const detailSection = document.getElementById('상품상세');
            if (detailSection) {
                detailSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // 리뷰 관련 핸들러
    const handleRatingChange = (rating) => {
        setNewReview(prev => ({ ...prev, rating }));
    };

    const handleReviewContent = (e) => {
        setNewReview(prev => ({ ...prev, content: e.target.value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewReview(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log('리뷰 제출:', newReview);
        setNewReview({ rating: 5, content: '', image: null });
        setImagePreview(null);
    };

    // 리뷰 섹션 렌더링
    const renderReviewSection = () => (
        <div className="reviews-container">
            <div className="review-form-container">
                <h3>리뷰 작성</h3>
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="rating-select">
                        <p>별점을 선택해주세요</p>
                        <div className="stars-input">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-button ${newReview.rating <= star ? 'filled' : ''}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="review-text-input">
                        <textarea
                            value={newReview.content}
                            onChange={handleReviewContent}
                            placeholder="리뷰를 작성해주세요 (최소 10자 이상)"
                            rows="4"
                        />
                    </div>
                    <div className="review-image-input">
                        <label className="image-upload-button">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            사진 첨부하기
                        </label>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setNewReview(prev => ({ ...prev, image: null }));
                                    }}
                                    className="remove-image"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="submit-review-button"
                        disabled={newReview.content.length < 10}
                    >
                        리뷰 등록하기
                    </button>
                </form>
            </div>

            <div className="rating-stats">
                <div className="rating-average">
                    <div className="stars">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className="star-filled">★</span>
                        ))}
                    </div>
                    <div className="average-score">
                        <span className="current-score">5</span>
                        <span className="total-score">/5</span>
                    </div>
                </div>
                <div className="rating-bars">
                    {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="rating-bar-row">
                            <span className="score">{score}점</span>
                            <div className="bar-container">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${(ratingStats[score] / 12) * 100}%`,
                                        background: score === 5 ? '#FF3B85' : '#e0e0e0'
                                    }}
                                ></div>
                            </div>
                            <span className="count">{ratingStats[score]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="review-list">
                <div className="review-filters">
                    <button className="active">추천순</button>
                    <button>최신순</button>
                    <button>평점순</button>
                    <label className="photo-only">
                        <input type="checkbox" /> 포토 리뷰만
                    </label>
                </div>

                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div className="review-header-info">
                                <div className="stars">
                                    {[...Array(review.rating)].map((_, index) => (
                                        <span key={index} className="star-filled">★</span>
                                    ))}
                                </div>
                                <span className="author">{review.author}</span>
                                <span className="date">{review.date}</span>
                            </div>
                            <button
                                className="report-button"
                                onClick={() => handleReportReview(review.id)}
                            >
                                <span className="report-icon">⚠️</span>
                                신고
                            </button>
                        </div>
                        <div className="review-content">
                            <p>{review.content}</p>
                            {review.image && (
                                <div className="review-image">
                                    <img src={review.image} alt="리뷰 이미지" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 탭 컨텐츠 렌더링
    const tabs = ['상품상세', '후기'];;

    const renderTabContent = () => (
        <div className="full-content">
            <div id="상품상세" className="content-section">
                <img src="/images/제품 설명 1.png" alt="상품 상세 정보" />
                <img src="/images/픽업 방법.png" alt="상품 상세 정보" />
                <img src="/images/상품문의.png" alt="상품 상세 정보" />
            </div>
            <div id="리뷰" className="content-section">
                {renderReviewSection()}
            </div>
        </div>
    );

    

    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader />
            <main id="user-wrap-body" className="clearfix">
                <div className="cake-order-container">
                    {/* 왼쪽 섹션: 상품 이미지 및 상세 정보 */}
                    <div className="left-section">
                        <div className="product-image">
                            <img src={mainImage} alt="케이크" className="main-image" />
                            <div className="thumbnail-container">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-wrapper ${mainImage === image ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`썸네일${index + 1}`}
                                            className="thumbnail-image"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-tabs">
                            <div className="tabs-header">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content" ref={tabContentRef}>
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 섹션: 상품 옵션 선택 영역 */}
                    <div className="right-section">
                        <div className="product-info">
                            <h2>Lettering 맛있는 레터링 크림케이크 (1호,2호)</h2>
                            <p className="price">46,000 won</p>
                            <div className="like-button-container">
                                <button
                                    className={`like-button ${isLiked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                >
                                    <span className="heart-icon">{isLiked ? '♥' : '♡'}</span>
                                    <span className="like-count">{likeCount}</span>
                                </button>
                            </div>
                        </div>

                        <div className="options">
                            <div className="option-group">
                                <h3>크림 색상</h3>
                                <div className="color-options">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.id}
                                            className={`color-option ${color.className} ${selectedColor === color.id ? 'active' : ''}`}
                                            onClick={() => handleColorSelect(color.id)}
                                            aria-label={`${color.name} 색상 선택`}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>맛</h3>
                                <div
                                    ref={flavorContainerRef}
                                    className="option-scroll-container"
                                    onMouseDown={(e) => handleMouseDown(e, flavorContainerRef)}
                                    onMouseMove={(e) => handleMouseMove(e, flavorContainerRef)}
                                    onMouseUp={() => handleMouseUp(flavorContainerRef)}
                                    onMouseLeave={() => handleMouseLeave(flavorContainerRef)}
                                >
                                    <div className="option-grid">
                                        {flavorOptions.map((flavor) => (
                                            <button
                                                key={flavor.id}
                                                className={`option-item ${selectedFlavor === flavor.id ? 'active' : ''}`}
                                                onClick={() => handleFlavorSelect(flavor.id)}
                                            >
                                                <div className="option-image">
                                                    <img src={flavor.image} alt={flavor.name} />
                                                </div>
                                                <span>{flavor.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>사이즈</h3>
                                <div
                                    ref={sizeContainerRef}
                                    className="option-scroll-container"
                                    onMouseDown={(e) => handleMouseDown(e, sizeContainerRef)}
                                    onMouseMove={(e) => handleMouseMove(e, sizeContainerRef)}
                                    onMouseUp={() => handleMouseUp(sizeContainerRef)}
                                    onMouseLeave={() => handleMouseLeave(sizeContainerRef)}
                                >
                                    <div className="option-grid">
                                        {sizeOptions.map((size) => (
                                            <button
                                                key={size.id}
                                                className={`option-item ${selectedSize === size.id ? 'active' : ''}`}
                                                onClick={() => handleSizeSelect(size.id)}
                                            >
                                                <div className="option-image">
                                                    <img src={size.image} alt={size.name} />
                                                </div>
                                                <span>{size.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>픽업 장소</h3>
                                <div className="location-select">
                                    <div className="map-placeholder">지도 영역. api가 필요합니다</div>
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

                            <div className="option-group">
                                <h3>케이크 위 레터링 요청</h3>
                                <div className="request-input">
                                    <textarea
                                        placeholder="예) 생크림을 좀만 넣어주세요."
                                        rows="4"
                                        className="request-textarea"
                                    />
                                </div>

                                <h3>케이크 판 레터링 요청</h3>
                                <div className="request-input">
                                    <textarea
                                        placeholder="예) 생크림을 좀만 넣어주세요."
                                        rows="4"
                                        className="request-textarea"
                                    />
                                </div>

                                <h3>기타 요청사항</h3>
                                <div className="request-input">
                                    <textarea
                                        placeholder="예) 살 안찌는 생크림케이크로 해주세요"
                                        rows="4"
                                        className="request-textarea"
                                    />
                                </div>
                            </div>
                        </div>

                        <Link to="/user/paymentdetail" className="submit-button">
                            요청사항 확인
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserCakeDetail;