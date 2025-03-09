// 라이브러리 임포트
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwithdrawconfirm.css"; // 스타일링을 위한 CSS 파일

const UserWithdrawConfirm = ({ onClose }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

  // 회원 탈퇴 확인 핸들러
  const handleConfirmWithdraw = () => {
    axios({
      method: "put", // 데이터를 수정하므로 PUT 메서드 사용
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/withdraw`,
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
      },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("회원 탈퇴가 완료되었습니다."); // 성공 알림

          // 로컬 스토리지 정리 및 로그아웃 처리
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          // 로그인 페이지 또는 홈페이지로 리디렉션
          navigate('/');
        } else {
          alert("회원 탈퇴 실패"); // 실패 알림
        }
      })
      .catch((error) => {
        console.error("Error processing withdrawal:", error); // 에러 처리
      });
  };

  return (
    <div className="withdraw-modal-overlay">
      {/* 탈퇴 확인 모달 컨텐츠 */}
      <div className="withdraw-modal-content">
        <h2>회원 탈퇴를 진행하시겠습니까?</h2>
        <p className="withdraw-subtitle">유의사항을 확인해주세요</p>

        {/* 탈퇴 관련 유의사항 정보 */}
        <div className="withdraw-info-box">
          <h3>회원 탈퇴 시 유의사항</h3>
          <ul>
            <li>회원탈퇴를 통한 회원 종료 시 재가입의 제한 및 해당 혜택이 종료됩니다. (단, 업체 회원은 30일간 재가입 제한)</li>
            <li>회원탈퇴 시 개인정보가 삭제됩니다.</li>
            <li>카카오톡, 네이버 회원의 경우 모든 연동된 정보가 탈퇴처리됩니다.</li>
            <li>탈퇴된 ID로 재가입이 불가하며, 신규 ID로 재가입할 수 있습니다.</li>
          </ul>
        </div>

        {/* 탈퇴 확인 및 취소 버튼 */}
        <button className="withdraw-confirm-btn" onClick={handleConfirmWithdraw}>
          탈퇴하기
        </button>
        <button className="withdraw-cancel-btn" onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default UserWithdrawConfirm;
