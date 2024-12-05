import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [auditionVenders, setAuditionVenders] = useState([]); // 오디션 참가 업체 리스트
  const [auditionVendersEnd, setAuditionVendersEnd] = useState(null); // 오디션 종료 업체 정보
  const [auditionVendersReviews, setAuditionVendersReviews] = useState([]); // 오디션 종료 업체 리뷰
  const [authUser, setAuthUser] = useState(null); // 현재 로그인된 사용자 정보

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 업체 데이터

  // 오디션 상세 정보 가져오기
  const getAuditionDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/audition/detail/${auditionApplicationId}`
      );

      const data = response.data.apiData; // API 데이터
      console.log("받아온 전체 데이터:", data);
      console.log("글 디테일:", data.auditionDetail);
      console.log("참가업체:", data.auditionVenders);
      console.log("종료:", data.auditionVendersEnd);
      console.log("리뷰:", data.auditionVendersReviews);

      if (response.data.result === "success") {
        setAuditionDetail(data.auditionDetail || {});
        setAuditionVenders(data.auditionVenders || []);
        setAuditionVendersEnd(data.auditionVendersEnd || {});
        setAuditionVendersReviews(data.auditionVendersReviews || []);
      } else {
        alert("데이터를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
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

  // 글 삭제 요청 함수
  const deleteAudition = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/user/audition/delete/${auditionApplicationId}`,
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      })
        .then((response) => {
          if (response.data.result === "success") {
            alert("게시글이 성공적으로 삭제되었습니다.");
            navigate("/user/audition/board"); // 삭제 후 리스트로 이동
          } else {
            alert(
              response.data.message || "게시글을 삭제하는 데 실패했습니다."
            );
          }
        })
        .catch((error) => {
          console.error("게시글 삭제 실패", error);
          alert("게시글을 삭제하는 중 문제가 발생했습니다.");
        });
    }
  };

  useEffect(() => {
    // 로그인된 사용자 정보 가져오기
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);

    getAuditionDetail();
  }, [auditionApplicationId]);

  return (
    <>
      <Header />
      <div id="user-wrap">
        <main id="user-wrap-body" className="clearfix">
          <div className="user-audition-details">
            <div className="user-audition-ongoing-header">
              <div className="user-cake-audition-ongoing-title">
                <span>
                  {auditionDetail?.auditionApplicationTitle || "제목 없음"}
                </span>
              </div>
              <div className="user-audition-ongoing-info">
                <p className="user-cake-audition-ongoing-write-date">
                  {auditionDetail?.createdAt || "작성일 없음"}
                </p>
                <p className="user-cake-audition-ongoing-hit">
                  조회 {auditionDetail?.auditionViewCount || 0}
                </p>
                <p className="user-cake-audition-ongoing-author">
                  {auditionDetail?.userNickname || "작성자 없음"}
                </p>

                {authUser &&
                  auditionDetail?.memberId === authUser.member_id && (
                    <div className="user-control-section">
                      <button
                        className="user-cake-edit-button"
                        onClick={() =>
                          navigate(
                            `/user/audition/edit/${auditionApplicationId}`
                          )
                        }
                      >
                        수정
                      </button>
                      <button
                        className="user-cake-delete-button"
                        onClick={deleteAudition}
                      >
                        삭제
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <div className="ongoing-main-content">
              <div className="ongoing-auction-info">
                <h2>요청 정보</h2>
                <div className="ongoing-cake-info">
                  {auditionDetail ? (
                    <>
                      {/* <h3>게시글 번호: {auditionDetail.auditionApplicationId}</h3> */}
                      <p>
                        희망 가격:{" "}
                        {`${auditionDetail.expectedPrice.toLocaleString()}원` ||
                          "정보 없음"}
                      </p>
                      <p>
                        사이즈:{" "}
                        {auditionDetail.auditionApplicationSize || "정보 없음"}
                      </p>
                      <p>
                        케이크 위 레터링:{" "}
                        {auditionDetail.cakeLettering || "정보 없음"}
                      </p>
                      <p>
                        케이크 판 레터링:{" "}
                        {auditionDetail.plateLettering || "정보 없음"}
                      </p>
                      <p>
                        수령 방식:{" "}
                        {auditionDetail.deliveryMethod || "정보 없음"}
                      </p>
                      <p>
                        수령 지역(구): {auditionDetail.region || "정보 없음"}
                      </p>
                      <p>
                        희망 날짜: {auditionDetail.desiredDate || "정보 없음"}
                      </p>
                      <p>
                        희망 시간: {auditionDetail.desiredTime || "정보 없음"}
                      </p>
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
                  <h3>예시도안</h3>
                  {auditionDetail?.imageUrl ? (
                    <>
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
                    <h2>참가 업체</h2>
                  </div>
                </div>

                {auditionDetail?.status === "종료" && auditionVendersEnd ? (
                  <div className="ongoing-company-wrapper">
                    <div className="ongoing-company">
                      <img
                        src={auditionVendersEnd.productImage1Url || ""}
                        alt="선택된 케이크 이미지"
                        onClick={() =>
                          window.open(
                            `/user/cakedetail/${auditionVendersEnd.productId}/${auditionVendersEnd.venderId}`,
                            "_blank"
                          )
                        }
                      />
                      <div className="ongoing-company-info">
                        <p
                          className="ongoing-vender-name"
                          onClick={() =>
                            window.open(
                              `/user/storedetail/${auditionVendersEnd.venderId}`,
                              "_blank"
                            )
                          }
                        >
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
                      <div className="review-list">
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
                                <p>
                                  {review.reviewContent || "리뷰 내용 없음"}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="no-vender-list">리뷰가 없습니다.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : auditionVenders.length > 0 ? (
                  auditionVenders.map((company, index) => (
                    <div key={index} className="ongoing-company">
                      <img
                        src={company.productImage1Url || ""}
                        alt="케이크 이미지"
                        onClick={() =>
                          window.open(
                            `/user/cakedetail/${company.productId}/${company.venderId}`,
                            "_blank"
                          )
                        }
                      />
                      <div className="ongoing-company-info">
                        <p
                          className="ongoing-vender-name"
                          onClick={() =>
                            window.open(
                              `/user/storedetail/${company.venderId}`,
                              "_blank"
                            )
                          }
                        >
                          {company.venderName}
                        </p>
                        <p>
                          제시금액: {company.proposedAmount.toLocaleString()}원
                        </p>
                      </div>
                      <button
                        className="ongoing-select-button"
                        onClick={() => openModal(company)}
                      >
                        선택하기
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-vender-list">참가 업체가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </main>

        {isModalOpen && selectedCompany && (
          <UserAuditionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            company={selectedCompany}
          />
        )}
      </div>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserAuditionOngoing;
