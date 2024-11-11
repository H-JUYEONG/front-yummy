// Import libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/all.css";
import "../../../assets/css/user/usermain.css";
import "../../../assets/css/user/userwithdrawconfirm.css"; // Assuming you have a CSS file for styling

const UserWithdrawConfirm = ({ onClose, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirmAndNavigate = () => {
    onConfirm();
    navigate('/'); // Redirects to the homepage
  };

  return (
    <div className="withdraw-modal-overlay">
      <div className="withdraw-modal-content">
        <h2>탈퇴하시다니 아쉬워요</h2>
        <p className="withdraw-subtitle">유의사항을 확인해주세요</p>

        <div className="withdraw-info-box">
          <h3>회원 탈퇴 시 유의사항</h3>
          <ul>
            <li>회원탈퇴를 통한 회원 종료 시 재가입의 제한 및 해당 혜택이 종료됩니다. (단, 업체 회원은 30일간 재가입 제한)</li>
            <li>회원탈퇴 시 개인정보가 삭제됩니다.</li>
            <li>카카오톡, 네이버 회원의 경우 모든 연동된 정보가 탈퇴처리됩니다.</li>
            <li>탈퇴된 ID로 재가입이 불가하며, 신규 ID로 재가입할 수 있습니다.</li>
          </ul>
        </div>

        <button className="withdraw-confirm-btn" onClick={handleConfirmAndNavigate}>
          회원 삭제
        </button>
        <button className="withdraw-cancel-btn" onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default UserWithdrawConfirm;
