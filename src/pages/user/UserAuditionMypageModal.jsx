//import 라이브러리
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//import css
import "../../assets/css/vender/appealDesignDetails.css";
import "../../assets/css/vender/syModal.css";
import "../../assets/css/user/userAuditionModal.css";

const UserAuditionModal = ({ isOpen, onClose, audition }) => {
  const navigate = useNavigate();
  if (!isOpen || !audition) return null; // isOpen이 false이거나 audition이 없으면 렌더링하지 않음

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
          <h2 className="vender-appeal-title-name">요청 내역 상세</h2>
        </div>
        <div className="sso-modal-body">
          <div className="sso-modal-body-content">
            <div className="sso-modal-body-flex">
              <div className="modal-user-input-text">
                <p className="sy-modal-sub-title">작성 내역</p>
                <div className="appeal-design-text">
                  <ul>
                    <li>
                      글 번호: {audition.auditionApplicationId || "정보 없음"}
                    </li>
                    <li>제목: {audition.auditionApplicationTitle || "없음"}</li>
                    <li>희망가격:  {`${audition.expectedPrice.toLocaleString()}원` || "없음"}</li>
                    <li>사이즈: {audition.auditionApplicationSize || "없음"}</li>
                    <li>수령 방식: {audition.deliveryMethod || "없음"}</li>
                    <li>수령 지역(구): {audition.region || "없음"}</li>
                    <li>희망 날짜: {audition.desiredDate || "없음"}</li>
                    <li>희망 시간: {audition.desiredTime || "없음"}</li>
                    <li>받는 사람 : {audition.recipientName || "없음"}</li>
                    <li>받는 사람 연락처 : {audition.recipientPhone || "없음"}</li>
                    <li>요청사항</li>
                    <li>
                      <div className="appeal-design-text-RequestedTerm">
                        {audition.additionalRequests || "요청사항이 없습니다."}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="modal-user-input-img">
                <p className="sy-modal-sub-title">제안된 상품 이미지</p>
                <div className="appeal-design-photo">
                  <img
                    src={
                      audition.imageUrl ||
                      "../../assets/images/cake-logo1.png"
                    }
                    alt="예시도안"
                  />
                </div>
                <div>
                  {/* <button
                    className="user-ongoing-select-button"
                  >
                    결제하기
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuditionModal;
