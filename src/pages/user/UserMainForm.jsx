import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from './include/Header';
import Footer from './include/Footer';

import mapImg from '../../assets/images/map_0.png';
import storeLogo from '../../assets/images/cake-logo1.png'; // 매장 로고 이미지
import '../../assets/css/user/userMainForm.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const UserMainForm = () => {
    const navigate = useNavigate();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("rating");
    const [sortDirection, setSortDirection] = useState("desc");
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        window.scrollTo(0, 0);

        // 상품 데이터를 가져오는 API 호출
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/allList`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    const Banner = () => (
        <div className="banner">
            <h1>세상에 하나뿐인 케이크</h1>
            <p>당신만의 특별한 순간을 케이크로 만들어 드립니다</p>
            <button className="create-cake-btn" onClick={() => navigate('/user/audition')}>Let's GO</button>
        </div>
    );

    const mapList = [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구",
        "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구",
        "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구",
        "은평구", "종로구", "중구", "중랑구"
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <>
                {Array(fullStars).fill('★').map((star, index) => (
                    <span key={`full-${index}`} style={{ color: '#FFD700' }}>{star}</span>
                ))}
                {Array(emptyStars).fill('☆').map((star, index) => (
                    <span key={`empty-${index}`} style={{ color: '#FFD700' }}>{star}</span>
                ))}
            </>
        );
    };

    const filteredProducts = products
        .filter((product) => {
            return (
                (selectedRegion ? product.region === selectedRegion : true) &&
                (selectedCategory ? product.category === selectedCategory : true)
            );
        })
        .sort((a, b) => {
            if (sortOrder === "rating") {
                return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating;
            } else if (sortOrder === "price") {
                return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
            }
            return 0;
        });

    const handleSort = (order) => {
        if (sortOrder === order) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortOrder(order);
            setSortDirection("desc");
        }
    };

    return (
        <div id="user-wrap" className="text-center userMainFormContainer">
            <header id="user-wrap-head">
                <Header />
            </header>
            <div className="banner">
                <Banner />
            </div>
            <div className='main-wrap'>
                <div className='map-box aos-init' data-aos="fade-up" data-aos-duration="1500">
                    <h3 className="sy-user-main-title">내 위치 찾기</h3>
                    <div className='map-img-box'>
                        <div className='map-img'>
                            <img src={mapImg} alt="지도" />
                        </div>
                        <div className="map-click">
                            <button
                                className={!selectedRegion ? "active" : ""}
                                onClick={() => setSelectedRegion("")}
                            >
                                전체
                            </button>
                            {mapList.map((region) => (
                                <button
                                    key={region}
                                    className={selectedRegion === region ? "active" : ""}
                                    onClick={() => setSelectedRegion(region)}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='category-box'>
                    <ul>
                        <li><button onClick={() => setSelectedCategory("")}>전체</button></li>
                        <li><button onClick={() => setSelectedCategory("도시락 케이크")}>도시락 케이크</button></li>
                        <li><button onClick={() => setSelectedCategory("일반 케이크")}>일반 케이크</button></li>
                        <li><button onClick={() => setSelectedCategory("떡 케이크")}>떡 케이크</button></li>
                        <li><button onClick={() => setSelectedCategory("반려동물 케이크")}>반려동물 케이크</button></li>
                    </ul>
                </div>

                <div className='sub-title-box'>
                    <h3 className="sy-user-main-title">{selectedRegion || "전체 지역"} {selectedCategory || "모든 카테고리"} 케이크</h3>
                    <div className='sort-box'>
                        <button onClick={() => handleSort("rating")}>
                            별점순 {sortOrder === "rating" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                        </button>
                        <button onClick={() => handleSort("price")}>
                            가격순 {sortOrder === "price" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                        </button>
                    </div>
                    <span>총 상품 | {filteredProducts.length}개</span>
                </div>

                <div className="allList-box">
                    {filteredProducts.map((item) => (
                        <div className="all-product-item" key={item.productId}>
                            <Link to={`/user/cakedetail/${item.productId}`} className="list_hover_img">
                                <img src={item.productImage1Url} alt={item.productName} />
                                <div className="store-info">
                                    {/* 매장 로고 */}
                                    <Link to={`/user/storedetail/${item.venderId}`}>
                                        <img
                                            src={item.venderProfileImageUrl || storeLogo}
                                            alt={`${item.venderName} 로고`}
                                            className="store-logo"
                                        />
                                    </Link>
                                    {/* 매장 이름 */}
                                    <Link to={`/user/storedetail/${item.venderId}`}>
                                        <b>{item.venderName}</b>
                                    </Link>
                                </div>
                            </Link>
                            <div className="product-info">
                                <Link to={`/user/cakedetail/${item.productId}`}>
                                    <p>{item.productName}</p>
                                </Link>
                                <p>가격: {item.price.toLocaleString()}원</p>
                                <p>평점: {renderStars(item.reviewRating)} ({item.reviewRating})</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default UserMainForm;
