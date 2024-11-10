// Import libraries
import React from 'react';
import '../../assets/css/all.css';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userPersonalInfoEdit.css';
import UserSidebar from './include/UserSidebar';

const UserPersonalInfoEdit = () => {
    return (
        <div id="user-wrap" className="user-text-center">
            {/* Header */}
            <header id="user-wrap-head">
                <h1>회원정보 수정</h1>
            </header>

            {/* Main Content */}
            <main id="user-wrap-body" className="clearfix">
                {/* Sidebar */}
                <aside id="user-wrap-side" className="float-left">
                    <h2>Sidebar</h2>
                    <ul>
                        <li><a href="#link1">링크 1</a></li>
                        <li><a href="#link2">링크 2</a></li>
                        <li><a href="#link3">링크 3</a></li>
                    </ul>
                </aside>

                {/* Main Section */}
                <section id="user-edit-main" className="float-right">
                    <h2>회원정보 수정</h2>
                    <form className="user-edit-form">
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

                    </form>
                    <div className="user-edit-buttons">
                        <button type="button" className="user-cancel-button">취소</button>
                        <button type="submit" className="user-save-button">저장하기</button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="user-full-width">
                <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
            </footer>
        </div>
    );
};

export default UserPersonalInfoEdit;
