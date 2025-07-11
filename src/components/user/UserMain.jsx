import React from 'react';
import '../../assets/css/user/usermain.css'
import Header from './Header';
import Footer from './Footer';
import UserSidebar from './UserSidebar';

const UserMain= () => {
    return (
        <div id="user-wrap" className="text-center">
            {/* Header */}
            <header id="user-wrap-head">
                <Header/>
            </header>

            {/* Main Content */}
            <main id="user-wrap-body" className="clearfix">
            
                    <UserSidebar/>

                {/* Main Section */}
                <section id="user-wrap-main" className="float-right">
                    {/* 게시글 영역 추가 */}
                    <div id="post-content" className="post-area">
                        <h2>게시글 제목</h2>
                        <div className="post-text">
                            <p>이것은 게시글 내용입니다. 나눔스퀘어 폰트가 적용됩니다.</p>
                            <p>여러 줄의 텍스트가 들어갈 수 있습니다.</p>
                        </div>
                    </div>

                    <h2>Main Content</h2>
                    <p>이것은 본문 내용입니다. 나눔 고딕이 적용되었습니다.</p>

                    {/* Button */}
                    <button>테스트 버튼</button>

                    {/* Image */}
                    <div>
                        <h3>반응형 이미지</h3>
                        <img src="https://via.placeholder.com/300" alt="Placeholder" />
                    </div>

                    {/* Utility Classes */}
                    <div className="user-text-center">
                        <p>텍스트가 가운데 정렬되었습니다.</p>
                    </div>
                    <div className="user-hidden">
                        <p>이 텍스트는 hidden 클래스가 적용되어 보이지 않습니다.</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
           
                <Footer/>
        </div>
    );
};
export default UserMain;