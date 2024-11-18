import React, {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/admin/adminMemberManagement.css";

import AdminSidebar from './include/AdminSidebar';
import AdminCompanyList from './AdminCompanyList'; // 업체 리스트 컴포넌트
import ApprovalList from './AdminApprovalList'; // 업체 승인 내역 컴포넌트
import AdminMemberList from './AdminMemberList'; // 추가된 회원 리스트 컴포넌트
const AdminMemberManagement = () => {
    const [activeTab, setActiveTab] = useState("업체 승인");
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
            {/* 사이드바 */}
            <AdminSidebar />

            {/* 메인 컨텐츠 */}
            <div className="admin-member-content">
                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    {["업체 승인", "업체 리스트", "회원 리스트"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 탭에 따른 컨텐츠 렌더링 */}
                <div className="tab-content">
                    {activeTab === "업체 승인" && (
                        <ApprovalList /> // 업체 승인 내역 컴포넌트
                    )}
                    {activeTab === "업체 리스트" && (
                        <AdminCompanyList />  // 업체 리스트 컴포넌트
                    )}
                    {activeTab === "회원 리스트" && (
                        <AdminMemberList />  // 회원 리스트 컴포넌트
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMemberManagement;
