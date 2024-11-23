import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import "../../assets/css/user/userauditionongoing.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import UserAuditionModal from "./UserAuditionModal"; // 모달 컴포넌트 가져오기

const UserAuditionOngoing = () => {
  const navigate = useNavigate();
  const { auditionApplicationId } = useParams(); // URL 경로에서 값 가져오기

  const [auditionDetail, setAuditionDetail] = useState(null); // 오디션 상세 정보 리스트
  const [auditionVenders, setauditionVenders] = useState([]); // 오디션 참가 업체 리스트
  const [auditionVendersEnd, setauditionVendersEnd] = useState(null); // 오디션 종료 업체 정보
  const [auditionVendersReviews, setauditionVendersReviews] = useState([]); // 오디션 종료 업체 리뷰
  const [authUser, setAuthUser] = useState(null); // 현재 로그인된 사용자 정보

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 업체 데이터

  // 오디션 상세 정보 가져오기
  const getAuditionDetail = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/detail/${auditionApplicationId}`,
      responseType: "json", // 수신타입
    })
      .then((response) => {
        const data = response.data.apiData; // API 데이터
        console.log(response.data.apiData); // 객체 자체를 출력
        console.log("받아온 데이터:", data); // 객체 자체를 출력
        if (response.data.result === "success") {
          setAuditionDetail(data.auditionDetail);
          setauditionVenders(data.auditionVenders || []);
          setauditionVendersEnd(data.auditionVendersEnd || null);
          setauditionVendersReviews(data.auditionVendersReviews || []);
        } else {
          alert("오디션 상세정보 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 모달 열기
  const openModal = (company) => {
    console.log("선택된 업체 데이터:", company); // 데이터 확인
    setSelectedCompany(company); // 선택된 업체 데이터 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedCompany(null); // 선택된 업체 데이터 초기화
  };

  useEffect(() => {
    // 로그인된 사용자 정보 가져오기
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);

    getAuditionDetail();
  }, [auditionApplicationId]);

  return (
    <div id="user-wrap" className="text-center ongoing-audition">
      <header id="user-wrap-head">
        <Header />
      </header>
      <main id="user-wrap-body" className="clearfix ongoing-content">
        <div className="user-design-header">
          <div className="user-cake-designs-title">
            <span>
              {auditionDetail?.auditionApplicationTitle || "제목 없음"}
            </span>
          </div>
          <div className="user-design-info">
            <p className="user-cake-design-write-date">
              {auditionDetail?.createdAt || "작성일 없음"}
            </p>
            <p className="user-cake-design-hit">
              조회 {auditionDetail?.auditionViewCount || 0}
            </p>
            <p className="user-cake-design-author">
              작성자 {auditionDetail?.userNickname || "작성자 없음"}
            </p>
            {authUser && auditionDetail?.memberId === authUser.member_id && (
              <div className="user-control-section">
                <button
                  className="user-cake-edit-button"
                  onClick={() => navigate(`/user/audition/edit/${auditionApplicationId}`)}
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
              {auditionDetail ? (
                <>
                  <h3>게시글 번호: {auditionDetail.auditionApplicationId}</h3>
                  <p>
                    희망 가격: {`${auditionDetail.expectedPrice.toLocaleString()}원` || "정보 없음"}
                  </p>
                  <p>
                    사이즈:{" "}
                    {auditionDetail.auditionApplicationSize || "정보 없음"}
                  </p>
                  <p>
                    수령 방식: {auditionDetail.deliveryMethod || "정보 없음"}
                  </p>
                  <p>수령 지역(구): {auditionDetail.region || "정보 없음"}</p>
                  <p>희망 날짜: {auditionDetail.desiredDate || "정보 없음"}</p>
                  <p>희망 시간: {auditionDetail.desiredTime || "정보 없음"}</p>
                  <p>
                    요청사항:{" "}
                    {auditionDetail.additionalRequests || "요청 사항 없음"}
                  </p>
                </>
              ) : (
                <p>오디션 상세 정보를 불러오는 중입니다...</p>
              )}
            </div>

            <div className="ongoing-design-preview">
              {auditionDetail?.imageUrl ? (
                <>
                  <h3>예시도안</h3>
                  <img src={auditionDetail.imageUrl} alt="예시 도안" />
                </>
              ) : (
                <p>예시 도안이 없습니다.</p>
              )}
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

            {auditionDetail?.status === "종료" && auditionVendersEnd ? (
              <div className="ongoing-company-wrapper">
                <div className="ongoing-company">
                  <img
                    src={auditionVendersEnd.productImage1Url || ""}
                    alt="선택된 케이크 이미지"
                  />
                  <div className="ongoing-company-info">
                    <p className="ongoing-vender-name">
                      {auditionVendersEnd.venderName || "업체 이름 없음"}
                    </p>
                    <p>
                      제시금액:{" "}
                      {auditionVendersEnd.proposedAmount
                        ? `${auditionVendersEnd.proposedAmount.toLocaleString()}원`
                        : "정보 없음"}
                    </p>
                  </div>
                </div>
                <div className="review-section">
                  <h3>구매자 리뷰</h3>
                  {auditionVendersReviews.length > 0 ? (
                    auditionVendersReviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <img
                          src={review.productImage1Url || ""}
                          alt={`${
                            review.productName || "리뷰 이미지 없음"
                          }의 리뷰 이미지`}
                          className="review-image"
                        />
                        <div className="review-text">
                          <p>
                            <strong>
                              {review.userNickname || "닉네임 없음"}
                            </strong>
                          </p>
                          <div className="reviews-rating">
                            {[...Array(review.reviewRating || 0)].map(
                              (_, starIndex) => (
                                <FaStar
                                  key={starIndex}
                                  className="audition-review-star-icon"
                                />
                              )
                            )}
                          </div>
                          <p>{review.reviewContent || "리뷰 내용 없음"}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>리뷰가 없습니다.</p>
                  )}
                </div>
              </div>
            ) : auditionVenders.length > 0 ? (
              auditionVenders.map((company, index) => (
                <div key={index} className="ongoing-company">
                  <img
                    src={company.productImage1Url || ""}
                    alt="케이크 이미지"
                  />
                  <div className="ongoing-company-info">
                    <p className="ongoing-vender-name">{company.venderName}</p>
                    <p>제시금액: {company.proposedAmount.toLocaleString()}원</p>
                  </div>
                  <button
                    className="ongoing-select-button"
                    onClick={() => openModal(company)}
                  >
                    내용보기
                  </button>
                </div>
              ))
            ) : (
              <p>참가 업체가 없습니다.</p>
            )}
          </div>
        </div>
      </main>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
      {isModalOpen && selectedCompany && (
        <UserAuditionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          company={selectedCompany}
        />
      )}
    </div>
  );
};

export default UserAuditionOngoing;
