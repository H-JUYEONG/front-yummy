// OrderComplete.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../include/Header';
import Footer from '../include/Footer';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userordercomplete.css';

const UserOrderComplete = () => {
    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
                <Header/>
            </header>

            <main id="user-wrap-body">
                <section id="user-wrap-main">
                    <div className="order-complete-container">
                        <div className="order-complete-icon">
                            <div className="check-circle">
                                <span className="check">✓</span>
                            </div>
                        </div>
                        <div className="order-complete-message">
                            <h2>결제가 완료되었습니다!</h2>
                            <p>주문하신 내역은 마이페이지에서 확인하실 수 있습니다.</p>
                        </div>
                        <div className="order-info">
                            <div className="info-row">
                                <span className="label">주문번호:</span>
                                <span className="value">ORD-20241103-001</span>
                            </div>
                            <div className="info-row">
                                <span className="label">결제금액:</span>
                                <span className="value">35,000원</span>
                            </div>
                            <div className="info-row">
                                <span className="label">결제일시:</span>
                                <span className="value">2024.11.03 15:30</span>
                            </div>
                        </div>
                        <div className="button-container">
                            <Link to="/user/main" className="main-button">
                                메인으로 돌아가기
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="user-full-width">
                <Footer/>
            </footer>
        </div>
    );
};

export default UserOrderComplete;