import React from 'react';
import { Link } from 'react-router-dom';

import Header from './include/Header';
import Footer from './include/Footer';

import bannerOne from '../../assets/images/cake-facebook-cover-design_220346-14126.avif';
import mapImg from '../../assets/images/map_0.png';
import cakeImg from '../../assets/images/download.jfif';


import '../../assets/css/user/userMainForm.css';


const UserMainForm= () => {
    return (
        <div id="user-wrap" className="text-center">
            {/* Header */}
            <header id="user-wrap-head">
                <Header/>
            </header>

            <div className='main-wrap'>
                <div className='banner-box'>
                    <div className='banner-img'>
                        <img src={bannerOne} alt='베너이미지' />
                    </div>
                </div>
                <div className='map-box'>
                    <div className='map-title'>
                        내위치찾기
                        <div className='userMain-map-search'>
                            <select id="category-select" name="category">
                                <option value="category1">지역</option>
                                <option value="category2">강남구</option>
                                <option value="category3">성동구</option>
                                <option value="category3">관악구</option>
                            </select>
                            <input type='text' placeholder='검색어를 입력해주세요!' />
                        </div>
                    </div>
                    <div className='map-img-box'>
                        <div className='map-img'>
                            <img src={mapImg} />
                        </div>
                        <div className='map-click'>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                        </tr>
                                        <tr>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                        </tr>
                                        <tr>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                        </tr>
                                        <tr>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                            <td>강남구</td>
                                            <td>관악구</td>
                                            <td>강서구</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                </div>
                <div className='category-box'>
                    <ul>
                        <li><button>카테고리 | </button></li>
                        <li><button>전체</button></li>
                        <li><button>도시락 케이크</button></li>
                        <li><button>일반 케이크</button></li>
                        <li><button>떡 케이크</button></li>
                        <li><button>반려동물 케이크</button></li>
                    </ul>
                </div>
                <div className='sub-title-box'>
                    <ul>
                        <li>**구 베이커리 케이크</li>
                        <li>총 상품 | 10개</li>
                    </ul>
                </div>
                <div className='allList-box'>
                    <div className='userMain-product-img'>
                        <img src={cakeImg} />
                    </div>
                    <Link to="/user/cakedetail" >상품 1 *클릭해주세요*</Link> 
                </div>
                

            </div>

            {/* Footer */}
            <footer className="user-full-width">
                <Footer/>
            </footer>
        </div>
    );
};
export default UserMainForm;