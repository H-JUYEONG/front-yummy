import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import VenderHeader from '../vender/include/VenderHeader';
import "../../assets/css/user/CakeOrder.css"
import '../../assets/css/user/usermain.css';

// 옵션 타입 정의
const OPTION_TYPES = {
    'Product Type': { title: '상품 타입', stateKey: 'selectedType' },
    'Cake Size': { title: '사이즈', stateKey: 'selectedSize' },
    'Flavor - Sheet': { title: '시트 맛', stateKey: 'selectedSheetFlavor' },
    'Flavor - Cream': { title: '크림 맛', stateKey: 'selectedCreamFlavor' },
    'Cake Background Color': { title: '케이크 배경색', stateKey: 'selectedBgColor' },
    'Cream Position': { title: '크림 위치', stateKey: 'selectedCreamPosition' },
    'Cream Color': { title: '크림 색상', stateKey: 'selectedCreamColor' },
    'Decoration Type': { title: '데코레이션 타입', stateKey: 'selectedDecoration' },
    'Decoration Color': { title: '데코레이션 색상', stateKey: 'selectedDecoColor' },
    'Category': { title: '카테고리', stateKey: 'selectedCategory' }
};

const VenderProductPreview = () => {
    const location = useLocation();
    const { productId } = useParams();

    // 기본 상태 관리
    const [selectedTab, setSelectedTab] = useState(
        location.state?.openReview ? '후기' : '상품 상세정보'
    );
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(128);
    const [deliveryType, setDeliveryType] = useState('pickup');

    // 스크롤 관련 상태
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // refs
    const containerRef = useRef(null);
    const flavorContainerRef = useRef(null);
    const sizeContainerRef = useRef(null);
    const tabContentRef = useRef(null);

    // 데이터 상태
    const [productDetail, setProductDetail] = useState(null);
    const [productOptions, setProductOptions] = useState({});
    const [recipientInfo, setRecipientInfo] = useState({
        name: '',
        phone: ''
    });
    const [letters, setLetters] = useState({
        cakeLetter: '',
        plateLetter: '',
        additionalRequest: ''
    });
    const [selectedOptionNames, setSelectedOptionNames] = useState({});


    // 리뷰 관련 상태
    const [newReview, setNewReview] = useState({
        rating: 5,
        content: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
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
    // 별점 통계 데이터
    const ratingStats = {
        5: 12,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        average: 5
    };
    useEffect(() => {
        console.log("Product ID:", productId); // productId 값 확인
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vender/products/${productId}`);
                console.log("API 응답:", response.data);
                setProductDetail(response.data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);
    // useEffect
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (productDetail?.productImage1Url) {
            setMainImage(productDetail.productImage1Url);
        }
    }, [productDetail]);

    useEffect(() => {
        if (productOptions) {
            // 선택된 옵션의 실제 이름을 찾아 저장
            const optionNames = {};
            Object.keys(OPTION_TYPES).forEach(type => {
                const options = productOptions[type] || [];
                const selectedId = selectedOptions[OPTION_TYPES[type].stateKey];
                const selectedOption = options.find(opt => opt.optionValueId === selectedId);
                if (selectedOption) {
                    optionNames[type] = selectedOption.optionValueName;
                }
            });
            setSelectedOptionNames(optionNames);
        }
    }, [selectedOptions, productOptions]);
    // API 호출
    const getProductDetail = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
            responseType: 'json'
        }).then(response => {
            setProductDetail(response.data.apiData);
            console.log("상품 상세:", response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getProductOptions = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${productId}/options`,
            responseType: 'json'
        }).then(response => {
            const options = response.data.apiData;
            const groupedOptions = {};
            options.forEach(option => {
                if (!groupedOptions[option.optionTypeName]) {
                    groupedOptions[option.optionTypeName] = [];
                }
                groupedOptions[option.optionTypeName].push(option);
            });
            setProductOptions(groupedOptions);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (productId) {
            getProductDetail();
            getProductOptions();
        }
    }, [productId]);

    // 이벤트 핸들러
    const handleOptionSelect = (optionType, optionId) => {
        setSelectedOptions(prev => ({
            ...prev,
            [OPTION_TYPES[optionType].stateKey]: optionId
        }));
    };

    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    };

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

    // 옵션 렌더링 컴포넌트
    const renderOptionGroup = (optionType, options) => {
        if (!options || options.length === 0) return null;

        const { title, stateKey } = OPTION_TYPES[optionType];
        const isColorOption = optionType.includes('Color');
        const isScrollable = ['Flavor - Sheet', 'Flavor - Cream', 'Cake Size'].includes(optionType);

        const optionContent = (
            <div className={isColorOption ? "color-options" : "option-grid"}>
                {options.map((option) => (
                    <button
                        key={option.optionValueId}
                        className={`${isColorOption ? 'color-option' : 'option-item'} 
                             ${selectedOptions[stateKey] === option.optionValueId ? 'active' : ''}`}
                        onClick={() => handleOptionSelect(optionType, option.optionValueId)}
                        aria-label={`${option.optionValueName} 선택`}
                        title={option.optionValueName}
                    >
                        {!isColorOption && (
                            <>
                                {option.optionValueImageUrl && (
                                    <div className="option-image">
                                        <img src={option.optionValueImageUrl} alt={option.optionValueName} />
                                    </div>
                                )}
                                <span>{option.optionValueName}</span>
                            </>
                        )}
                    </button>
                ))}
            </div>
        );

        return (
            <div className="option-group" key={optionType}>
                <h3>{title}</h3>
                {isScrollable ? (
                    <div
                        ref={isColorOption ? null : containerRef}
                        className="option-scroll-container"
                        onMouseDown={(e) => handleMouseDown(e, containerRef)}
                        onMouseMove={(e) => handleMouseMove(e, containerRef)}
                        onMouseUp={() => handleMouseUp(containerRef)}
                        onMouseLeave={() => handleMouseLeave(containerRef)}
                    >
                        {optionContent}
                    </div>
                ) : optionContent}
            </div>
        );
    };// 탭 관련
    const tabs = ['상품상세', '후기'];

    const renderTabContent = () => (
        <div className="full-content">
            <div className="content-sections">
                <div id="상품상세" className="content-section">
                    {productDetail && productDetail.description ? (
                        <div
                            className="description"
                            dangerouslySetInnerHTML={{ __html: productDetail.description }}
                        />
                    ) : (
                        <p>상품 설명이 없습니다.</p>
                    )}
                </div>
                <div id="리뷰" className="content-section">
                    {renderReviewSection()}
                </div>
            </div>
        </div>
    );
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

    const handleReportReview = (reviewId) => {
        const confirmed = window.confirm('이 리뷰를 신고하시겠습니까?');
        if (confirmed) {
            console.log(`리뷰 ${reviewId} 신고됨`);
            alert('신고가 접수되었습니다.');
        }
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

    // 메인 렌더링
    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader />
            <main id="user-wrap-body" className="clearfix">
                <div className="cake-order-container">
                    {/* 왼쪽 섹션 */}
                    <div className="left-section">
                        <div className="product-image">
                            <img src={mainImage || productDetail?.productImage1Url} alt="케이크" className="main-image" />
                            <div className="thumbnail-container">
                                {productDetail && [
                                    productDetail.productImage1Url,
                                    productDetail.productImage2Url,
                                    productDetail.productImage3Url,
                                    productDetail.productImage4Url
                                ].filter(Boolean).map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-wrapper ${mainImage === image ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(image)}
                                    >
                                        <img src={image} alt={`썸네일${index + 1}`} className="thumbnail-image" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-tabs">
                            <div className="tabs-header sticky">
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
                                {/* 탭 컨텐츠 */}
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 섹션 */}
                    <div className="right-section">
                        <div className="product-info">
                            <h2>{productDetail?.productName}</h2>
                            <p className="price">{productDetail?.productPrice?.toLocaleString()} won</p>
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
                            {Object.keys(OPTION_TYPES).map(optionType =>
                                renderOptionGroup(optionType, productOptions[optionType])
                            )}

                            {/* 배송 관련 옵션들 */}
                            <div className="option-group">
                                <h3>배송 방식</h3>
                                <div className="delivery-type-buttons">
                                    <button
                                        className={`delivery-option-button ${deliveryType === 'pickup' ? 'active' : ''}`}
                                        onClick={() => setDeliveryType('pickup')}
                                    >
                                        픽업
                                    </button>
                                    <button
                                        className={`delivery-option-button ${deliveryType === 'quick' ? 'active' : ''}`}
                                        onClick={() => setDeliveryType('quick')}
                                    >
                                        퀵
                                    </button>
                                </div>
                            </div>
                            {/* 주소/지도 정보 */}
                            <div className="option-group">
                                <h3>{deliveryType === 'pickup' ? '픽업 장소' : '배송 주소'}</h3>
                                {deliveryType === 'pickup' ? (
                                    <div className="location-select">
                                        <div className="map-placeholder">
                                            지도 영역. api가 필요합니다
                                            {productDetail && (
                                                <div>
                                                    <p>{productDetail.venderAddress}</p>
                                                    {/* 카카오맵 API 연동 시 사용할 좌표 */}
                                                    {/* latitude: {productDetail.latitude} */}
                                                    {/* longitude: {productDetail.longitude} */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="address-input">
                                        <input
                                            type="text"
                                            placeholder="주소를 입력해주세요"
                                            className="address-input-field"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="option-group">
                                <h3>{deliveryType === 'pickup' ? '픽업 날짜' : '배송 날짜'}</h3>
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
                                <h3>{deliveryType === 'pickup' ? '픽업 시간' : '배송 시간'}</h3>
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

                            {/* 받는 사람 정보 */}
                            <div className="option-group">
                                <h3>받는 사람 정보</h3>
                                <div className="receiver-info">
                                    <div className="input-field">
                                        <label>받는 사람</label>
                                        <input
                                            type="text"
                                            placeholder="받는 사람 이름을 입력해주세요"
                                            className="receiver-input"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>연락처</label>
                                        <input
                                            type="tel"
                                            placeholder="'-' 없이 숫자만 입력해주세요"
                                            className="receiver-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 요청사항 */}
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

                        <Link
                            to="/user/paymentdetail"
                            state={{
                                productInfo: {
                                    productId: productDetail?.productId,
                                    productName: productDetail?.productName,
                                    productPrice: productDetail?.productPrice,
                                    productImage: productDetail?.productImage1Url,
                                    cakeDesignId: productDetail?.cakeDesignId
                                },
                                orderInfo: {
                                    deliveryType,
                                    selectedDate,
                                    selectedTime,
                                    recipientName: recipientInfo.name,
                                    recipientPhone: recipientInfo.phone,
                                    address: deliveryType === 'pickup' ? productDetail?.venderAddress : '배송주소',
                                    cakeLetter: letters.cakeLetter,
                                    plateLetter: letters.plateLetter,
                                    additionalRequest: letters.additionalRequest,
                                    selectedOptions: selectedOptionNames
                                }
                            }}
                            className="submit-button"
                        >
                            요청사항 확인
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VenderProductPreview;
