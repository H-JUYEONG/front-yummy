import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const productList = [
        { id: 1, store: "Sweet Delight", product: "초코 케이크", price: 15000, rating: 4.5, region: "강남구", category: "일반 케이크", image: "/images/doconghoa.gif" },
        { id: 2, store: "Cake House", product: "레드벨벳 케이크", price: 20000, rating: 4.8, region: "관악구", category: "도시락 케이크", image: "/images/goodcake.png"  },
        { id: 3, store: "Bake & Bite", product: "블루베리 치즈 케이크", price: 18000, rating: 4.2, region: "강서구", category: "일반 케이크", image: "/images/happy-birthday-birthday-cake.gif"  },
        { id: 4, store: "Dreamy Dessert", product: "초콜릿 무스 케이크", price: 22000, rating: 4.7, region: "동작구", category: "떡 케이크", image: "/images/peach-cat-goma.gif" },
        { id: 5, store: "Sugar Rush", product: "티라미수", price: 16000, rating: 4.6, region: "마포구", category: "일반 케이크", image: "/images/pusheen-cake.gif"  },
        { id: 6, store: "Lovely Layers", product: "스트로베리 케이크", price: 25000, rating: 4.9, region: "성동구", category: "반려동물 케이크", image: "/images/강아지_특별한케이크.jpg"  },
        { id: 7, store: "Bake Heaven", product: "카라멜 프라푸치노 케이크", price: 21000, rating: 4.3, region: "광진구", category: "도시락 케이크", image: "/images/스폰지밥 케이크.jpg"  },
        { id: 8, store: "Cake Magic", product: "라즈베리 케이크", price: 19000, rating: 4.4, region: "강남구", category: "일반 케이크", image: "/images/4호_일반케이크.jpg"  },
        { id: 9, store: "Sugar Bliss", product: "레몬 치즈 케이크", price: 17000, rating: 4.1, region: "강남구", category: "일반 케이크", image: "/images/3호_떡케이크.png"  },
        { id: 10, store: "Dessert Palace", product: "화이트 초콜릿 케이크", price: 23000, rating: 4.5, region: "서초구", category: "떡 케이크", image: "/images/강아지_미니케이크.jpg"  }
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

    const filteredProducts = productList
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

                <div className='allList-box'>
                    {filteredProducts.map((item) => (
                        <div className="all-product-item" key={item.id}>
                            {/* 상품 이미지 클릭 시 링크 추가 */}
                            <Link to="/user/cakedetail/21" className="list_hover_img">
                                <img src={item.image} alt={item.product} /> {/* 각 상품의 이미지 */}
                                <div className="store-info">
                                    {/* 업체 로고와 업체명 클릭 시 /user/storedetail로 이동 */}
                                    <Link to="/user/storedetail">
                                        <img src={storeLogo} alt="매장 로고 이미지" className="store-logo" />
                                    </Link>
                                    <Link to="/user/storedetail">
                                        <b>{item.store}</b>
                                    </Link>
                                </div>
                            </Link>

                            {/* 상품명 클릭 시 링크 추가 */}
                            <div className="product-info">
                                <Link to="/user/cakedetail">
                                    <p>{item.product}</p>
                                </Link>
                                <p>가격: {item.price.toLocaleString()}원</p>
                                <p>평점: {renderStars(item.rating)} ({item.rating})</p>
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
