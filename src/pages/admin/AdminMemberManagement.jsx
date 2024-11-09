import React, { useState } from 'react';
import "../../assets/css/admin/adminMemberManagement.css";

import AdminSidebar from './include/AdminSidebar';
import AdminCompanyList from './AdminCompanyList'; // 업체 리스트 컴포넌트
import ApprovalList from './AdminApprovalList'; // 업체 승인 내역 컴포넌트
import AdminMemberList from './AdminMemberList'; // 추가된 회원 리스트 컴포넌트
const AdminMemberManagement = () => {
    const [activeTab, setActiveTab] = useState("업체 승인");

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
