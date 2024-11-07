import React from 'react';
import '../assets/css/all.css';

const ProfileUpdate = () => {
  return (
    <div className="j-container">
      <aside className="j-sidebar">
        <h3 className="j-sidebar-title">김덕상님 어서오세요!</h3>
        <ul className="j-menu">
          <li>메인 바로가기</li>
          <li>나의 쇼핑내역</li>
          <li>주문 조회</li>
          <li>오디션 내역 관리</li>
          <li>내 활동</li>
          <li>내가 작성한 댓글</li>
          <li>내가 작성한 리뷰</li>
          <li>내가 그린 도안</li>
          <li>찜 목록</li>
          <li>찜한 상품</li>
          <li>찜한 도안</li>
          <li>포인트</li>
          <li>포인트 내역</li>
          <li>회원정보</li>
          <li className="j-active">회원정보 변경</li>
        </ul>
      </aside>
      <main className="j-main">
        <h1 className="j-title">회원정보 변경</h1>
        <form className="j-form">
          <label>아이디</label>
          <input type="text" value="home@naver.com" readOnly />

          <label>이름</label>
          <input type="text" value="김덕훈" readOnly />

          <label>새 비밀번호</label>
          <input type="password" placeholder="새 비밀번호" />

          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호 확인" />

          <label>배송지 정보</label>
          <div className="j-address">
            <input type="text" placeholder="우편번호" />
            <button type="button" className="j-address-search">주소 찾기</button>
          </div>
          <input type="text" placeholder="기본주소" />
          <input type="text" placeholder="상세 주소" />

          <label>기념일 관리</label>
          <div className="j-anniversary">
            <input type="text" placeholder="기념일 이름" />
            <input type="date" />
            <button type="button" className="j-add-anniversary">기념일 추가</button>
          </div>

          <div className="j-buttons">
            <button type="button" className="j-cancel">취소</button>
            <button type="submit" className="j-save">저장하기</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileUpdate;
