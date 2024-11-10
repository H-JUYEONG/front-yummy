import React from 'react';

import Header from '../include/Header';
import Footer from '../include/Footer';


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
                        <img src='../../assets/images/cake-facebook-cover-design_220346-14126.avif' alt='베너이미지' />
                    </div>
                </div>
                <div className='map-box'>
                    <div className='map-title'>
                        내위치찾기
                    </div>
                    <div className='map-img-box'>
                        <div className='map-img'>
                            좌측 맵 이미지
                        </div>
                        <div className='map-search'>
                            <div className='map-choose-category'>
                                <select id="category-select" name="category">
                                    <option value="category1">지역</option>
                                    <option value="category2">강남구</option>
                                    <option value="category3">성동구</option>
                                    <option value="category3">관악구</option>
                                </select>
                            </div>
                            <div className='map-input-category'>
                                <input type='text' placeholder='검색어를 입력해주세요!' />
                            </div>
                        </div>
                        <div className='map-click'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                    </tr>
                                    <tr>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                        <td>전체</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='category-box'>
                    카테고리공간
                </div>
                <div className='sub-title-box'>
                    <ul>
                        <li>**구 베이커리 케이크</li>
                        <li>총 상품 | 10개</li>
                    </ul>
                </div>
                <div className='allList-box'>
                    상품리스트공간 
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