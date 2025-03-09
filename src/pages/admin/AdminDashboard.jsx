import React, {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdCash, IoMdCart, IoMdPeople, IoMdAnalytics, IoMdPersonAdd } from 'react-icons/io';
import "../../assets/css/admin/adminDashboard.css";
import AdminSidebar from '../../components/admin/AdminSidebar';
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('authUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.type === '어드민') {
                setAuthUser(parsedUser); // 어드민일 경우에만 상태에 저장
            } else {
                alert('접근 권한이 없습니다.');
                navigate('/login'); // 권한 없을 경우 로그인 페이지로 리디렉션
            }
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login'); // 로그인되지 않았을 경우 로그인 페이지로 리디렉션
        }
    }, [navigate]);

    if (!authUser) {
        return null; // authUser가 없으면 아무것도 렌더링하지 않음
    }

    const memberId = authUser.member_id;

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <AdminSidebar />
            {/* Main Content */}
            <main className="admin-dashboard-content">
                <header className="header">
                    <h1>대시보드</h1>
                </header>

                <section className="overview-cards">
                    <div className="card">
                        <IoMdCash className="icon" />
                        <h3>총 매출 (업체)</h3>
                        <p>₩25,000,000</p>
                        <span className="comparison">지난 달 대비 +5%</span>
                    </div>
                    <div className="card">
                        <IoMdCart className="icon" />
                        <h3>총 주문건수 (업체)</h3>
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
