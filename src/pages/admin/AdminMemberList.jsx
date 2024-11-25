import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/admin/adminmemberlist.css";

const AdminMemberList = () => {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/members`)
            .then((response) => {
                console.log(response.data); // 데이터 확인
                setMembers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
                setLoading(false);
            });
    }, []);

    const filteredMembers = members.filter((member) =>
        member.uid.includes(searchTerm) ||
        member.name.includes(searchTerm) ||
        member.email.includes(searchTerm) ||
        member.status.includes(searchTerm)
    );


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const goToPage = (page) => setCurrentPage(page);

    if (loading) {
        return <p>데이터를 불러오는 중...</p>;
    }
    return (
        <div className="admin-memberlist-content">
            <h2>회원 리스트</h2>
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="검색 (UID, 이름, 이메일, 상태)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
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
                            <td>{member.status === "1" ? "활성" : "비활성"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
