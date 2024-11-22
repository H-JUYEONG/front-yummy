import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import "../../assets/css/user/userauditionongoing.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const UserAuditionOngoing = () => {
  const navigate = useNavigate();
  const { auditionApplicationId } = useParams(); // URL 경로에서 값 가져오기

  const [auditionDetail, setAuditionDetail] = useState([]); // 오디션 상세 정보 리스트
  const [auditionVenders, setauditionVenders] = useState([]); // 오디션 참가 업체 리스트
  const [auditionVendersEnd, setauditionVendersEnd] = useState([]); // 오디션 참가 업체 리스트
  const [auditionVendersReviews, setauditionVendersReviews] = useState([]); // 오디션 종료 업체 + 리뷰
  const [authUser, setAuthUser] = useState(null); // 현재 로그인된 사용자 정보

  // 오디션 상세 정보 가져오기
  const getAuditionDetail = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/detail/${auditionApplicationId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log("상세정보");
        console.log(response.data); //수신데이타
        if (response.data.result === "success") {
          setAuditionDetail(response.data.apiData);
          console.log(response.data.apiData);
        } else {
          alert("오디션 상세정보 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 오디션 참가 업체 내용 가져오기
  const getAuditionVenders = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/venders/${auditionApplicationId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log(response.data.apiData); //수신데이타

        if (response.data.result === "success") {
          setauditionVenders(response.data.apiData);
        } else {
          alert("오디션 참가 업체 내용 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 오디션 종료된 내용 가져오기
  const getAuditionVendersEnd = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/venders/end/${auditionApplicationId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log("하");
        console.log(response.data); //수신데이타

        if (response.data.result === "success") {
          setauditionVendersEnd(response.data.apiData);
        } else {
          alert("오디션 참가 업체 내용 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰 내용 가져오기
  const getAuditionVendersReviews = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/venders/reviews/${auditionApplicationId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log("리뷰");
        console.log(response.data.apiData); //수신데이타
        console.log(response.data.apiData.productImage1Url); //수신데이타

        if (response.data.result === "success") {
          setauditionVendersReviews(response.data.apiData);
        } else {
          alert("오디션 참가 업체 내용 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // 로그인된 사용자 정보 가져오기
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);

    getAuditionDetail();
    getAuditionVenders();
    getAuditionVendersEnd();
    getAuditionVendersReviews();
  }, [auditionApplicationId]);

  return (
    <div id="user-wrap" className="text-center ongoing-audition">
      <header id="user-wrap-head">
        <Header />
      </header>
      <main id="user-wrap-body" className="clearfix ongoing-content">
        <div className="user-design-header">
          <div className="user-cake-designs-title">
            <span>{auditionDetail.auditionApplicationTitle}</span>
          </div>
          <div className="user-design-info">
            <p className="user-cake-design-write-date">
              {auditionDetail.createdAt}
            </p>
            <p className="user-cake-design-hit">
              조회 {auditionDetail.auditionViewCount}
            </p>
            <p className="user-cake-design-author">
              작성자 {auditionDetail.userNickname}
            </p>
            {authUser && auditionDetail.memberId === authUser.member_id && (
              <div className="user-control-section">
                <button
                  className="user-cake-edit-button"
                  onClick={() => navigate("/user/mypage/audition")}
                >
                  수정
                </button>
                <button
                  className="user-cake-delete-button"
                  onClick={() => alert("삭제 기능")}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="ongoing-main-content">
          <div className="ongoing-auction-info">
            <h2>달콤한 케이크 부탁해요!</h2>
            <div className="ongoing-cake-info">
              <h3>게시글 번호: {auditionDetail.auditionApplicationId}</h3>
              <p>희망 가격: {auditionDetail.expectedPrice}</p>
              <p>사이즈: {auditionDetail.auditionApplicationSize}</p>
              <p>수령 방식: {auditionDetail.deliveryMethod}</p>
              <p>수령 지역(구): {auditionDetail.region}</p>
              <p>희망 날짜: {auditionDetail.desiredDate}</p>
              <p>희망 시간: {auditionDetail.desiredTime}</p>
              <p>요청사항: {auditionDetail.additionalRequests}</p>
            </div>
            <div className="ongoing-design-preview">
              <h3>예시도안</h3>
              <img src={auditionDetail.imageUrl} alt="예시 도안" />
            </div>
          </div>

          <div className="ongoing-participating-companies">
            <div
              id="audition-status-container"
              className="audition-header-container"
            >
              <div className="audition-vender-name">
                <h2>오디션 참가 업체</h2>
              </div>
            </div>
            {auditionDetail.status === "종료" ? (
              // 오디션 종료 상태에서는 선택된 업체만 표시
              <div className="ongoing-company-wrapper">
                <div className="ongoing-company">
                  <img
                    src={auditionVendersEnd.productImage1Url}
                    alt="선택된 케이크 이미지"
                  />
                  <div className="ongoing-company-info">
                    <p className="ongoing-vender-name">
                      {auditionVendersEnd.venderName}
                    </p>
                    <div className="ongoing-company-rating">
                      {auditionVendersEnd.productName}
                    </div>
                    <p>
                      제시금액:{" "}
                      {auditionVendersEnd.proposedAmount.toLocaleString()}원
                    </p>
                  </div>
                </div>

                {/* 리뷰 섹션을 아래로 이동 */}
                <div className="review-section">
                  <h3>구매자 리뷰</h3>
                  {auditionVendersReviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <img
                        src={review.productImage1Url}
                        alt={`${review.productName}의 리뷰 이미지`}
                        className="review-image"
                      />
                      <div className="review-text">
                        <p>
                          <strong>{review.userNickname}</strong>
                        </p>
                        <div className="reviews-rating">
                          {[...Array(review.reviewRating)].map(
                            (_, starIndex) => (
                              <FaStar
                                key={starIndex}
                                className="audition-review-star-icon"
                              />
                            )
                          )}
                        </div>
                        <p>{review.reviewContent}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // 진행 중일 때는 모든 업체를 표시
              auditionVenders.map((company, index) => (
                <div key={index} className="ongoing-company">
                  <img
                    src={company.productImage1Url}
                    alt="케이크 이미지"
                    onClick={() =>
                      navigate(`/user/cakedetail/${company.productId}`)
                    }
                  />
                  <div className="ongoing-company-info">
                    <p
                      className="ongoing-vender-name"
                      onClick={() =>
                        navigate(`/user/storedetail/${company.venderId}`)
                      }
                    >
                      {company.venderName}
                    </p>
                    <div className="ongoing-company-rating">
                      {company.productName}
                    </div>
                    <p>제시금액: {company.proposedAmount.toLocaleString()}원</p>
                  </div>
                  <Link to="/user/paymentdetail">
                    <button className="ongoing-select-button">선택하기</button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionOngoing;
