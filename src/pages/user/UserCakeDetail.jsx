// 필요한 리액트 훅과 스타일시트 import
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/user/CakeOrder.css"
import '../../assets/css/user/usermain.css';
import Header from '../include/Header';
import Footer from '../include/Footer';

const UserCakeDetail = () => {
    /* ===== 상태 관리 영역 시작 ===== */

    // 기본 UI 컨트롤을 위한 상태들
    const [selectedTab, setSelectedTab] = useState('상품 상세정보');    // 현재 선택된 탭 관리
    const [selectedDate, setSelectedDate] = useState('');              // 선택된 픽업 날짜
    const [selectedTime, setSelectedTime] = useState('');              // 선택된 픽업 시간
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');  // 현재 표시되는 메인 이미지
    const [selectedFlavor, setSelectedFlavor] = useState('');          // 선택된 맛 옵션
    const [selectedSize, setSelectedSize] = useState('');              // 선택된 사이즈 옵션
    const [selectedColor, setSelectedColor] = useState(''); // 색상 선택을 위한 state 추가

    const [isDragging, setIsDragging] = useState(false); //옵션 스크롤 효과
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const flavorContainerRef = useRef(null);
    const sizeContainerRef = useRef(null);


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
        },
        // 추후 더 많은 리뷰 데이터가 추가될 예정
    ]);

    // 별점 통계 데이터 (나중에 서버에서 계산된 값을 받아올 예정)
    const ratingStats = {
        5: 12,    // 5점 리뷰 개수
        4: 0,     // 4점 리뷰 개수
        3: 0,     // 3점 리뷰 개수
        2: 0,     // 2점 리뷰 개수
        1: 0,     // 1점 리뷰 개수
        average: 5 // 평균 평점
    };

    /* ===== 상품 관련 데이터 영역 시작 ===== */

    // 상품 이미지 배열 - 메인 이미지와 썸네일로 사용될 이미지들
    const images = [
        '/images/2호_일반케이크.jpg',
        '/images/3호_특별한케이크(달력).jpg',
        '/images/1호_일반케이크 1.jpg',
        '/images/4호_달걀 한판 케이크.png'
    ];

    // 케이크 맛 옵션 데이터
    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/flavor-choco.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/flavor-vanilla.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/flavor-strawberry.jpg' },
        { id: 'matcha', name: '말차', image: '/images/flavor-matcha.jpg' },
        { id: 'cheese', name: '치즈', image: '/images/flavor-cheese.jpg' },
        { id: 'redvelvet', name: '레드벨벳', image: '/images/flavor-redvelvet.jpg' }
    ];
    // 색깔 옵션 추가
    const colorOptions = [
        { id: 'pink', name: '핑크', className: 'pink' },
        { id: 'yellow', name: '노랑', className: 'yellow' },
        { id: 'orange', name: '오렌지', className: 'orange' }
    ];




    // 케이크 사이즈 옵션 데이터
    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/size-1.jpg' },
        { id: 'size2', name: '2호', image: '/images/size-2.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' }
    ];

    /* ===== 이벤트 핸들러 영역 시작 ===== */

    // 썸네일 이미지 클릭 시 메인 이미지 변경하는 핸들러
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);

    };

    //부드럽게 옵션 넘기는 핸들러
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



    // 케이크 옵션 선택 핸들러들
    const handleFlavorSelect = (flavorId) => setSelectedFlavor(flavorId);    // 맛 선택
    const handleSizeSelect = (sizeId) => setSelectedSize(sizeId);            // 사이즈 선택
    const handleColorSelect = (colorId) => { //색깔 선택
        setSelectedColor(colorId);
    };

    /* ===== 리뷰 관련 핸들러 영역 시작 ===== */

    // 별점 선택 핸들러
    const handleRatingChange = (rating) => {
        setNewReview(prev => ({ ...prev, rating }));
    };

    // 리뷰 내용 입력 핸들러
    const handleReviewContent = (e) => {
        setNewReview(prev => ({ ...prev, content: e.target.value }));
    };

    // 리뷰 이미지 업로드 처리 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 선택된 이미지 파일을 상태에 저장
            setNewReview(prev => ({ ...prev, image: file }));

            // FileReader를 사용하여 이미지 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 리뷰 제출 처리 핸들러
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // 여기에 실제 리뷰 제출 로직이 추가될 예정 (서버 통신 등)
        console.log('리뷰 제출:', newReview);

        // 폼 초기화
        setNewReview({ rating: 5, content: '', image: null });
        setImagePreview(null);
    };

    /* ===== 탭 관련 로직 영역 시작 ===== */

    // 탭 메뉴 항목 정의
    const tabs = ['상품 상세정보', '배송/교환/환불', '상품후기', '상품문의'];

    // 선택된 탭에 따른 컨텐츠 렌더링 함수
    const renderTabContent = () => {
        switch (selectedTab) {
            case '상품 상세정보':
                return (
                    <div className="detail-content">
                        <img src="/images/제품 설명 1.png" alt="상품 상세 이미지" className="detail-image" />
                        <img src="/images/제품 설명 1.png" alt="상품 상세 이미지" className="detail-image" />
                        {/* 필요한 만큼 이미지 추가 */}
                    </div>
                );
            case '배송/교환/환불':
                return (
                    <div className="delivery-content">
                        <img src="/images/제품 설명 1.png" alt="배송 정보" className="info-image" />
                        {/* 배송/교환/환불 관련 이미지들 */}
                    </div>
                );
            case '상품후기':
                return (
                    <div className="reviews-container">
                        {/* 리뷰 작성 폼 영역 */}
                        <div className="review-form-container">
                            <h3>리뷰 작성</h3>
                            <form onSubmit={handleReviewSubmit} className="review-form">
                                {/* 별점 선택 영역 */}
                                <div className="rating-select">
                                    <p>별점을 선택해주세요</p>
                                    <div className="stars-input">
                                        {[5,4,3,2,1].map((star) => ( // 순서를 1부터 5로 변경
                                            <button
                                                key={star}
                                                type="button"
                                                className={`star-button ${newReview.rating <= star ? 'filled' : ''}`} // 비교 연산자 변경
                                                onClick={() => handleRatingChange(star)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* 리뷰 텍스트 입력 영역 */}
                                <div className="review-text-input">
                                    <textarea
                                        value={newReview.content}
                                        onChange={handleReviewContent}
                                        placeholder="리뷰를 작성해주세요 (최소 10자 이상)"
                                        rows="4"
                                    />
                                </div>

                                {/* 이미지 업로드 영역 */}
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
                                    {/* 이미지 미리보기 영역 */}
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

                                {/* 제출 버튼 */}
                                <button
                                    type="submit"
                                    className="submit-review-button"
                                    disabled={newReview.content.length < 10}
                                >
                                    리뷰 등록하기
                                </button>
                            </form>
                        </div>

                        {/* 별점 통계 섹션 시작 */}
                        <div className="rating-stats">
                            {/* 평균 평점 표시 영역 */}
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
                            {/* 별점 분포 막대 그래프 */}
                            <div className="rating-bars">
                                {[1, 2, 3, 4, 5].map((score) => (
                                    <div key={score} className="rating-bar-row">
                                        <span className="score">{score}점</span>
                                        <div className="bar-container">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${(ratingStats[score] / 12) * 100}%`,
                                                    // 5점은 핑크색, 나머지는 회색으로 표시
                                                    background: score === 5 ? '#FF3B85' : '#e0e0e0'
                                                }}
                                            ></div>
                                        </div>
                                        <span className="count">{ratingStats[score]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 리뷰 목록 섹션 시작 */}
                        <div className="review-list">
                            {/* 리뷰 필터링 옵션 */}
                            <div className="review-filters">
                                <button className="active">추천순</button>
                                <button>최신순</button>
                                <button>평점순</button>
                                <label className="photo-only">
                                    <input type="checkbox" /> 포토 리뷰만
                                </label>
                            </div>

                            {/* 개별 리뷰 아이템들 매핑 */}
                            {reviews.map((review) => (
                                <div key={review.id} className="review-item">
                                    {/* 리뷰 헤더: 별점, 작성자, 날짜 */}
                                    <div className="review-header">
                                        <div className="stars">
                                            {[...Array(review.rating)].map((_, index) => (
                                                <span key={index} className="star-filled">★</span>
                                            ))}
                                        </div>
                                        <span className="author">{review.author}</span>
                                        <span className="date">{review.date}</span>
                                    </div>
                                    {/* 리뷰 본문: 텍스트와 이미지 */}
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
            case '상품문의':
                return (
                    <div className="inquiry-content">
                        <img src="/images/제품 설명 1.png" alt="문의 가이드" className="inquiry-image" />
                        {/* 상품문의 관련 이미지들 */}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        // 전체 페이지 래퍼
        <div id="user-wrap" className="text-center">
            {/* 헤더 영역 */}
            <header id="user-wrap-head">
                <Header/>
            </header>

            {/* 메인 컨텐츠 영역 */}
            <main id="user-wrap-body" className="clearfix">
                <div className="cake-order-container">
                    {/* 왼쪽 섹션: 상품 이미지 및 상세 정보 */}
                    <div className="left-section">
                        {/* 상품 이미지 갤러리 */}
                        <div className="product-image">
                            {/* 메인 이미지 */}
                            <img src={mainImage} alt="케이크" className="main-image" />
                            {/* 썸네일 이미지 그리드 */}
                            <div className="thumbnail-container">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        // 현재 선택된 이미지에 active 클래스 추가
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

                        {/* 상품 정보 탭 영역 */}
                        <div className="product-tabs">
                            {/* 탭 헤더 */}
                            <div className="tabs-header">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        // 현재 선택된 탭에 active 클래스 추가
                                        className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                                        onClick={() => setSelectedTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            {/* 탭 컨텐츠 */}
                            <div className="tab-content">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 섹션: 상품 옵션 선택 영역 */}
                    <div className="right-section">
                        {/* 상품 기본 정보 */}
                        <div className="product-info">
                            <h2>Lettering 맛있는 레터링 크림케이크 (1호,2호)</h2>
                            <p className="price">46,000 won</p>
                        </div>

                        {/* 옵션 선택 영역 */}
                        <div className="options">
                            {/* 크림 색상 선택 */}
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

                            {/* 맛 선택 */}
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

                            {/* 사이즈 선택도 동일한 방식으로 수정,ref를 따로주기 */}
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

                            {/* 픽업 장소 선택 */}
                            <div className="option-group">
                                <h3>픽업 장소</h3>
                                <div className="location-select">
                                    <div className="map-placeholder">지도 영역. api가 필요합니다</div>
                                </div>
                            </div>

                            {/* 픽업 날짜 선택 */}
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

                            {/* 픽업 시간 선택 */}
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
                                    <p className="request-notice">

                                    </p>
                                </div>
                                <h3>기타 요청사항</h3>
                                <div className="request-input">
                                    <textarea
                                        placeholder="예) 살 안찌는 생크림케이크로 해주세요"
                                        rows="4"
                                        className="request-textarea"
                                    />
                                    <p className="request-notice">

                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 주문 버튼 */}
                        <Link to="/user/paymentdetail" className="submit-button">
                            요청사항 확인
                        </Link>
                    </div>
                </div>
            </main>

            {/* 푸터 영역 */}
            <footer className="user-full-width">
               <Footer/>
            </footer>
        </div>
    );
};


export default UserCakeDetail;