import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/admin/adminCompanyList.css";

const AdminCompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // currentPage 상태 추가
    const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수 정의
    const seoulDistricts = ["강남구", "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"];
    const [mapMessage, setMapMessage] = useState("주소를 클릭하세요");
    //지도
    const KAKAOMAP = process.env.REACT_APP_MAP_REST_API_KEY
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/venders`)
            .then(response => {
                setCompanies(response.data);
                console.log("~~~~~`" + response.data[0])
            })
            .catch(error => {
                alert("데이터를 불러오는 중 문제가 발생했습니다.");
                console.error("Error fetching companies:", error);
            });
    }, []);

    //업체 지도
    const handleMap = (company) => {
        setLatitude(company.latitude)
        setLongitude(company.longitude)

        // 메시지 숨김 처리
        setMapMessage("");

        if (longitude, latitude) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false`; // 여기에 발급받은 카카오 API 키 입력
            script.async = true;
            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map'); // 지도 표시할 DOM 요소
                    const options = {
                        center: new window.kakao.maps.LatLng(latitude, longitude), // DB에서 가져온 위도, 경도를 지도 중심으로 설정
                        level: 3, // 줌 레벨 (3: 보통, 1: 가까운 거리, 14: 더 멀리)
                    };

                    const map = new window.kakao.maps.Map(container, options); // 지도 객체 생성

                    // 마커 생성
                    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });
                    marker.setMap(map); // 지도에 마커 표시
                });
            };
            document.body.appendChild(script); // script 태그로 카카오맵 API 로드
        }
        return () => {
            const scriptTag = document.querySelector(`script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false"]`);
            if (scriptTag) {
                document.body.removeChild(scriptTag); // 컴포넌트가 언마운트 될 때 script 태그를 제거
            }
        };
    }

    // 필터링 로직
    const filteredCompanies = companies.filter(company => {
        const address = company.venderAddress || ""; // null 방지
        const name = company.venderName || ""; // null 방지

        return (
            (selectedRegion === "전체" || address.includes(selectedRegion)) &&
            (searchQuery === "" || name.includes(searchQuery) || address.includes(searchQuery))
        );
    });

    // 페이징 관련 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    // 페이지 이동 핸들러
    const goToPage = (page) => {
        setCurrentPage(page);
    };




    return (
        <div className="admin-companylist-content">
            <h2>업체 관리</h2>

            <div className="filter-section">
                <div className="map-placeholder" id="map">
                    {mapMessage && <p className="map-message">{mapMessage}</p>}
                </div>
                <div className="region-filter">
                    <div className="region-buttons">
                        {["전체", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"].map(region => (
                            <button
                                key={region}
                                className={`region-button ${selectedRegion === region ? "active" : ""}`}
                                onClick={() => {
                                    setSelectedRegion(region);
                                    setCurrentPage(1); // 지역 변경 시 첫 페이지로 리셋
                                }}
                            >
                                {region}
                            </button>
                        ))}
                    </div>

                    {/* 서울시가 선택된 경우 구 목록 표시 */}
                    {selectedRegion === "서울" && (
                        <div className="district-buttons">
                            {seoulDistricts.map(district => (
                                <button
                                    key={district}
                                    className={`region-button ${selectedRegion === district ? "active" : ""}`}
                                    onClick={() => {
                                        setSelectedRegion(district);
                                        setCurrentPage(1); // 구 변경 시 첫 페이지로 리셋
                                    }}
                                >
                                    {district}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="업체명 또는 주소로 검색"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // 검색어 변경 시 첫 페이지로 리셋
                            }}
                        />
                        <button onClick={() => setCurrentPage(1)}>검색</button>
                    </div>
                </div>
            </div>

            <table className="company-table">
                <thead>
                    <tr>
                        <th>업체번호</th>
                        <th>업체명</th>
                        <th>주소</th>
                        <th>사업자 번호</th>
                        <th>대표자 이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCompanies.map((company, index) => (
                        <tr key={index} onClick={() => { handleMap(company) }}>
                            <td>{company.venderId}</td>
                            <td>{company.venderName}</td>
                            <td className="clickable-address">{company.venderAddress}</td>
                            <td>{company.venderNumber}</td>
                            <td>{company.representativeName}</td>
                            <td>{company.email}</td>
                            <td>{company.phoneNumber}</td>
                            <td>{company.createdAt}</td>
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

export default AdminCompanyList;
