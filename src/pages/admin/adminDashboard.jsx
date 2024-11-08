import React from 'react';
import { IoMdCash, IoMdCart, IoMdPeople, IoMdAnalytics, IoMdPersonAdd } from 'react-icons/io';
import "../../assets/css/admin/adminDashboard.css";
import AdminSidebar from './include/AdminSidebar';
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            {/* Sidebar */}
            <AdminSidebar />
            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <h1>대시보드</h1>
                </header>

                <section className="overview-cards">
                    <div className="card">
                        <IoMdCash className="icon" />
                        <h3>총 매출 (가맹점)</h3>
                        <p>₩25,000,000</p>
                        <span className="comparison">지난 달 대비 +5%</span>
                    </div>
                    <div className="card">
                        <IoMdCart className="icon" />
                        <h3>총 주문건수 (가맹점)</h3>
                        <p>350 건</p>
                        <span className="comparison">지난 달 대비 +3%</span>
                    </div>
                    <div className="card">
                        <IoMdCash className="icon" />
                        <h3>총 매출 (회사)</h3>
                        <p>₩10,000,000</p>
                        <span className="comparison">지난 달 대비 +8%</span>
                    </div>
                    <div className="card">
                        <IoMdAnalytics className="icon" />
                        <h3>총 주문건수 (회사)</h3>
                        <p>200 건</p>
                        <span className="comparison">지난 달 대비 +4%</span>
                    </div>
                    <div className="card">
                        <IoMdPersonAdd className="icon" />
                        <h3>신규가입회원</h3>
                        <p>120 명</p>
                        <span>최근 7일</span>
                    </div>
                    <div className="card">
                        <IoMdPeople className="icon" />
                        <h3>가입신청 중인 가맹점</h3>
                        <p>15 곳</p>
                        <span>심사 중</span>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
