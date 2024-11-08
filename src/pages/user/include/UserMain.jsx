import React from 'react';
import '../../../assets/css/user/UserAll.css';

const UserMain= () => {
        return (
            <div id="wrap" className="text-center">
                {/* Header */}
                <header id="wrap-head">
                    <h1>Header 영역</h1>
                </header>
    
                {/* Main Content */}
                <main id="wrap-body" className="clearfix">
                    {/* Sidebar */}
                    <aside id="wrap-side" className="float-left">
                        <h2>Sidebar</h2>
                        <ul>
                            <li><a href="#link1">링크 1</a></li>
                            <li><a href="#link2">링크 2</a></li>
                            <li><a href="#link3">링크 3</a></li>
                        </ul>
                    </aside>
    
                    {/* Main Section */}
                    <section id="wrap-main" className="float-right">
                        <h2>Main Content</h2>
                        <p>이것은 본문 내용입니다. 전역 스타일 규칙에 따라 텍스트가 스타일링되었습니다.</p>
    
                        {/* Button */}
                        <button>테스트 버튼</button>
    
                        {/* Image */}
                        <div>
                            <h3>반응형 이미지</h3>
                            <img src="https://via.placeholder.com/300" alt="Placeholder" />
                        </div>
    
                        {/* Utility Classes */}
                        <div className="text-center">
                            <p>텍스트가 가운데 정렬되었습니다.</p>
                        </div>
                        <div className="hidden">
                            <p>이 텍스트는 hidden 클래스가 적용되어 보이지 않습니다.</p>
                        </div>
                    </section>
                </main>
    
                {/* Footer */}
                <footer className="full-width">
                    <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
                </footer>
            </div>
        );
    };
export default UserMain;