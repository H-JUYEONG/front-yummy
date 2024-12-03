//import 라이브러리
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//import css
import "../../assets/css/vender/appealDesignDetails.css";
import "../../assets/css/vender/syModal.css";
import "../../assets/css/user/userAuditionModal.css";

const UserAuditionModal = ({ isOpen, onClose, company }) => {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser")) || null;
  if (!isOpen || !company) return null; // isOpen이 false이거나 company가 없으면 렌더링하지 않음

  // 업체가 신청한 내용 가져오기
  const auditionSelect = () => {
    const token = localStorage.getItem("token");

    const auditionApplicationId = company.auditionApplicationId;

    const JuAuditionVendorCartVo = {
      auditionApplicationId: company.auditionApplicationId, // 경매 주문 ID
      auditionCartId: company.auditionCartId, // 경매 장바구니 ID
      productId: company.productId,
      deliveryMethod: company.deliveryMethod, // 수령 방법 (픽업, 퀵배송)
      deliveryAddress: company.deliveryAddress, // 배송 주소
      recipientName: company.recipientName, // 받는 사람 이름
      recipientPhone: company.recipientPhone, // 받는 사람 연락처
      desiredDate: company.desiredDate, // 희망 날짜(픽업, 배송 공통부분이므로 한개 사용)
      desiredTime: company.desiredTime, // 희망 날짜(픽업, 배송 공통부분이므로 한개 사용)
      productType: company.productType, // 상품 종류
      cakeSize: company.cakeSize, // 케이크 사이즈
      flavorSheet: company.flavorSheet, // 맛 - 시트
      flavorCream: company.flavorCream, // 맛 - 크림
      backgroundColor: company.backgroundColor, // 케이크 배경 색상
      creamPosition: company.creamPosition, // 크림 위치
      creamColor: company.creamColor, // 크림 색상
      decorationType: company.decorationType, // 데코 종류
      decorationColor: company.decorationColor, // 데코 색상
      category: company.category, // 카테고리
      orderAmount: company.orderAmount, // 총 주문 금액
      cakeLettering: company.cakeLettering, // 케이크 레터링
      plateLettering: company.plateLettering, // 판위 레터링
      additionalRequests: company.additionalRequests, // 기타 요청 사항
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/select`,
      headers: { Authorization: `Bearer ${token}` },
      data: JuAuditionVendorCartVo,
      responseType: "json", // 수신타입
    })
      .then((response) => {
        console.log(response.data.apiData); // 객체 자체를 출력
        if (response.data.result === "success") {
          navigate(
            `/user/audition/complete?auditionApplicationId=${auditionApplicationId}`
          );
        } else {
          alert("신청 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="vender-sso-modal-overlay">
      <div
        className="vender-sso-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sso-modal-head">
          <button className="vender-sso-modal-close-button" onClick={onClose}>
            X
          </button>
          <h2 className="vender-appeal-title-name">🧾 신청 내역 상세</h2>
        </div>
        <div className="sso-modal-body">
          <div className="sso-modal-body-content-jw">
            <div className="sso-modal-body-flex">
              <div className="modal-user-input-text">
                <p className="sy-modal-sub-title-jw">🍰 업체 신청 내역</p>
                <div className="appeal-design-text-jw">
                  <ul>
                    <li>
                      주문번호 : {company.auditionApplicationId || "정보 없음"}
                    </li>
                    <li>업체명: {company.venderName || "없음"}</li>
                    <li>상품명 : {company.productName || "없음"}</li>
                    <li>상품 타입 : {company.productType || "없음"}</li>
                    <li>사이즈 : {company.cakeSize || "없음"}</li>
                    <li>시트 맛: {company.flavorSheet || "없음"}</li>
                    <li>크림 맛 : {company.flavorCream || "없음"}</li>
                    <li>크림 색상 : {company.creamColor || "없음"}</li>
                    <li>크림 위치 : {company.creamPosition || "없음"}</li>
                    <li>케이크 배경색 : {company.backgroundColor || "없음"}</li>
                    <li>
                      데코레이션 타입 : {company.decorationType || "없음"}
                    </li>
                    <li>
                      데코레이션 색상 : {company.decorationColor || "없음"}
                    </li>
                    <li>카테고리 : {company.category || "없음"}</li>
                    <li>케이크 레터링 : {company.cakeLettering || "없음"}</li>
                    <li>
                      케이크판 레터링 : {company.plateLettering || "없음"}
                    </li>
                    <li>
                      제시금액 :{" "}
                      {`${company.proposedAmount.toLocaleString()}원` || "없음"}
                    </li>
                    <li>업체 코멘트</li>
                    <li>
                      <div className="appeal-design-text-RequestedTerm">
                        {company.shopRequests || "코멘트가 없습니다."}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="modal-user-input-img">
                <p className="sy-modal-sub-title-jw">🎂 제안된 상품 이미지</p>
                <div className="appeal-design-photo-jw">
                  <img
                    src={
                      company.productImage1Url ||
                      "../../assets/images/cake-logo1.png"
                    }
                    alt="예시도안"
                  />
                </div>
                {authUser && company?.userId === authUser.user_id && (
                  <div>
                    <button
                      className="user-ongoing-select-button"
                      onClick={auditionSelect}
                    >
                      결제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuditionModal;
