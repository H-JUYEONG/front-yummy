import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import VenderHeader from "../vender/include/VenderHeader";
import ReviewAnalysis from "../user/include/ReviewAnalysis";
import YummyVenderHeader from "./include/YummyVenderHeader";
import "../../assets/css/user/CakeOrder.css";
import "../../assets/css/user/usermain.css";
import "react-quill/dist/quill.snow.css";

// 옵션 타입 정의
const OPTION_TYPES = {
  cake_size: { title: "사이즈", stateKey: "selectedSize" },
  flavor_sheet: { title: "시트 맛", stateKey: "selectedSheetFlavor" },
  flavor_cream: { title: "크림 맛", stateKey: "selectedCreamFlavor" },
  cake_background_color: {
    title: "케이크 배경색",
    stateKey: "selectedBgColor",
  },
  cream_position: { title: "크림 위치", stateKey: "selectedCreamPosition" },
  cream_color: { title: "크림 색상", stateKey: "selectedCreamColor" },
  decoration_type: { title: "데코레이션 종류", stateKey: "selectedDecoration" },
  decoration_color: { title: "데코레이션 색상", stateKey: "selectedDecoColor" },
};

const UserCakeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const optionRefs = useRef({});
  //소영 지도부분
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const KAKAOMAP = process.env.REACT_APP_MAP_REST_API_KEY;

  // 기본 상태 관리
  const [selectedTab, setSelectedTab] = useState(
    location.state?.openReview ? "후기" : "상품 상세정보"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
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
      5: 0,
    },
  });

  const [newReply, setNewReply] = useState({}); // 리뷰 ID를 키로 사용

  // 상태 추가 (컴포넌트 최상단의 다른 상태들과 함께 정의)
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(8);

  // 페이지네이션 관련 함수들
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const reviewListRef = useRef(null);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 리뷰 리스트의 시작점으로 부드럽게 스크롤
    reviewListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { venderId } = useParams();

  const [deliveryType, setDeliveryType] = useState("픽업");

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
    name: "",
    phone: "",
  });
  const [letters, setLetters] = useState({
    cakeLetter: "",
    plateLetter: "",
    additionalRequest: "",
  });
  const [selectedOptionNames, setSelectedOptionNames] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [newReview, setNewReview] = useState({
    rating: 1, // 초기값을 5에서 1로 변경
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [canReview, setCanReview] = useState(false); // 리뷰 작성 가능 여부
  const [reviewSort, setReviewSort] = useState("recommend"); // 'recommend', 'latest', 'rating'
  const [showPhotoOnly, setShowPhotoOnly] = useState(false);
  const [hasWrittenReview, setHasWrittenReview] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(null);

  const detailSectionRef = useRef(null);
  const reviewSectionRef = useRef(null);

  // 시간 옵션 상수 추가
  const TIME_OPTIONS = [
    { value: "09:00:00", label: "09:00" },
    { value: "10:00:00", label: "10:00" },
    { value: "11:00:00", label: "11:00" },
    { value: "12:00:00", label: "12:00" },
    { value: "13:00:00", label: "13:00" },
    { value: "14:00:00", label: "14:00" },
    { value: "15:00:00", label: "15:00" },
    { value: "16:00:00", label: "16:00" },
    { value: "17:00:00", label: "17:00" },
    { value: "18:00:00", label: "18:00" },
  ];

  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //소영 지도부분
  useEffect(() => {
    console.log(
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false`
    );

    if ((longitude, latitude)) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false`; // 여기에 발급받은 카카오 API 키 입력
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map"); // 지도 표시할 DOM 요소
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude), // DB에서 가져온 위도, 경도를 지도 중심으로 설정
            level: 3, // 줌 레벨 (3: 보통, 1: 가까운 거리, 14: 더 멀리)
          };

          const map = new window.kakao.maps.Map(container, options); // 지도 객체 생성

          // 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map); // 지도에 마커 표시
        });
      };
      document.body.appendChild(script); // script 태그로 카카오맵 API 로드
    }
    return () => {
      const scriptTag = document.querySelector(
        `script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false"]`
      );
      if (scriptTag) {
        document.body.removeChild(scriptTag); // 컴포넌트가 언마운트 될 때 script 태그를 제거
      }
    };
  }, [longitude, latitude]);

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
      Object.keys(OPTION_TYPES).forEach((type) => {
        const options = productOptions[type] || [];
        const selectedId = selectedOptions[OPTION_TYPES[type].stateKey];
        const selectedOption = options.find(
          (opt) => opt.optionValueId === selectedId
        );
        if (selectedOption) {
          // 여기를 수정: 영어 키 대신 한글 키 사용
          optionNames[OPTION_TYPES[type].title] =
            selectedOption.optionValueName;
        }
      });
      setSelectedOptionNames(optionNames);
    }
  }, [selectedOptions, productOptions]);

  // API 호출

  const getProductDetail = () => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
      responseType: "json",
    })
      .then((response) => {
        setProductDetail(response.data.apiData);
        console.log("상품 상세:", response.data.apiData);

        setLatitude(response.data.apiData.latitude);
        setLongitude(response.data.apiData.longitude);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
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
      console.log("찜 개수 응답:", countResponse); // 응답 구조 확인용 로그

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
              memberId: authUser.member_id,
            },
          }
        );
        console.log("찜 상태 응답:", statusResponse); // 응답 구조 확인용 로그
        setIsLiked(
          statusResponse.data.apiData > 0 || statusResponse.data.data > 0
        );
      }
    } catch (error) {
      console.error("찜 정보 조회 실패:", error);
      setLikeCount(0); // 에러 발생 시 기본값 설정
    }
  };

  const getProductOptions = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/products/${productId}/options`,
      responseType: "json",
    })
      .then((response) => {
        console.log("API Response:", response.data); // 전체 응답 확인

        if (!response.data || !response.data.apiData) {
          console.log("No data received from API");
          setProductOptions({});
          return;
        }

        const options = response.data.apiData;
        console.log("옵션 데이터:", options); // 받은 옵션 데이터 확인

        const groupedOptions = {};
        options.forEach((option) => {
          if (!groupedOptions[option.optionTypeName]) {
            groupedOptions[option.optionTypeName] = [];
          }
          groupedOptions[option.optionTypeName].push(option);
        });

        console.log("그룹화된 옵션 데이터:", groupedOptions); // 그룹화 후 데이터 확인
        setProductOptions(groupedOptions);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setProductOptions({});
      });
  };

  useEffect(() => {
    // location.state로 전달된 openReview 확인
    if (location.state?.openReview) {
      setSelectedTab("후기");
      // 약간의 지연을 주어 리뷰 섹션이 마운트된 후 스크롤
      setTimeout(() => {
        reviewSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
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
    console.log("Selected Time:", selectedTimeValue); // 디버깅용
    setSelectedTime(selectedTimeValue);
  };
  const handleOptionSelect = (optionType, optionId) => {
    console.log(`Selected option: Type=${optionType}, ID=${optionId}`); // 디버깅 로그
    setSelectedOptions((prev) => ({
      ...prev,
      [OPTION_TYPES[optionType].stateKey]: optionId,
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
      alert("로그인이 필요한 서비스입니다.");
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
              memberId: authUser.member_id,
            },
          }
        );
        setLikeCount((prev) => prev - 1); // 카운트 즉시 감소
      } else {
        // 찜하기
        await axios.post(`${process.env.REACT_APP_API_URL}/api/wishlist/add`, {
          productId: parseInt(productId),
          memberId: authUser.member_id,
        });
        setLikeCount((prev) => prev + 1); // 카운트 즉시 증가
      }
      setIsLiked(!isLiked); // 상태 토글
    } catch (error) {
      console.error("찜하기 처리 실패:", error);
      alert("처리 중 오류가 발생했습니다.");
      // 에러 발생 시 원래 상태로 복구
      await fetchWishlistInfo();
    }
  };
  const handleDeleteReview = async (reviewId) => {
    if (!authUser) return;

    const confirmed = window.confirm(
      "리뷰를 삭제하시겠습니까?\n관련된 모든 답글도 함께 삭제됩니다."
    );
    if (!confirmed) return;

    try {
      // 요청 정보 로깅
      console.log("삭제 요청 정보:", {
        reviewId,
        userId: authUser.user_id,
        url: `${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}/${authUser.user_id}`,
      });

      // DELETE 요청
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}/${authUser.user_id}`
      );

      // 응답 로깅
      console.log("삭제 응답:", response);

      if (response.data.result === "success") {
        alert("리뷰가 삭제되었습니다.");
        await Promise.all([fetchReviews(), fetchReviewStats()]);
        setHasWrittenReview(false);
        setCanReview(true);
      } else {
        console.error("삭제 실패 응답:", response.data);
        alert(response.data.message || "리뷰 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 요청 실패:", error);
      console.error("에러 상세:", error.response?.data);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleMouseLeave = (ref) => {
    setIsDragging(false);
    ref.current.classList.remove("dragging");
  };

  const handleRecipientChange = (e) => {
    const { name, value } = e.target;
    setRecipientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLetterChange = (e) => {
    const { name, value } = e.target;
    setLetters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReplyChange = (reviewId, content) => {
    setNewReply((prev) => ({
      ...prev,
      [reviewId]: content,
    }));
  };

  const handleAddReply = async (reviewId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews/reply`,
        {
          reviewId: reviewId,
          replyVenderId: authUser.vender_id,
          replyContent: newReply[reviewId],
        }
      );

      if (response.data.result === "success") {
        setNewReply((prev) => ({
          ...prev,
          [reviewId]: "",
        }));

        // reviews 배열 안에서 해당 리뷰를 찾아 replies 업데이트
        const updatedReviews = reviews.map((review) => {
          if (review.reviewId === reviewId) {
            return {
              ...review,
              // 기존 replies 배열이 없으면 새 배열 생성
              replies: [
                ...(review.replies || []),
                {
                  replyId: response.data.data, // 새로 생성된 replyId
                  reviewId: reviewId,
                  replyVenderId: authUser.vender_id,
                  replyContent: newReply[reviewId],
                  replyCreatedAt: new Date(),
                  venderName: authUser.vender_name,
                },
              ],
            };
          }
          return review;
        });

        setReviews(updatedReviews); // 화면 즉시 업데이트

        fetchReviews(); //혹시 몰라서 한번 더 새로고침 해볼게요
      } else {
        alert("답글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("답글 작성 실패:", error);
      alert("답글 작성 중 오류가 발생했습니다.");
    }
  };
  const handleDeleteReply = async (replyId) => {
    if (!authUser?.vender_id) {
      alert("업체 로그인이 필요합니다.");
      return;
    }

    const confirmed = window.confirm("답글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/reviews/reply/${replyId}/${authUser.vender_id}`
      );

      if (response.data.result === "success") {
        // 화면에서 즉시 삭제 반영
        const updatedReviews = reviews.map((review) => ({
          ...review,
          replies: (review.replies || []).filter(
            (reply) => reply.replyId !== replyId
          ),
        }));
        setReviews(updatedReviews);
      } else {
        alert("답글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("답글 삭제 실패:", error);
      alert("답글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 옵션 렌더링 컴포넌트
  const renderOptionGroup = (optionType, options) => {
    if (!options || options.length === 0) return null;

    const { title, stateKey } = OPTION_TYPES[optionType];
    // 옵션 그룹별 ref를 생성 및 연결
    if (!optionRefs.current[optionType]) {
      optionRefs.current[optionType] = React.createRef();
    }

    const handleMouseDown = (e) => {
      const container = optionRefs.current[optionType].current;
      if (!container) return;
      container.isDragging = true;
      container.startX = e.pageX - container.offsetLeft;
      container.scrollLeft = container.scrollLeft;
    };

    const handleMouseMove = (e) => {
      const container = optionRefs.current[optionType].current;
      if (!container || !container.isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - container.startX) * 2;
      container.scrollLeft = container.scrollLeft - walk;
    };
    const handleMouseUpOrLeave = () => {
      const container = optionRefs.current[optionType].current;
      if (container) container.isDragging = false;
    };
    return (
      <div className="option-group" key={optionType}>
        <h3>{title}</h3>
        <div
          ref={optionRefs.current[optionType]}
          className="option-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <div className="option-grid">
            {options.map((option) => (
              <button
                key={option.optionValueId}
                className={`option-item ${
                  selectedOptions[stateKey] === option.optionValueId
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleOptionSelect(optionType, option.optionValueId)
                }
                aria-label={`${option.optionValueName} 선택`}
                title={option.optionValueName}
              >
                {option.optionValueImageUrl ? (
                  <div className="option-image">
                    <img
                      src={option.optionValueImageUrl}
                      alt={option.optionValueName}
                      title={option.optionValueName}
                    />
                  </div>
                ) : null}
                <span className="option-name">{option.optionValueName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  // 탭 관련
  const tabs = ["상품상세", "후기"];

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
        </div>
        <div id="후기" className="content-section" ref={reviewSectionRef}>
          {renderReviewSection()}
        </div>
      </div>
    </div>
  );

  // 탭 클릭 핸들러 수정
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (tab === "후기") {
      reviewSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (tab === "상품상세") {
      detailSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 리뷰 관련 핸들러
  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleReviewContent = (e) => {
    setNewReview((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReview((prev) => ({ ...prev, image: file }));
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
            photoOnly: showPhotoOnly,
          },
        }
      );

      console.log("리뷰 목록 전체 응답:", response);
      console.log("리뷰 목록 데이터:", response.data.apiData);

      if (response.data.result === "success" && response.data.apiData) {
        setReviews(response.data.apiData);
      }
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
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
        const stats = response.data.apiData; // data 대신 apiData에서 추출
        setReviewStats({
          averageRating: stats.averageRating,
          totalReviews: stats.totalReviews,
          ratingCounts: {
            5: stats.ratingCounts5,
            4: stats.ratingCounts4,
            3: stats.ratingCounts3,
            2: stats.ratingCounts2,
            1: stats.ratingCounts1,
          },
        });
      }
    } catch (error) {
      console.error("[리뷰 통계 조회 실패]:", error);
      // 에러 시 초기값 설정
      setReviewStats({
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
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
            userId: authUser.user_id,
          },
        }
      );

      if (response.data.result === "success" && response.data.apiData) {
        const { hasPurchased, hasReceived, hasReviewed, canReview } =
          response.data.apiData;
        console.log("리뷰 자격 확인 결과:", {
          hasPurchased,
          hasReceived,
          hasReviewed,
          canReview,
        });
        setCanReview(canReview);
        setHasWrittenReview(hasReviewed);
      }
    } catch (error) {
      console.error("리뷰 자격 확인 실패:", error);
      setCanReview(false);
      setHasWrittenReview(false);
    }
  };

  // 리뷰 제출 핸들러 수정
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!authUser || !canReview) {
      alert("리뷰를 작성할 수 없습니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("reviewUserId", authUser.user_id);
      formData.append("productId", productId);
      formData.append("reviewRating", newReview.rating);
      formData.append("reviewContent", newReview.content);

      if (newReview.image) {
        formData.append("image", newReview.image);
      }

      console.log("리뷰 제출 데이터:", {
        reviewUserId: authUser.user_id,
        productId: productId,
        reviewRating: newReview.rating,
        reviewContent: newReview.content,
        hasImage: !!newReview.image,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("리뷰 제출 응답:", response.data);

      if (response.data.result === "success") {
        alert("리뷰가 등록되었습니다.");

        // 폼 초기화
        setNewReview({ rating: 5, content: "", image: null });
        setImagePreview(null);
        setHasWrittenReview(true);
        setCanReview(false);

        // 리뷰 목록과 통계 새로고침
        await fetchReviews();
        await fetchReviewStats();
        console.log("받은 리뷰 데이터:", reviews);
      } else {
        alert(response.data.message || "리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  const handleReportReview = async (reviewId) => {
    const reason = prompt("신고 사유를 입력해주세요.");
    if (!reason) {
      alert("신고 사유를 입력해야 합니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/${reviewId}/report`,
        null,
        { params: { userId: authUser.user_id, reason } }
      );
      alert(response.data);
    } catch (error) {
      console.error("신고 실패:", error);
      alert("신고 중 오류가 발생했습니다.");
    }
  };

  // 리뷰 섹션 렌더링
  const renderReviewSection = () => (
    <div className="reviews-container">
      {!authUser && (
        <div className="review-login-message">
          <p>리뷰를 작성하려면 로그인이 필요합니다.</p>
        </div>
      )}

      {authUser && !canReview && !hasWrittenReview && (
        <div className="review-purchase-message">
          <p>* 이 상품을 구매한 고객만 리뷰를 작성할 수 있습니다.</p>
        </div>
      )}

      {canReview && (
        <div className="review-form-container">
          <h3>리뷰 작성</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="rating-select">
              <p>별점을 선택해주세요</p>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-button ${
                      newReview.rating >= star ? "filled" : ""
                    }`}
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
                  style={{ display: "none" }}
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
                      setNewReview((prev) => ({ ...prev, image: null }));
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

      {reviewStats && (
        <div className="rating-stats">
          <div className="rating-stats-upper">
            <div className="rating-average">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= Math.round(reviewStats.averageRating)
                        ? "filled"
                        : ""
                    }`}
                    style={{
                      color:
                        star <= reviewStats.averageRating
                          ? "#FFD700"
                          : "#E0E0E0",
                    }}
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
                        width: `${
                          reviewStats.totalReviews
                            ? (reviewStats.ratingCounts[score] /
                                reviewStats.totalReviews) *
                              100
                            : 0
                        }%`,
                        backgroundColor: `hsl(${(score / 5) * 120}, 100%, 50%)`,
                      }}
                    />
                  </div>
                  <span className="count">
                    {reviewStats.ratingCounts[score]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* 리뷰 분석 테스트할때만 주석 풀고 확인바람~~~~ */}
          {/* <ReviewAnalysis productId={productId} /> */}
        </div>
      )}

      <div className="review-list" ref={reviewListRef}>
        <div className="review-filters">
          <button
            className={`filter-button ${
              reviewSort === "recommend" ? "active" : ""
            }`}
            onClick={() => handleSortChange("recommend")}
          >
            추천순
          </button>
          <button
            className={`filter-button ${
              reviewSort === "latest" ? "active" : ""
            }`}
            onClick={() => handleSortChange("latest")}
          >
            최신순
          </button>
          <button
            className={`filter-button ${
              reviewSort === "rating" ? "active" : ""
            }`}
            onClick={() => handleSortChange("rating")}
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
          <>
            {currentReviews.map((review) => (
              <div key={review.reviewId} className="review-item">
                <div className="review-header">
                  <div className="review-header-info">
                    <div className="stars">
                      {[...Array(review.reviewRating)].map((_, index) => (
                        <span key={index} className="star-filled">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="author">
                      {review.authorType === "user" ? (
                        <span className="user-nickname">
                          {review.authorNickname}
                        </span>
                      ) : (
                        <span className="vender-name">
                          {review.authorNickname}
                        </span>
                      )}
                    </span>
                    <span className="date">
                      {new Date(review.reviewCreatedAt)
                        .toLocaleString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Seoul",
                        })
                        .replace(/\. /g, "-") // "2024. 12. 05" -> "2024-12-05"
                        .replace(/\./g, "") // 남은 점 제거
                        .replace(/, /g, "-") // 쉼표를 하이픈으로 변경
                        .replace(/(\d{4}-\d{2}-\d{2})-/, "$1 ")}
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
                  {review.reviewContent && <p>{review.reviewContent}</p>}
                  {review.reviewImageUrl && (
                    <div className="review-image">
                      <img
                        src={review.reviewImageUrl}
                        alt="리뷰 이미지"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/no-image.png";
                        }}
                      />
                    </div>
                  )}
                </div>
                {authUser && productDetail && (
                  <div className="review-replies">
                    {review.replies?.map((reply) => (
                      <div key={reply.replyId} className="review-reply">
                        <div className="reply-header">
                          <span className="vendor-badge">판매자</span>
                          <span className="vendor-name">
                            {reply.venderName || "판매자 이름 없음"}
                          </span>
                          <span className="reply-date">
                            {reply.replyCreatedAt
                              ? new Date(
                                  reply.replyCreatedAt
                                ).toLocaleDateString("ko-KR")
                              : "날짜 정보 없음"}
                          </span>
                          {authUser?.vender_id &&
                            authUser.vender_id === reply?.replyVenderId && (
                              <button
                                className="delete-reply-button"
                                onClick={() => handleDeleteReply(reply.replyId)}
                              >
                                삭제
                              </button>
                            )}
                        </div>
                        <p className="reply-content">
                          {reply.replyContent || "내용 없음"}
                        </p>
                      </div>
                    ))}

                    {authUser?.vender_id === productDetail?.venderId &&
                      !review.replies?.some(
                        (reply) => reply?.replyVenderId === authUser.vender_id
                      ) && (
                        <div className="reply-form">
                          <textarea
                            value={newReply[review.reviewId] || ""}
                            onChange={(e) =>
                              handleReplyChange(review.reviewId, e.target.value)
                            }
                            placeholder="답글을 작성해주세요"
                            rows="2"
                          />
                          <button
                            onClick={() => handleAddReply(review.reviewId)}
                            disabled={!newReply[review.reviewId]?.trim()}
                          >
                            답글 작성
                          </button>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}

            {/* 페이지네이션 추가 */}
            <div className="review-list-pagination-wrapper">
              {totalPages > 1 && (
                <>
                  {currentPage > 1 && (
                    <button
                      className="review-list-pagination-nav-button review-list-pagination-prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </button>
                  )}
                  {[...Array(Math.min(10, totalPages))].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`review-list-pagination-page-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      className="review-list-pagination-nav-button review-list-pagination-next"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </button>
                  )}
                </>
              )}
            </div>
          </>
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
      <YummyVenderHeader venderId={venderId}/>
      <VenderHeader venderId={venderId} />
      <main id="user-wrap-body" className="clearfix">
        <div className="cake-order-container">
          {/* 왼쪽 섹션 */}
          <div className="left-section">
            <div className="product-image">
              <img
                src={mainImage || productDetail?.productImage1Url}
                alt="케이크"
                className="main-image"
              />
              <div className="thumbnail-container">
                {productDetail &&
                  [
                    productDetail.productImage1Url,
                    productDetail.productImage2Url,
                    productDetail.productImage3Url,
                    productDetail.productImage4Url,
                  ]
                    .filter(Boolean)
                    .map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail-wrapper ${
                          mainImage === image ? "active" : ""
                        }`}
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
              <div className="tabs-header sticky">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${
                      selectedTab === tab ? "active" : ""
                    }`}
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
              <div className="product-name-price">
                <h2>{productDetail?.productName}</h2>
                <p className="price">
                  {productDetail?.productPrice?.toLocaleString()} won
                </p>
              </div>

              <div className="like-button-container">
                <button
                  className={`like-button ${isLiked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  <span className="heart-icon">{isLiked ? "♥" : "♡"}</span>
                  <span className="like-count">{likeCount}</span>
                </button>
              </div>
            </div>
            <div className="options">
              {Object.keys(OPTION_TYPES).map((optionType) =>
                renderOptionGroup(optionType, productOptions[optionType])
              )}
              <div className="option-group">
                <h3>배송 방식</h3>
                <div className="delivery-type-buttons">
                  <button
                    className={`delivery-option-button ${
                      deliveryType === "픽업" ? "active" : ""
                    }`}
                    onClick={() => setDeliveryType("픽업")}
                  >
                    픽업
                  </button>
                  <button
                    className={`delivery-option-button ${
                      deliveryType === "배송" ? "active" : ""
                    }`}
                    onClick={() => setDeliveryType("배송")}
                  >
                    배송
                  </button>
                </div>
              </div>

              <div className="option-group">
                <h3>{deliveryType === "픽업" ? "픽업 장소" : "배송 주소"}</h3>
                {deliveryType === "픽업" ? (
                  <div className="location-select">
                    <div className="map-placeholder" id="map">
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
                <h3>{deliveryType === "픽업" ? "픽업 날짜" : "배송 날짜"}</h3>
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
                <h3>{deliveryType === "픽업" ? "픽업 시간" : "배송 시간"}</h3>
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
                {/* 벤더 ID가 73이 아닐 때만 렌더링 */}
                {productDetail?.venderId !== 73 && (
                  <>
                    <h3>케이크 위 레터링 요청</h3>
                    <div className="request-input">
                      <textarea
                        name="cakeLetter"
                        value={letters.cakeLetter}
                        onChange={handleLetterChange}
                        placeholder="예: Happy Birthday"
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
                        placeholder="예: 하나뿐인 소중한 당신에게!"
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
                        placeholder="예: 조금 덜 단 맛으로 조절해주세요."
                        rows="4"
                        className="request-textarea"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            {productDetail && ( // productDetail이 존재할 때만 렌더링
              <Link
                to={`/user/paymentdetail/${productDetail?.venderId || ""}`}
                state={{
                  productInfo: {
                    productId: productDetail?.productId,
                    venderId: productDetail?.venderId,
                    productName: productDetail?.productName,
                    productPrice: productDetail?.productPrice,
                    productImage: productDetail?.productImage1Url,
                    cakeDesignId: productDetail?.cakeDesignId,
                  },
                  orderInfo: {
                    deliveryType,
                    selectedDate: selectedDate,
                    selectedTime: selectedTime,
                    recipientName: recipientInfo.name,
                    recipientPhone: recipientInfo.phone,
                    address:
                      deliveryType === "픽업"
                        ? productDetail?.venderAddress
                        : deliveryAddress,
                    cakeLetter: letters.cakeLetter,
                    plateLetter: letters.plateLetter,
                    additionalRequest: letters.additionalRequest,
                    selectedOptions: selectedOptionNames,
                  },
                }}
                className="submit-button"
              >
                요청사항 확인
              </Link>
            )}
          </div>
        </div>
      </main>
      <div
        className="floating-back-button"
        onClick={() => navigate("/")} // 메인화면으로 이동
      >
        YUMMY
        <br />
        바로가기
      </div>
    </div>
  );
};
export default UserCakeDetail;
