import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import "../../assets/css/admin/adminapprovallist.css";

const AdminApprovalList = () => {
    const navigate = useNavigate(); // navigate 선언
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filterStatus, setFilterStatus] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 승인 요청 데이터 상태
    const [approvalRequests, setApprovalRequests] = useState([]);
    // 백엔드에서 데이터 가져오기

    const fetchApprovalRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/venders/approval`);
            console.log("Fetched Data:", response.data); // 응답 데이터에 memberId 확인
            setApprovalRequests(response.data);
        } catch (error) {
            console.error("데이터를 가져오는 데 실패했습니다:", error);
        }
    };
    useEffect(() => {
        fetchApprovalRequests();
    }, []);

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

    const handleApproval = async (status) => {
        if (selectedRequest && selectedRequest.memberId) { // venderId 대신 memberId 사용
            try {
                await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/admin/members/${selectedRequest.memberId}/status`, // URL에 memberId 사용
                    { isActive: 1 } // isActive를 1로 설정
                );
                const updatedRequests = approvalRequests.map(request =>
                    request.memberId === selectedRequest.memberId // memberId로 상태 업데이트
                        ? { ...request, status, isActive: 1 }
                        : request
                );
                navigate(0);
                setApprovalRequests(updatedRequests);
                setIsModalOpen(false);
            } catch (error) {
                console.error("승인 상태를 업데이트하는 데 실패했습니다:", error);
            }
        } else {
            console.error("memberId가 없습니다.");
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 검색어 변경 시 첫 페이지로 리셋
    };

    return (
        <div className="admin-approvallist-content">
            <h2>업체 승인 내역</h2>
            <div className="filter-container">
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
                                    <h3>{request.venderName}</h3>
                                    <p>{request.representativeName}</p>
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
                className="admin-modal-content"
                overlayClassName="admin-modal-overlay"
            >
                {selectedRequest && (
                    <div>
                        <h2>{selectedRequest.venderName}</h2>
                        <p><strong>아이디(이메일):</strong> {selectedRequest.email}</p>
                        <p><strong>대표자명:</strong> {selectedRequest.representativeName}</p>
                        <p><strong>상호명:</strong> {selectedRequest.storeName}</p>
                        <a
                            href={selectedRequest.businessLicenseUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-registration-button"
                            style={{ pointerEvents: selectedRequest.businessLicenseUrl ? 'auto' : 'none', color: selectedRequest.businessLicenseUrl ? 'blue' : 'gray' }}
                        >
                            사업자등록증 보기
                        </a>
                        <div className="admin-modal-buttons">
                            <button className="approve-button" onClick={() => handleApproval('승인완료')}>승인완료</button>
                            <button className="close-modal-button" onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminApprovalList;
