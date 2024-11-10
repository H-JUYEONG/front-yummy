import React from 'react';
import UserSidebar from '../../pages/user/include/UserSidebar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userorderdetail.css'
import Header from '../include/Header';
import Footer from '../include/Footer';

const UserOrderDetail = () => {
    // 상품 이미지ㅇㅇ URL - 실제로는 props나 API로 받아올 것 이거 안씁니다 userorder 쓸거에용 
    const productImage = "/images/2호_일반케이크.jpg"; // 예시 이미지 경로

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
                                {productImage ? (
                                    <img 
                                        src={productImage} 
                                        alt="생일 축하 레터링 케이크" 
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/defaultCake.jpg'; // 대체 이미지 경로
                                        }}
                                    />
                                ) : (
                                    <div className="product-image no-image">
                                        이미지 준비중
                                    </div>
                                )}
                            </div>
                            <div className="product-details">
                                <h3>생일 축하 레터링 케이크 (초코맛 맛)</h3>
                                <div className="product-price">35,000원 · 1개</div>
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
                                <p className="delivery-note">배송 요청 사항: 위에 사랑한다고 적어주세요</p>
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

            <footer id="user-wrap-footer">
               <Footer/>
            </footer>
        </div>
    );
};

export default UserOrderDetail;