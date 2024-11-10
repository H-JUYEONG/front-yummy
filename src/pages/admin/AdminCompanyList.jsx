import React, { useState } from 'react';
import "../../assets/css/admin/adminCompanyList.css";

const AdminCompanyList = () => {
    const [selectedRegion, setSelectedRegion] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");

    const companies = [
        { name: "케이크 공방 A", address: "경기 부천시 부흥로 258", businessNumber: "123-45-67890", manager: "김철수", email: "cakea@gmail.com", phone: "031-123-4567", joinDate: "2024-01-15" },
        { name: "베이커리 B", address: "서울 강남구 상대로 123", businessNumber: "987-65-43210", manager: "이영희", email: "bakeryb@gmail.com", phone: "02-345-6789", joinDate: "2024-02-01" }
    ];

    const filteredCompanies = companies.filter(company =>
        (selectedRegion === "전체" || company.address.includes(selectedRegion)) &&
        (searchQuery === "" || company.name.includes(searchQuery))
    );

    const handleSearch = () => {
        // 검색 기능 로직 (필요시 추가)
    };

    return (
        <div className="admin-company-list-container">
            <h2>업체 관리</h2>
            
            <div className="filter-section">
                <div className="map-placeholder">
                    {/* 지도 이미지가 들어갈 자리 */}
                </div>
                
                <div className="region-filter">
                    <div className="region-buttons">
                        {["전체", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"].map(region => (
                            <button
                                key={region}
                                className={`region-button ${selectedRegion === region ? "active" : ""}`}
                                onClick={() => setSelectedRegion(region)}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                    
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="업체명으로 검색"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </div>
                </div>
            </div>
            
            <table className="company-table">
                <thead>
                    <tr>
                        <th>업체명</th>
                        <th>주소</th>
                        <th>사업자 번호</th>
                        <th>담당자 이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.map((company, index) => (
                        <tr key={index}>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>{company.businessNumber}</td>
                            <td>{company.manager}</td>
                            <td>{company.email}</td>
                            <td>{company.phone}</td>
                            <td>{company.joinDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCompanyList;
