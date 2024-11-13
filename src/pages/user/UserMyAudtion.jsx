import React, { useState } from 'react';
import UserSidebar from '../../pages/user/include/UserSidebar';
import '../../assets/css/user/usermyaudtion.css';
import Header from './include/Header';
import Footer from './include/Footer';

import AppealDesignDetails from '../vender/VenderAppealDesignDetails'

const UserMyAudtion = () => {
    const auditions = [
        { id: 1, companyName: "업체명", deliveryDate: "2024-11-15", pickupMethod: "배달", bidAmount: "60,000 원", status: "오디션 진행중입니다", orderLink: "#", reviewLink: null },
        { id: 20, companyName: "업체명", deliveryDate: "2024-11-02", pickupMethod: "픽업", bidAmount: "45,000 원", status: "오디션 진행중입니다", orderLink: "#", reviewLink: null },
        { id: 1002, companyName: "주영핑 빵집", deliveryDate: "2024-11-20", pickupMethod: "픽업", bidAmount: "35,000 원", status: "종료", orderLink: "#", reviewLink: "#" },
        { id: 1003, companyName: "더미 데이터 1", deliveryDate: "2024-12-01", pickupMethod: "픽업", bidAmount: "40,000 원", status: "종료", orderLink: "#", reviewLink: "#" },
        { id: 1004, companyName: "더미 데이터 2", deliveryDate: "2024-12-10", pickupMethod: "배달", bidAmount: "50,000 원", status: "종료", orderLink: "#", reviewLink: "#" },
        // 필요한 만큼 데이터 추가
    ];

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
     // 모달 열기
     const openModal = () => {
        setIsModalOpen(true);
    };
    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const itemsPerPage = 5; // 페이지당 항목 수
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("진행중"); // 필터 상태 ("진행중" 또는 "종료")

    // 현재 필터 상태에 맞게 오디션 목록 필터링
    const filteredAuditions = auditions.filter((audition) => {
        if (filter === "진행중") {
            return audition.status === "오디션 진행중입니다";
        } else if (filter === "종료") {
            return audition.status === "종료";
        }
        return true;
    });

    // 페이지에 맞게 데이터 슬라이싱
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuditions = filteredAuditions.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredAuditions.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
    };

    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
                <Header />
            </header>

            <main id="user-wrap-body">
                <UserSidebar />
                
                <div className="audition-list-container">
                    <h1>MY 오디션 관리</h1>
                    <div className="audition-filter">
                        <button 
                            className={`filter-button ${filter === "진행중" ? 'active' : ''}`} 
                            onClick={() => handleFilterChange("진행중")}
                        >
                            진행중
                        </button>
                        <button 
                            className={`filter-button ${filter === "종료" ? 'active' : ''}`} 
                            onClick={() => handleFilterChange("종료")}
                        >
                            종료
                        </button>
                    </div>

                    <table className="audition-table">
                        <thead>
                            <tr>
                                <th>예약번호</th>
                                <th>업체명</th>
                                <th>수령일자</th>
                                <th>픽업방식</th>
                                <th>낙찰금액</th>
                                <th>진행현황</th>
                                <th>주문 상세내역</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAuditions.map((audition) => (
                                <tr key={audition.id}>
                                    <td>{audition.id}</td>
                                    <td className={audition.status === "오디션 진행중입니다" ? "status-active" : ""}>{audition.companyName}</td>
                                    <td>{audition.deliveryDate}</td>
                                    <td>{audition.pickupMethod}</td>
                                    <td>{audition.bidAmount}</td>
                                    <td>{audition.status}</td>
                                    
                                    <td>
                                    <a href={audition.orderLink} className="order-link" onClick={openModal}>주문 상세내역</a>
                                        {audition.reviewLink && (
                                            <button className="review-button">리뷰작성하러가기</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 페이지 네이션 */}
                    <div className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <footer id="user-wrap-footer">
                <Footer />
            </footer>
            {/* 모달 컴포넌트 */}
            <AppealDesignDetails isOpen={isModalOpen} onClose={closeModal}>

            </AppealDesignDetails>
        </div>
    );
};

export default UserMyAudtion;
