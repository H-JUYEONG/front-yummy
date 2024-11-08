import React from 'react';
import "../../assets/css/admin/adminMemberManagement.css";

const AdminApprovalList = () => {
    const approvalRequests = [
        { id: 1, name: "처녀나라의 케이크", description: "마구마구 처져처 케이크", status: "사업자 등록중" },
        { id: 2, name: "케익왕자 주엽공주", description: "이 나라의 케이크는 다 내꺼", status: "사업자 등록중" },
        { id: 3, name: "드래곤의 케이크 일기", description: "난 오늘도 최종입니다.", status: "사업자 등록중" },
        { id: 4, name: "헝그리 케이크", description: "제프는 내 베프라요", status: "사업자 등록중" }
    ];

    return (
        <div className="admin-member-management-container">
            <h2>업체 승인 내역</h2>
            <div className="approval-requests">
                {approvalRequests.map(request => (
                    <div key={request.id} className="approval-item">
                        <div className="approval-image-placeholder"></div>
                        <div className="approval-info">
                            <h3>{request.name}</h3>
                            <p>{request.description}</p>
                            <span className="approval-status">{request.status}</span>
                            <button className="view-button">신청 내역 보기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminApprovalList;
