import React from 'react';
import '../../assets/css/user/userpaymentdetail.css';
import { Link } from 'react-router-dom';
const UserPaymentDetail = () => {
    return (
        <div id="user-wrap" className="text-center">
        

            <main id="user-wrap-body">
                <div className="payment-container">
                    <div className="payment-content">
                        <div className="product-info">
                            <div className="product-image">
                                <img src="/images/1호_일반케이크.jpg" alt="상품 이미지" />
                            </div>
                            <div className="product-details">
                                <div className="payment-label">주문 내역 확인</div>
                                <div className="product-title">spcial 꽃감사패 (1호,2호)</div>

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
                                    <span className="label">맛: </span>
                                    <span className="value">초코(+5000)</span>
                                </div>

                                <div className="detail-item">
                                    <span className="label">사이즈: </span>
                                    <span className="value">1호</span>
                                </div>

                                <div className="detail-item">
                                    <span className="label">가격: </span>
                                    <span className="value price">40,000원</span>
                                </div>


                                <div className="detail-item">
                                    <span className="label">케이크 위 문구: </span>
                                    <span className="value">합격하세요</span>
                                </div>

                                <div className="detail-item message">
                                    <span className="label">케이크 판 문구: </span>
                                    <span className="value">사랑합니다</span>
                                </div>

                                <div className="detail-item note">
                                    <span className="label">요청사항: </span>
                                    <span className="value">크림을 조금만 부탁드립니다. 느끼한 걸 싫어해요.</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/user/ordercomplete">
                            <button className="payment-button">결제</button>
                        </Link>
                    </div>
                </div>
            </main>

            
                
        </div>
    );
};

export default UserPaymentDetail;