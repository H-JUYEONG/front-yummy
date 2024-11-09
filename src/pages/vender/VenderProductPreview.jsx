import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/vender/venderProductPreview.css';


const VenderProductPreview = () => {
    // 기본 UI 상태 관리
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');
    const [selectedTab, setSelectedTab] = useState('상품 상세정보');
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const flavorContainerRef = useRef(null);
    const sizeContainerRef = useRef(null);
    const navigate = useNavigate();
    // 상품 이미지 배열
    const images = [
        '/images/2호_일반케이크.jpg',
        '/images/3호_특별한케이크(달력).jpg',
        '/images/1호_일반케이크 1.jpg',
        '/images/4호_달걀 한판 케이크.png'
    ];

    // 옵션 데이터
    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/flavor-choco.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/flavor-vanilla.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/flavor-strawberry.jpg' },
        { id: 'matcha', name: '말차', image: '/images/flavor-matcha.jpg' },
        { id: 'cheese', name: '치즈', image: '/images/flavor-cheese.jpg' },
        { id: 'redvelvet', name: '레드벨벳', image: '/images/flavor-redvelvet.jpg' }
    ];

    const colorOptions = [
        { id: 'pink', name: '핑크', className: 'pink' },
        { id: 'yellow', name: '노랑', className: 'yellow' },
        { id: 'orange', name: '오렌지', className: 'orange' }
    ];

    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/size-1.jpg' },
        { id: 'size2', name: '2호', image: '/images/size-2.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' }
    ];

    // 탭 메뉴 항목
    const tabs = ['상품 상세정보', '배송/교환/환불', '상품후기', '상품문의'];

    // 썸네일 클릭 핸들러
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    // 스크롤 핸들러
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

    // 탭 컨텐츠 렌더링
    const renderTabContent = () => {
        switch (selectedTab) {
            case '상품 상세정보':
                return (
                    <div className="detail-content">
                        <img src="/images/제품 설명 1.png" alt="상품 상세 이미지" className="detail-image" />
                        <img src="/images/제품 설명 1.png" alt="상품 상세 이미지" className="detail-image" />
                    </div>
                );
            case '배송/교환/환불':
                return (
                    <div className="delivery-content">
                        <img src="/images/제품 설명 1.png" alt="배송 정보" className="info-image" />
                    </div>
                );
            case '상품후기':
                return (
                    <div className="reviews-container">
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
                        </div>
                    </div>
                );
            case '상품문의':
                return (
                    <div className="inquiry-content">
                        <img src="/images/제품 설명 1.png" alt="문의 가이드" className="inquiry-image" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div id="vendor-preview-wrap" className="text-center preview-mode">
            <header id="vendor-preview-wrap-head">
                {/* 미리보기 모드라는 것을 props로 전달 */}
                <h1>미리보기 화면</h1>
                <button onClick={() => navigate('/vender/registrationform')}>뒤로가기</button>
                <button>등록하기</button>
            </header>
            <main id="vendor-wrap-body" className="clearfix">
                <div className="cake-order-container">
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
                            <h2>Lettering 맛있는 레터링 크림케이크 (1호, 2호)</h2>
                            <p className="price">46,000 won</p>
                            <p className="description">고객님만을 위한 특별한 케이크, 다양한 맛과 크림 색상으로 나만의 특별한 디자인을 완성하세요.</p>
                        </div>

                        <div className="preview-options">
                            <div className="option-group">
                                <h3>크림 색상</h3>
                                <div className="color-preview">
                                    {colorOptions.map((color) => (
                                        <div key={color.id} className={`color-option ${color.className}`}></div>
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
                                    <div className="flavor-preview">
                                        {flavorOptions.map((flavor) => (
                                            <div key={flavor.id} className="flavor-option">
                                                <img src={flavor.image} alt={flavor.name} />
                                                <span>{flavor.name}</span>
                                            </div>
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
                                    <div className="size-preview">
                                        {sizeOptions.map((size) => (
                                            <div key={size.id} className="size-option">
                                                <img src={size.image} alt={size.name} />
                                                <span>{size.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>픽업 정보</h3>
                                <div className="pickup-preview">
                                    <div className="pickup-location">
                                        <h4>픽업 가능 매장</h4>
                                        <div className="map-placeholder">지도 영역</div>
                                    </div>
                                    <div className="pickup-time">
                                        <h4>픽업 가능 시간</h4>
                                        <p>매일 10:00 ~ 14:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>레터링</h3>
                                <div className="lettering-preview">
                                    <p>레터링 문구 작성 가능 (최대 30자)</p>
                                    <p className="example">예) 생일 축하해 뽀미야~♡</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default VenderProductPreview;