import React, { useEffect } from 'react';
import UserSidebar from '../../pages/user/include/UserSidebar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userorderdetail.css'
import Header from './include/Header';
import Footer from './include/Footer';

const UserOrderDetail = () => {
    // 컴포넌트 마운트 시 스크롤 최상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
               <Header/>
            </header>

            <main id="user-wrap-body">
                <UserSidebar />
                
                <section id="user-wrap-main">
                    <div className="order-detail-container">
                        <h2 className="order-title">주문 상세</h2>
                        
                        {/* 주문 기본 정보 */}
                        <div className="order-basic-info">
                            <div className="order-date">2024. 11. 06</div>
                            <div className="order-number">주문번호: 24000072376472</div>
                        </div>

                        {/* 주문 상품 정보 */}
                        <div className="order-product-info">
                            
                            <div className="product-image-container">
                                <img 
                                    src="/images/2호_일반케이크.jpg"
                                    alt="생일 축하 레터링 케이크" 
                                    className="product-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/defaultCake.jpg';
                                    }}
                                />
                            </div>
                            <div className="product-details">
                                <h3>special 꽃감사패 (1호,2호)</h3>
                                <div className="detail-item">
                                    <span className="label">배송방법: </span>
                                    <span className="value">픽업</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">픽업일시: </span>
                                    <span className="value">2024/11/04 오후 5시</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">픽업장소: </span>
                                    <span className="value">노량진 9호선 밑바닥</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">색상: </span>
                                    <span className="value">초록</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">맛: </span>
                                    <span className="value">초코(+5000)</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">사이즈: </span>
                                    <span className="value">1호</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">가격: </span>
                                    <span className="value price">40,000원 · 1개</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">케이크 위 문구: </span>
                                    <span className="value">합격하세요</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">케이크 판 문구: </span>
                                    <span className="value">사랑합니다</span>
                                </div>
                                <div className="detail-item note">
                                    <span className="label">요청사항: </span>
                                    <span className="value">크림을 조금만 부탁드립니다. 느끼한 걸 싫어해요.</span>
                                </div>
                                <div className="product-status">
                                    <span className="status-label">주문상태</span>
                                    <span className="status-value">픽업 완료</span>
                                </div>
                            </div>
                        </div>

                        {/* 보내는 사람 정보 */}
                        <div className="order-section">
                            <h3>보내는 사람 정보</h3>
                            <div className="info-content">
                                <p>
                                    <span className="label">보내는 사람</span>
                                    <span className="value">홍길동</span>
                                </p>
                                <p>
                                    <span className="label">연락처</span>
                                    <span className="value">010-9999-9999</span>
                                </p>
                            </div>
                        </div>

                        {/* 받는 사람 정보 */}
                        <div className="order-section">
                            <h3>받는 사람 정보</h3>
                            <div className="info-content">
                                <p>
                                    <span className="label">받는 사람</span>
                                    <span className="value">김철수</span>
                                </p>
                                <p>
                                    <span className="label">연락처</span>
                                    <span className="value">010-8282-8282</span>
                                </p>
                                <p>
                                    <span className="label">받는 주소</span>
                                    <span className="value">서울특별시 강남구 대치동 123 (ABC 빌딩 101호)</span>
                                </p>
                            </div>
                        </div>

                        {/* 결제 정보 */}
                        <div className="order-section">
                            <h3>결제 정보</h3>
                            <div className="info-content">
                                <p>
                                    <span className="label">결제 수단</span>
                                    <span className="value">신용카드</span>
                                </p>
                                <div className="price-summary">
                                    <p>
                                        <span>총 상품가격</span>
                                        <span className="price">35,000원</span>
                                    </p>
                                    <p className="total">
                                        <span>총 결제금액</span>
                                        <span className="price">35,000원</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default UserOrderDetail;
