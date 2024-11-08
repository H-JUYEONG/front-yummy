// Import libraries
import React from 'react';
import '../../assets/css/all.css';
import '../../assets/css/user/userPersonalInfoEdit.css';

const UserPersonalInfoEdit = () => {
    return (
        <div id="wrap" className="text-center">
            {/* Header */}
            <header id="wrap-head">
                <h1>회원정보 변경</h1>
            </header>

            {/* Main Content */}
            <main id="wrap-body" className="clearfix">
                {/* Sidebar */}
                <aside id="wrap-side" className="float-left">
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

                {/* Main Section */}
                <section id="wrap-main" className="float-right">
                    <h2>회원정보 변경</h2>
                    <form className="j-form">
                        <label>아이디</label>
                        <input type="text" value="home@naver.com" readOnly />

                        <label>이름</label>
                        <input type="text" value="김덕훈" readOnly />

                        <label>새 비밀번호</label>
                        <input type="password" placeholder="새 비밀번호" />

                        <label>비밀번호 확인</label>
                        <input type="password" placeholder="비밀번호 확인" />

                        <label>휴대폰 번호</label>
                        <input type="tel" placeholder="휴대폰 번호" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" />

                        <div className="j-buttons">
                            <button type="button" className="j-cancel">취소</button>
                            <button type="submit" className="j-save">저장하기</button>
                        </div>
                    </form>
                </section>
            </main>

            {/* Footer */}
            <footer className="full-width">
                <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
            </footer>
        </div>
    );
};

export default UserPersonalInfoEdit;
