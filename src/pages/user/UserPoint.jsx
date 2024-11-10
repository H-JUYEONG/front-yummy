import React from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../../pages/user/include/UserSidebar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userpoint.css';
import Header from '../include/Header';
import Footer from '../include/Footer';

const UserPoint = () => {
    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
                <Header/>
            </header>

            <main id="user-wrap-body">
                <UserSidebar />
                <section id="user-wrap-main">
                    <div className="main-content">
                        <h2>포인트 내역</h2>

                        {/* 현재 포인트 표시 */}
                        <section className="order-status-container">
                            <div className="status-item">
                                <div className="status-label">현재 포인트</div>
                                <div className="status-count">3,000P</div>
                            </div>
                        </section>

                        {/* 기간 검색 섹션 */}
                        <section className="order-search">
                            <div className="date-filter">
                                <input type="date" defaultValue="2024-10-03" />
                                <span>~</span>
                                <input type="date" defaultValue="2024-11-03" />
                                <button className="period-btn">최근 1개월</button>
                                <button className="period-btn">최근 3개월</button>
                                <button className="period-btn">최근 6개월</button>
                            </div>
                            <div className="notice">
                                <p>* 포인트는 사용일자 기준 본인의 포인트 잔액 조회가 가능하며, 10포인트 단위로 적립과 사용 가능합니다.</p>
                            </div>
                        </section>

                        {/* 포인트 내역 목록 */}
                        <section className="order-list">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>일자</th>
                                        <th>적용 내용</th>
                                        <th>사용한 도안</th>
                                        <th>적립</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2024-11-03</td>
                                        <td>내 도안 사용 적립</td>
                                        <td>귀여운 고양이</td>
                                        <td className="point-amount">3,000P</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </section>
            </main>

            <footer id="user-wrap-footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default UserPoint;