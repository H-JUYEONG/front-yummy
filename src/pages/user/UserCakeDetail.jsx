import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import VenderHeader from '../vender/include/VenderHeader';
import "../../assets/css/user/CakeOrder.css";
import '../../assets/css/user/usermain.css';
import 'react-quill/dist/quill.snow.css';

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

const UserCakeDetail = () => {
    const location = useLocation();
    const { productId } = useParams();

    // 기본 상태 관리
    const [selectedTab, setSelectedTab] = useState(
        location.state?.openReview ? '후기' : '상품 상세정보'
    );
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const [reviews, setReviews] = useState([]); // 하드코딩된 데이터 대신 빈 배열로 시작
    const [reviewStats, setReviewStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    });

    const [deliveryType, setDeliveryType] = useState('pickup');

    // 스크롤 관련 상태
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // refs
    const containerRef = useRef(null);
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
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const [newReview, setNewReview] = useState({
        rating: 1, // 초기값을 5에서 1로 변경
        content: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [canReview, setCanReview] = useState(false); // 리뷰 작성 가능 여부
    const [reviewSort, setReviewSort] = useState('recommend'); // 'recommend', 'latest', 'rating'
    const [showPhotoOnly, setShowPhotoOnly] = useState(false);
    const [hasWrittenReview, setHasWrittenReview] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(null);

    const detailSectionRef = useRef(null);
    const reviewSectionRef = useRef(null);

    // 시간 옵션 상수 추가
    const TIME_OPTIONS = [
        { value: '09:00:00', label: '09:00' },
        { value: '10:00:00', label: '10:00' },
        { value: '11:00:00', label: '11:00' },
        { value: '12:00:00', label: '12:00' },
        { value: '13:00:00', label: '13:00' },
        { value: '14:00:00', label: '14:00' },
        { value: '15:00:00', label: '15:00' },
        { value: '16:00:00', label: '16:00' },
        { value: '17:00:00', label: '17:00' },
        { value: '18:00:00', label: '18:00' }
    ];


    // useEffect
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 컴포넌트 마운트 시 찜 상태 조회
    useEffect(() => {
        if (productId) {
            fetchWishlistInfo();
        }
    }, [productId, authUser]);


    useEffect(() => {
        if (productDetail?.productImage1Url) {
            setMainImage(productDetail.productImage1Url);
        }
    }, [productDetail]);

    useEffect(() => {
        if (productOptions && Object.keys(productOptions).length > 0) {
            const optionNames = {};
            Object.keys(OPTION_TYPES).forEach(type => {
                const options = productOptions[type] || [];
                const selectedId = selectedOptions[OPTION_TYPES[type].stateKey];
                const selectedOption = options.find(opt => opt.optionValueId === selectedId);
                if (selectedOption) {
                    // 여기를 수정: 영어 키 대신 한글 키 사용
                    optionNames[OPTION_TYPES[type].title] = selectedOption.optionValueName;
                }
            });
            setSelectedOptionNames(optionNames);
        }
    }, [selectedOptions, productOptions]);
    // API 호출

    const getProductDetail = () => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
            responseType: 'json'
        }).then(response => {
            setProductDetail(response.data.apiData);
            console.log("상품 상세:", response.data.apiData);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    // 찜 정보 조회 함수 수정
    const fetchWishlistInfo = async () => {
        try {
            // 총 찜 개수 조회
            const countResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/wishlist/count/${productId}`
            );
            console.log('찜 개수 응답:', countResponse); // 응답 구조 확인용 로그

            // 응답 구조에 따라 적절한 방식으로 데이터 접근
            const count = countResponse.data.apiData || countResponse.data.data || 0;
            setLikeCount(count);

            // 로그인한 경우만 찜 상태 조회
            if (authUser) {
                const statusResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/wishlist/check`,
                    {
                        params: {
                            productId: parseInt(productId),
                            memberId: authUser.member_id
                        }
                    }
                );
                console.log('찜 상태 응답:', statusResponse); // 응답 구조 확인용 로그
                setIsLiked(statusResponse.data.apiData > 0 || statusResponse.data.data > 0);
            }
        } catch (error) {
            console.error('찜 정보 조회 실패:', error);
            setLikeCount(0); // 에러 발생 시 기본값 설정
        }
    };

    const getProductOptions = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/products/${productId}/options`,
            responseType: 'json'
        }).then(response => {
            console.log("API Response:", response.data); // 응답 구조 확인

            // 데이터가 있는지 확인
            if (!response.data || !response.data.apiData) {
                console.log("No data received from API");
                setProductOptions({});
                return;
            }

            const options = response.data.apiData;

            // options가 배열인지 확인
            if (!Array.isArray(options)) {
                console.log("API data is not an array");
                setProductOptions({});
                return;
            }

            const groupedOptions = {};
            options.forEach(option => {
                if (!groupedOptions[option.optionTypeName]) {
                    groupedOptions[option.optionTypeName] = [];
                }
                groupedOptions[option.optionTypeName].push(option);
            });

            setProductOptions(groupedOptions);
        }).catch(error => {
            console.error("API Error:", error);
            setProductOptions({});
        });
    };
    
    useEffect(() => {
        // location.state로 전달된 openReview 확인
        if (location.state?.openReview) {
            setSelectedTab('후기');
            // 약간의 지연을 주어 리뷰 섹션이 마운트된 후 스크롤
            setTimeout(() => {
                reviewSectionRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [location.state]);

    useEffect(() => {
        if (productId) {
            getProductDetail();
            getProductOptions();
        }
    }, [productId]);

    // 이벤트 핸들러
    const handleTimeSelect = (e) => {
        const selectedTimeValue = e.target.value;
        console.log('Selected Time:', selectedTimeValue); // 디버깅용
        setSelectedTime(selectedTimeValue);
    };
    const handleOptionSelect = (optionType, optionId) => {
        setSelectedOptions(prev => ({
            ...prev,
            [OPTION_TYPES[optionType].stateKey]: optionId
        }));
    };

    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };


    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(null);
    };

    const handleLike = async () => {
        if (!authUser) {
            alert('로그인이 필요한 서비스입니다.');
            return;
        }

        try {
            if (isLiked) {
                // 찜 취소
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}/api/wishlist/remove`,
                    {
                        data: {
                            productId: parseInt(productId),
                            memberId: authUser.member_id
                        }
                    }
                );
                setLikeCount(prev => prev - 1); // 카운트 즉시 감소
            } else {
                // 찜하기
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/wishlist/add`,
                    {
                        productId: parseInt(productId),
                        memberId: authUser.member_id
                    }
                );
                setLikeCount(prev => prev + 1); // 카운트 즉시 증가
            }
            setIsLiked(!isLiked); // 상태 토글
        } catch (error) {
            console.error('찜하기 처리 실패:', error);
            alert('처리 중 오류가 발생했습니다.');
            // 에러 발생 시 원래 상태로 복구
            await fetchWishlistInfo();
        }
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

    const handleRecipientChange = (e) => {
        const { name, value } = e.target;
        setRecipientInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLetterChange = (e) => {
        const { name, value } = e.target;
        setLetters(prev => ({
            ...prev,
            [name]: value
        }));
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
                <div
                    id="상품 상세정보"
                    className="content-section"
                    ref={detailSectionRef}
                >
                    {productDetail?.description ? (
                        <div
                            className="product-description ql-editor"
                            dangerouslySetInnerHTML={{ __html: productDetail.description }}
                        />
                    ) : (
                        <div className="no-description">
                            <p>상품 상세 정보가 없습니다.</p>
                        </div>
                    )}
                    <img src="/images/픽업 방법.png" alt="픽업 방법" />
                    <img src="/images/상품문의.png" alt="상품 문의" />
                </div>
                <div
                    id="후기"
                    className="content-section"
                    ref={reviewSectionRef}
                >
                    {renderReviewSection()}
                </div>
            </div>
        </div>
    );


    // 탭 클릭 핸들러 수정
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        if (tab === '후기') {
            reviewSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (tab === '상품상세') {
            detailSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

    useEffect(() => {
        if (productId) {
            fetchReviews();
            fetchReviewStats();
            checkReviewEligibility();
        }
    }, [productId, authUser, reviewSort, showPhotoOnly]);

    // 리뷰 필터 핸들러
    const handleSortChange = (sort) => {
        setReviewSort(sort);
    };

    const handlePhotoOnlyToggle = (e) => {
        setShowPhotoOnly(e.target.checked);
    };
    // 리뷰 데이터 조회
    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/product/${productId}`,
                {
                    params: {
                        sort: reviewSort,
                        photoOnly: showPhotoOnly
                    }
                }
            );

            console.log("리뷰 목록 전체 응답:", response);
            console.log("리뷰 목록 데이터:", response.data.apiData);

            if (response.data.result === "success" && response.data.apiData) {
                setReviews(response.data.apiData);
            }
        } catch (error) {
            console.error('리뷰 조회 실패:', error);
            setReviews([]);
        }
    };
    // 리뷰 통계 조회 함수
    const fetchReviewStats = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/stats/${productId}`
            );
            console.log("[리뷰 통계 응답]:", response.data);

            if (response.data.result === "success") {
                const stats = response.data.apiData;  // data 대신 apiData에서 추출
                setReviewStats({
                    averageRating: stats.averageRating,
                    totalReviews: stats.totalReviews,
                    ratingCounts: {
                        5: stats.ratingCounts5,
                        4: stats.ratingCounts4,
                        3: stats.ratingCounts3,
                        2: stats.ratingCounts2,
                        1: stats.ratingCounts1
                    }
                });
            }
        } catch (error) {
            console.error('[리뷰 통계 조회 실패]:', error);
            // 에러 시 초기값 설정
            setReviewStats({
                averageRating: 0,
                totalReviews: 0,
                ratingCounts: {
                    5: 0,
                    4: 0,
                    3: 0,
                    2: 0,
                    1: 0
                }
            });
        }
    };
    // 리뷰 작성 가능 여부 확인
   
     const checkReviewEligibility = async () => {
        if (!authUser) {
            setCanReview(false);
            setHasWrittenReview(false);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/reviews/check-eligibility`,
                {
                    params: {
                        productId: productId,
                        userId: authUser.member_id
                    }
                }
            );

            if (response.data.result === "success" && response.data.apiData) {
                const { hasPurchased, hasReceived, hasReviewed, canReview } = response.data.apiData;
                console.log("리뷰 자격 확인 결과:", {
                    hasPurchased,
                    hasReceived,
                    hasReviewed,
                    canReview
                });
                setCanReview(canReview);
                setHasWrittenReview(hasReviewed);
            }
        } catch (error) {
            console.error('리뷰 자격 확인 실패:', error);
            setCanReview(false);
            setHasWrittenReview(false);
        }
    };

    // 리뷰 제출 핸들러 수정
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!authUser || !canReview) {
            alert('리뷰를 작성할 수 없습니다.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('reviewUserId', authUser.member_id);
            formData.append('productId', productId);
            formData.append('reviewRating', newReview.rating);
            formData.append('reviewContent', newReview.content);

            if (newReview.image) {
                formData.append('image', newReview.image);
            }

            console.log('리뷰 제출 데이터:', {
                reviewUserId: authUser.member_id,
                productId: productId,
                reviewRating: newReview.rating,
                reviewContent: newReview.content,
                hasImage: !!newReview.image
            });

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reviews`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('리뷰 제출 응답:', response.data);

            if (response.data.result === 'success') {
                alert('리뷰가 등록되었습니다.');

                // 폼 초기화
                setNewReview({ rating: 5, content: '', image: null });
                setImagePreview(null);
                setHasWrittenReview(true);
                setCanReview(false);

                // 리뷰 목록과 통계 새로고침
                await fetchReviews();
                await fetchReviewStats();
                console.log("받은 리뷰 데이터:", reviews);

            } else {
                alert(response.data.message || '리뷰 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            alert('리뷰 등록 중 오류가 발생했습니다.');
        }
    };
    const handleReportReview = (reviewId) => {
        const confirmed = window.confirm('이 리뷰를 신고하시겠습니까?');
        if (confirmed) {
            console.log(`리뷰 ${reviewId} 신고됨`);
            alert('신고가 접수되었습니다.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const confirmed = window.confirm('정말로 이 리뷰를 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}`);
                alert('리뷰가 삭제되었습니다.');
                setHasWrittenReview(false);
                setCanReview(true);
                await fetchReviews();
                await fetchReviewStats();
            } catch (error) {
                console.error('리뷰 삭제 실패:', error);
                alert('리뷰 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    // 리뷰 섹션 렌더링
    const renderReviewSection = () => (
        <div className="reviews-container">
            {/* 로그인하지 않은 경우 */}
            {!authUser && (
                <div className="review-login-message">
                    <p>리뷰를 작성하려면 로그인이 필요합니다.</p>
                </div>
            )}

            {/* 로그인했지만 구매하지 않은 경우 */}
            {authUser && !canReview && !hasWrittenReview && (
                <div className="review-purchase-message">
                    <p>이 상품을 구매한 고객만 리뷰를 작성할 수 있습니다.</p>
                </div>
            )}

            {/* 리뷰를 작성할 수 있는 경우 */}
            {canReview && (
                <div className="review-form-container">
                    <h3>리뷰 작성</h3>
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <div className="rating-select">
                            <p>별점을 선택해주세요</p>
                            <div className="stars-input">
                                {[1, 2, 3, 4, 5].map((star) => (  // 1부터 5까지로 변경
                                    <button
                                        key={star}
                                        type="button"
                                        className={`star-button ${newReview.rating >= star ? 'filled' : ''}`}
                                        onClick={() => handleRatingChange(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
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
            )}

            {/* 리뷰 통계 */}
            {reviewStats && (
                // 리뷰 통계 표시 부분 수정
                <div className="rating-stats">
                    <div className="rating-average">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= Math.round(reviewStats.averageRating) ? 'filled' : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className="average-score">
                            <span className="current-score">
                                {reviewStats.averageRating.toFixed(1)}
                            </span>
                            <span className="total-score">/5</span>
                        </div>
                        <div className="total-reviews">
                            총 {reviewStats.totalReviews}개의 리뷰
                        </div>
                    </div>
                    <div className="rating-bars">
                        {[5, 4, 3, 2, 1].map((score) => (
                            <div key={score} className="rating-bar-row">
                                <span className="score">{score}점</span>
                                <div className="bar-container">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${reviewStats.totalReviews ? (reviewStats.ratingCounts[score] / reviewStats.totalReviews) * 100 : 0}%`,
                                            background: score === 5 ? '#FF3B85' : '#e0e0e0'
                                        }}
                                    />
                                </div>
                                <span className="count">{reviewStats.ratingCounts[score]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 리뷰 목록 */}
            <div className="review-list">
                <div className="review-filters">
                    <button
                        className={`filter-button ${reviewSort === 'recommend' ? 'active' : ''}`}
                        onClick={() => handleSortChange('recommend')}
                    >
                        추천순
                    </button>
                    <button
                        className={`filter-button ${reviewSort === 'latest' ? 'active' : ''}`}
                        onClick={() => handleSortChange('latest')}
                    >
                        최신순
                    </button>
                    <button
                        className={`filter-button ${reviewSort === 'rating' ? 'active' : ''}`}
                        onClick={() => handleSortChange('rating')}
                    >
                        평점순
                    </button>
                    <label className="photo-only">
                        <input
                            type="checkbox"
                            checked={showPhotoOnly}
                            onChange={handlePhotoOnlyToggle}
                        />
                        포토 리뷰만
                    </label>
                </div>

                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.reviewId} className="review-item">
                            <div className="review-header">
                                <div className="review-header-info">
                                    <div className="stars">
                                        {[...Array(parseInt(review.reviewRating))].map((_, index) => (
                                            <span key={index} className="star-filled">★</span>
                                        ))}
                                    </div>
                                    <span className="author">{review.author}</span>
                                    <span className="date">
                                        {new Date(review.reviewCreatedAt).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="review-header-actions">
                                    <button
                                        className="report-button"
                                        onClick={() => handleReportReview(review.reviewId)}
                                    >
                                        <span className="report-icon">⚠️</span>
                                        신고
                                    </button>
                                    {authUser && review.reviewUserId === authUser.member_id && (
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteReview(review.reviewId)}
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="review-content">
                                {review.reviewContent && (
                                    <p>{review.reviewContent}</p>
                                )}
                                {review.reviewImageUrl && (
                                    <div className="review-image">
                                        <img
                                            src={review.reviewImageUrl}
                                            alt="리뷰 이미지"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/images/no-image.png"; // 기본 이미지 경로
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-reviews">
                        <p>아직 작성된 리뷰가 없습니다.</p>
                    </div>
                )}
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

                            <div className="option-group">
                                <h3>{deliveryType === 'pickup' ? '픽업 장소' : '배송 주소'}</h3>
                                {deliveryType === 'pickup' ? (
                                    <div className="location-select">
                                        <div className="map-placeholder">
                                            <p>{productDetail?.venderAddress}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="address-input">
                                        <input
                                            type="text"
                                            placeholder="주소를 입력해주세요"
                                            className="address-input-field"
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
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
                                        onChange={handleTimeSelect}
                                        className="time-input"
                                    >
                                        <option value="">시간 선택</option>
                                        {TIME_OPTIONS.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>받는 사람 정보</h3>
                                <div className="receiver-info">
                                    <div className="input-field">
                                        <label>받는 사람</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={recipientInfo.name}
                                            onChange={handleRecipientChange}
                                            placeholder="받는 사람 이름을 입력해주세요"
                                            className="receiver-input"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>연락처</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={recipientInfo.phone}
                                            onChange={handleRecipientChange}
                                            placeholder="'-' 없이 숫자만 입력해주세요"
                                            className="receiver-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="option-group">
                                <h3>케이크 위 레터링 요청</h3>
                                <div className="request-input">
                                    <textarea
                                        name="cakeLetter"
                                        value={letters.cakeLetter}
                                        onChange={handleLetterChange}
                                        placeholder="예) 생크림을 좀만 넣어주세요."
                                        rows="4"
                                        className="request-textarea"
                                    />
                                </div>

                                <h3>케이크 판 레터링 요청</h3>
                                <div className="request-input">
                                    <textarea
                                        name="plateLetter"
                                        value={letters.plateLetter}
                                        onChange={handleLetterChange}
                                        placeholder="예) 생크림을 좀만 넣어주세요."
                                        rows="4"
                                        className="request-textarea"
                                    />
                                </div>

                                <h3>기타 요청사항</h3>
                                <div className="request-input">
                                    <textarea
                                        name="additionalRequest"
                                        value={letters.additionalRequest}
                                        onChange={handleLetterChange}
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
                                    venderId: productDetail?.venderId,
                                    productName: productDetail?.productName,
                                    productPrice: productDetail?.productPrice,
                                    productImage: productDetail?.productImage1Url,
                                    cakeDesignId: productDetail?.cakeDesignId
                                },
                                orderInfo: {
                                    deliveryType,
                                    selectedDate: selectedDate, //  YYYY-MM-DD 형식
                                    selectedTime: selectedTime, // HH:mm:ss 형식으로 전달
                                    recipientName: recipientInfo.name,
                                    recipientPhone: recipientInfo.phone,
                                    address: deliveryType === 'pickup' ? productDetail?.venderAddress : deliveryAddress,
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
export default UserCakeDetail;