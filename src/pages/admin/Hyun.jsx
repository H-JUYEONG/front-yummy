import React, { useState, useEffect } from 'react';
import './hyun.css';
import Header from "../user/include/Header";

const Banner = () => (
    <div className="banner">
        <h1>케이크 오디션</h1>
        <p>당신만의 특별한 순간을 케이크로 만들어 드립니다</p>
        <button className="create-cake-btn">Let's GO</button>
    </div>
);

const Hyun = () => {
    const [userRegion, setUserRegion] = useState("전체");
    const [searchText, setSearchText] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [bakeries, setBakeries] = useState([
        { id: 1, title: "서울 강남 케이크샵", description: "서울 강남에서 가장 인기 있는 케이크", region: "서울", district: "강남구", imageUrl: "/images/1호_일반케이크.jpg" },
        { id: 2, title: "서울 마포 케이크샵", description: "서울 마포구 최고의 케이크", region: "서울", district: "마포구", imageUrl: "/images/3호_떡케이크.png" },
        { id: 3, title: "대구 스위트 케이크", description: "대구에서 사랑받는 케이크", region: "대구", imageUrl: "/images/강아지_미니케이크.jpg" },
        { id: 4, title: "인천 베이커리", description: "인천에서 인기 있는 케이크 베이커리", region: "인천", imageUrl: "/images/강아지_특별한케이크.jpg" },
        { id: 5, title: "광주 디저트샵", description: "광주 최고의 케이크와 디저트", region: "광주", imageUrl: "/images/1호_일반케이크.jpg" },
        { id: 6, title: "서울 마카롱 전문점", description: "서울에서 맛있는 마카롱과 케이크", region: "서울", imageUrl: "/images/1호_일반케이크.jpg" },
        { id: 7, title: "제주 케이크 하우스", description: "제주에서 가장 유명한 케이크", region: "제주도", imageUrl: "/images/1호_일반케이크.jpg" },
        { id: 8, title: "부산 케이크스튜디오", description: "부산에서 특별한 케이크", region: "부산", imageUrl: "/images/1호_일반케이크.jpg" },
    ]);
    const [filteredBakeries, setFilteredBakeries] = useState(bakeries);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserRegion("서울");
                filterBakeriesByRegion("서울");
            },
            (error) => {
                console.error(error);
                setUserRegion("전체");
            }
        );
    }, []);

    const filterBakeriesByRegion = (region) => {
        setUserRegion(region);
        const filtered = bakeries.filter((bakery) => bakery.region === region || region === "전체");
        setFilteredBakeries(filtered);
    };
    const [selectedDistrict, setSelectedDistrict] = useState("전체");
    const districtsByRegion = {
        "서울": ["전체", "강남구", "마포구", "서초구"],
        "부산": ["전체", "해운대구", "부산진구"],
        // 다른 지역 구 추가...
    };
    const filterBakeriesByDistrict = (district) => {
        setSelectedDistrict(district);
        const filtered = bakeries.filter(
            (bakery) =>
                (bakery.region === userRegion || userRegion === "전체") &&
                (bakery.district === district || district === "전체")
        );
        setFilteredBakeries(filtered);
    };

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        setIsScrolled(true);
    };

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className="hyun-main-page">
            <Header />
            <div className={`banner ${isScrolled ? "hidden" : ""}`}>
                <Banner onScroll={handleScroll} />
            </div>
            {/* 내 케이크 찾기 섹션 */}
            
            <section className={`search-section ${isScrolled ? "visible" : ""}`}>
                <div className="filter-buttons">
                    {["전체", "서울", "부산", "대구", "인천", "광주", "제주도"].map((region) => (
                        <button
                            key={region}
                            className={`filter-button ${userRegion === region ? "active" : ""}`}
                            onClick={() => { filterBakeriesByRegion(region); setSelectedDistrict("전체"); }}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* 구 필터링 버튼 */}
                {userRegion === "서울" && (
                    <div className="filter-buttons">
                        {districtsByRegion[userRegion].map((district) => (
                            <button
                                key={district}
                                className={`filter-button ${selectedDistrict === district ? "active" : ""}`}
                                onClick={() => filterBakeriesByDistrict(district)}
                            >
                                {district}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* 베이커리 리스트 */}
            <section className="bakery-list-section">
                <h2>{userRegion} 베이커리</h2>
                <p>총 상품 {filteredBakeries.length}개</p>
                <div className="bakery-grid">
                    {filteredBakeries.map((bakery) => (
                        <div className="bakery-item" key={bakery.id}>
                            <div className="bakery-image" style={{ backgroundImage: `url(${bakery.imageUrl})` }}></div>
                            <h3 className="bakery-title">{bakery.title}</h3>
                            <p className="bakery-description">{bakery.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hyun;
