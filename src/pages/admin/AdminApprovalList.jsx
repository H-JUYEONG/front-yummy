import React, { useState } from 'react';
import Modal from 'react-modal';
import "../../assets/css/admin/adminapprovallist.css";

const AdminApprovalList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filterStatus, setFilterStatus] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [approvalRequests, setApprovalRequests] = useState([
        {
            id: 1,
            name: "처쳐나라의 케이크",
            description: "마구마구 처져처 케이크",
            status: "신청중",
            email: "example1@example.com",
            password: "password1",
            representativeName: "대표자명1",
            businessRegistration: "사업자등록증1.pdf",
            storeName: "처쳐나라 케이크"
        },
        {
            id: 2,
            name: "케익왕자 주영공주",
            description: "이 나라의 케이크는 다 내꺼",
            status: "신청중",
            email: "example2@example.com",
            password: "password2",
            representativeName: "대표자명2",
            businessRegistration: "사업자등록증2.pdf",
            storeName: "케익왕자"
        },
        {
            id: 3,
            name: "드래곤의 케이크 일기",
            description: "난 오늘도 최종입니다.",
            status: "신청중",
            email: "example3@example.com",
            password: "password3",
            representativeName: "대표자명3",
            businessRegistration: "사업자등록증3.pdf",
            storeName: "드래곤 케이크"
        },
        {
            id: 4,
            name: "헝그리 케이크",
            description: "제프는 배고파요",
            status: "신청중",
            email: "example4@example.com",
            password: "password4",
            representativeName: "대표자명4",
            businessRegistration: "사업자등록증4.pdf",
            storeName: "헝그리 케이크"
        }
    ]);

    // 필터링된 멤버 관리
    const filteredRequests = approvalRequests.filter(request =>
        (filterStatus === "전체" || request.status === filterStatus) &&
        (searchTerm === "" || request.name.includes(searchTerm))
    );

    // 페이징 관련 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    // 페이지 이동 핸들러
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const openModal = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleApproval = (status) => {
        if (selectedRequest) {
            const updatedRequests = approvalRequests.map(request =>
                request.id === selectedRequest.id ? { ...request, status } : request
            );
            setApprovalRequests(updatedRequests);
            setIsModalOpen(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 검색어 변경 시 첫 페이지로 리셋
    };

    return (
        <div className="admin-approvallist-content">
            <h2>업체 승인 내역</h2>
            <div className="filter-container">
                <label htmlFor="filter-status">상태 필터: </label>
                <select id="filter-status" value={filterStatus} onChange={handleFilterChange}>
                    <option value="전체">전체</option>
                    <option value="신청중">신청중</option>
                    <option value="승인완료">승인완료</option>
                    <option value="승인거절">승인거절</option>
                </select>
                <input
                    type="text"
                    placeholder="업체명 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="approval-requests">
                <div className="approval-items-container">
                    {currentMembers.map(request => (
                        <div key={request.id} className="approval-item">
                            <div className={`approval-image-placeholder ${request.status}`}> {/* 상태에 따른 클래스 추가 */}
                                {request.status}
                            </div>
                            <div className="approval-info horizontal-layout">
                                <div>
                                    <h3>{request.name}</h3>
                                    <p>{request.description}</p>
                                </div>
                                <div className="approval-action">
                                    <button className="view-button" onClick={() => openModal(request)}>신청 내역 보기</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 페이징 */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="신청 내역 모달"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedRequest && (
                    <div>
                        <h2>{selectedRequest.name}</h2>
                        <p><strong>아이디(이메일):</strong> {selectedRequest.email}</p>
                        <p><strong>비밀번호:</strong> {selectedRequest.password}</p>
                        <p><strong>대표자명:</strong> {selectedRequest.representativeName}</p>
                        <p><strong>상호명:</strong> {selectedRequest.storeName}</p>
                        <p><strong>상태:</strong> {selectedRequest.status}</p>
                        <a href={selectedRequest.businessRegistration} target="_blank" rel="noopener noreferrer" className="view-registration-button">사업자등록증 보기</a>
                        <div className="modal-buttons">
                            <button className="approve-button" onClick={() => handleApproval('승인완료')}>승인완료</button>
                            <button className="reject-button" onClick={() => handleApproval('승인거절')}>승인거절</button>
                            <button className="close-modal-button" onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminApprovalList;
