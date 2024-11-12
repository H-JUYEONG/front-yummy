import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from './include/Header';
import Footer from './include/Footer';
import RightNavbar from './include/RightNavbar'; // 새로 만든 RightNavbar 컴포넌트 임포트
import bannerOne from '../../assets/images/cake-facebook-cover-design_220346-14126.avif';
import mapImg from '../../assets/images/map_0.png';
import cakeImg from '../../assets/images/download.jfif';


import '../../assets/css/user/userMainForm.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const UserMainForm = () => {
    const navigate = useNavigate();
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

    return (
        <div id="user-wrap" className="text-center userMainFformContainer">
            {/* Header */}
            <header id="user-wrap-head">
                <Header />
            </header>
            {/* Right Navbar */}
            <RightNavbar />
            <div className='main-wrap'>
                <div className='banner-box'>
                    <div className="banner-txt">
                    </div>
                    <div className='banner-img'>
                        <img src={bannerOne} alt='베너이미지' />
                    </div>
                </div>
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
                    {mapList.map((item, idx) => (
                        <div className="all-product-item">
                            <div className="list_hover_img">
                                <img src={cakeImg} />
                            </div>
                            <div className="allList-item">

                                <div className='userMain-product-img'>
                                    <img src={cakeImg} />
                                </div>
                                <b onClick={() => navigate("/user/storedetail")}>업체명</b>
                                <p className='userMain-product-name' onClick={() => navigate("/user/cakedetail")}>상품 1 *클릭해주세요*</p>
                                <p>30,000 원</p> 
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