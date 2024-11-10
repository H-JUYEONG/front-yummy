import React, { useState } from 'react';
import "../../assets/css/admin/adminmemberlist.css";

const AdminMemberList = () => {
    const allMembers = [
        { uid: '12345', name: '홍길동', email: 'hong@domain.com', joinType: '이메일 가입', joinDate: '2024-01-01', status: '활성' },
        { uid: '67890', name: '김철수', email: '(카카오 계정)', joinType: '카카오 로그인', joinDate: '2024-01-02', status: '비활성' },
        { uid: '11223', name: '박영희', email: 'young@domain.com', joinType: '이메일 가입', joinDate: '2024-01-03', status: '정지' },
        // 더 많은 회원 데이터를 추가할 수 있습니다.
    ];

    const [filteredMembers, setFilteredMembers] = useState(allMembers);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // 페이징 관련 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    // 검색 필터 핸들러
    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredMembers(
            allMembers.filter(member =>
                member.uid.toLowerCase().includes(value) ||
                member.name.toLowerCase().includes(value) ||
                member.email.toLowerCase().includes(value) ||
                member.status.toLowerCase().includes(value)
            )
        );
        setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 리셋
    };



    // 페이지 이동 핸들러
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="admin-memberlist-content">
            <h2>회원 리스트</h2>

            {/* 검색 필터 */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="검색 (UID, 이름, 이메일, 상태)"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* 회원 테이블 */}
            <table className="member-table">
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>사용자명</th>
                        <th>이메일</th>
                        <th>가입 유형</th>
                        <th>가입일</th>
                        <th>계정 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.map(member => (
                        <tr key={member.uid}>
                            <td>{member.uid}</td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.joinType}</td>
                            <td>{member.joinDate}</td>
                            <td className={`status-label ${member.status}`}>
                                {member.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
        </div>
    );
};

export default AdminMemberList;