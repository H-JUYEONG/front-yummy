import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from './include/Header';
import Footer from './include/Footer';

import mapImg from '../../assets/images/map_0.png';
import cakeImg from '../../assets/images/download.jfif';

import '../../assets/css/user/userMainForm.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Banner = () => (
    <div className="banner">
        <h1>세상에 하나뿐인 케이크</h1>
        <p>당신만의 특별한 순간을 케이크로 만들어 드립니다</p>
        <button className="create-cake-btn">Let's GO</button>
    </div>
);

const UserMainForm = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const mapList = [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구"
    ];
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        setIsScrolled(true);
    };
    const productList = [
        { id: 1, store: "Sweet Delight", product: "초코 케이크", price: 15000, rating: 4.5 },
        { id: 2, store: "케이크하우스", product: "레드벨벳 케이크", price: 20000, rating: 4.8 },
        { id: 3, store: "Bake & Bite", product: "블루베리 치즈 케이크", price: 18000, rating: 4.2 },
        { id: 4, store: "Dreamy Dessert", product: "초콜릿 무스 케이크", price: 22000, rating: 4.7 },
        { id: 5, store: "Sugar Rush", product: "티라미수", price: 16000, rating: 4.6 },
        { id: 6, store: "Lovely Layers", product: "스트로베리 케이크", price: 25000, rating: 4.9 },
        { id: 7, store: "베이크헤븐", product: "카라멜 프라푸치노 케이크", price: 21000, rating: 4.3 },
        { id: 8, store: "Cake Magic", product: "라즈베리 케이크", price: 19000, rating: 4.4 },
        { id: 9, store: "Sugar Bliss", product: "레몬 치즈 케이크", price: 17000, rating: 4.1 },
        { id: 10, store: "Dessert Palace", product: "화이트 초콜릿 케이크", price: 23000, rating: 4.5 }
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // 가득 찬 별의 개수
        const emptyStars = 5 - fullStars; // 빈 별의 개수

        return (
            <>
                {Array(fullStars).fill('★').map((star, index) => (
                    <span key={`full-${index}`} style={{ color: '#FFD700' }}>{star}</span> // 가득 찬 별
                ))}
                {Array(emptyStars).fill('☆').map((star, index) => (
                    <span key={`empty-${index}`} style={{ color: '#FFD700' }}>{star}</span> // 빈 별
                ))}
            </>
        );
    };
    return (
        <div id="user-wrap" className="text-center userMainFormContainer">
            {/* Header */}
            <header id="user-wrap-head">
                <Header />
            </header>
            <div className={`banner ${isScrolled ? "hidden" : ""}`}>
                <Banner onScroll={handleScroll} />
            </div>
            <div className='main-wrap'>
                <div className='map-box aos-init' data-aos="fade-up" data-aos-duration="1500">
                    <h3 className="sy-user-main-title">내위치찾기</h3>
                    <div className='map-img-box'>
                        <div className='map-img'>
                            <img src={mapImg} />
                        </div>
                        <div className="map-con">
                            <div className='userMain-map-search'>
                                <select id="category-select" name="category">
                                    <option value="category1">지역</option>
                                    <option value="category2">강남구</option>
                                    <option value="category3">성동구</option>
                                    <option value="category3">관악구</option>
                                </select>
                                <input type='text' placeholder='검색어를 입력해주세요!' />
                            </div>
                            <div className='map-click'>
                                {mapList.map((item, idx) => (
                                    <button type="button">{item}</button>
                                ))}
                            </div>


                        </div>


                    </div>
                </div>
                <div className='category-box'>
                    <ul>
                        <li><button>전체</button></li>
                        <li><button>도시락 케이크</button></li>
                        <li><button>일반 케이크</button></li>
                        <li><button>떡 케이크</button></li>
                        <li><button>반려동물 케이크</button></li>
                    </ul>
                </div>
                <div className='sub-title-box'>
                    <h3 className="sy-user-main-title">강남구 베이커리 케이크</h3>
                    <span>총 상품 | 10개</span>
                </div>
                <div className='allList-box'>
                    {productList.map((item) => (
                        <div className="all-product-item" key={item.id}>
                            <div className="list_hover_img">
                                <img src={cakeImg} alt={item.product} />
                            </div>
                            <div className="allList-item">
                                <div className='userMain-product-img'>
                                    <img src={cakeImg} alt="상품 이미지" />
                                </div>
                                <b onClick={() => navigate("/user/storedetail")}>{item.store}</b>
                                <p onClick={() => navigate("/user/cakedetail")}>{item.product}</p>
                                <p>가격: {item.price.toLocaleString()}원</p>
                                <p>평점: {renderStars(item.rating)} ({item.rating})</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Footer */}
            <footer className="user-full-width">
                <Footer />
            </footer>
        </div>
    );
};
export default UserMainForm;