import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../include/Header';
import Footer from '../include/Footer';
import '../../assets/css/user/userstoredetail.css';

const UserStoreDetail = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // 상품 데이터
    const categoryProducts = {
        '일반케잌': [
            { id: 1, image: '/images/1호_일반케이크.jpg', name: '블랙 레터링 케이크', price: '35,000원' },
            { id: 2, image: '/images/1호_일반케이크.jpg', name: '레터링 케이크', price: '45,000원' },
            { id: 3, image: '/images/1호_일반케이크.jpg', name: '생일 케이크', price: '38,000원' },
            { id: 4, image: '/images/1호_일반케이크.jpg', name: '파티 케이크', price: '42,000원' },
            { id: 5, image: '/images/1호_일반케이크.jpg', name: '생일 케이크', price: '38,000원' },
            { id: 6, image: '/images/1호_일반케이크.jpg', name: '파티 케이크', price: '42,000원' },
            { id: 7, image: '/images/1호_일반케이크.jpg', name: '생일 케이크', price: '38,000원' },
            { id: 8, image: '/images/1호_일반케이크.jpg', name: '파티 케이크', price: '42,000원' }
        ],
        '비건케잌': [
            { id: 9, image: '/images/2호_일반케이크.jpg', name: '비건 초콜릿 케이크', price: '48,000원' },
            { id: 10, image: '/images/2호_일반케이크.jpg', name: '비건 바닐라 케이크', price: '46,000원' },
            { id: 11, image: '/images/2호_일반케이크.jpg', name: '비건 생크림 케이크', price: '44,000원' },
            { id: 12, image: '/images/2호_일반케이크.jpg', name: '비건 당근 케이크', price: '42,000원' }
        ],
        '떡케잌': [
            { id: 13, image: '/images/3호_떡케이크.png', name: '떡 케이크 1호', price: '40,000원' },
            { id: 14, image: '/images/3호_떡케이크.png', name: '떡 케이크 2호', price: '50,000원' },
            { id: 15, image: '/images/3호_떡케이크.png', name: '떡 케이크 3호', price: '60,000원' },
            { id: 16, image: '/images/3호_떡케이크.png', name: '떡 케이크 4호', price: '70,000원' }
        ],
        '특별케잌': [
            { id: 17, image: '/images/3호_특별한케이크(달력).jpg', name: '포토 케이크', price: '55,000원' },
            { id: 18, image: '/images/3호_특별한케이크(달력).jpg', name: '캐릭터 케이크', price: '60,000원' },
            { id: 19, image: '/images/3호_특별한케이크(달력).jpg', name: '웨딩 케이크', price: '150,000원' },
            { id: 20, image: '/images/3호_특별한케이크(달력).jpg', name: '기업 케이크', price: '100,000원' }
        ],
        '강아지케잌': [
            { id: 21, image: '/images/강아지_미니케이크.jpg', name: '강아지 생일 케이크', price: '25,000원' },
            { id: 22, image: '/images/강아지_미니케이크.jpg', name: '강아지 파티 케이크', price: '28,000원' },
            { id: 23, image: '/images/강아지_미니케이크.jpg', name: '강아지 미니 케이크', price: '20,000원' },
            { id: 24, image: '/images/강아지_미니케이크.jpg', name: '강아지 돌잔치 케이크', price: '30,000원' }
        ]
    };

    // 전체 상품 리스트 계산
    const allProducts = Object.values(categoryProducts).flat();

    // 현재 선택된 카테고리의 상품 리스트 가져오기
    const getProducts = () => {
        if (!selectedCategory) {
            return allProducts;
        }
        return categoryProducts[selectedCategory] || [];
    };

    // 카테고리 선택 핸들러
    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);  // 같은 카테고리 클릭 시 선택 해제
        } else {
            setSelectedCategory(category);  // 다른 카테고리 선택
        }
    };

    return (
        <div id="user-wrap" className="text-center">
            <header id="user-wrap-head">
                <Header/>
            </header>

            <main id="user-wrap-body" className="clearfix">
                <section id="user-wrap-main">
                    {/* 프로필 영역 */}
                    <div className="sd-profile-container">
                        <div className="sd-profile-header">
                            <Link to="/" className="sd-back-btn">
                                <img src="/images/뒤로가기.png" alt="뒤로가기" />
                            </Link>
                            <h2 className="sd-store-name">cakefactory</h2>
                        </div>
                        <div className="sd-profile-content">
                            <div className="sd-profile-image">
                                <img src="/images/1호_일반케이크.jpg" alt="cakefactory" />
                            </div>
                            <div className="sd-profile-text">
                                <div className="sd-profile-stats">
                                    <span>게시물 24</span>
                                    <span>리뷰 128</span>
                                </div>
                                <p>🎂케이크는 맛있게</p>
                                <p>📍송파롤링스톤즈 - 송파평생학습원2층</p>
                                <p>⭐케이크 주문제작 전문, 비건케이크까지🌱</p>
                                <p>💕디자인과 맛 모두 놓치지 않는 케이크🍰</p>
                                <p>🎨캐릭터, 포토, 생화케이크는 DM문의💌</p>
                                <p>✔️주문마감 D-2</p>
                                <p>✔️11시-20시</p>
                                <p>⚡️디자인상담 1:1채팅 문의해주세요</p>
                            </div>
                        </div>
                    </div>

                    <hr className="sd-divider" />

                    {/* 카테고리 */}
                    <div className="sd-category-container">
                        {Object.keys(categoryProducts).map((category) => (
                            <div 
                                key={category}
                                className={`sd-category-item ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img 
                                    src={`/images/${
                                        category === '일반케잌' ? '1호_일반케이크.jpg' : 
                                        category === '비건케잌' ? '1호_일반케이크 1.jpg' :
                                        category === '떡케잌' ? '3호_떡케이크.png' :
                                        category === '특별케잌' ? '4호_달걀 한판 케이크.png' :
                                        '강아지_미니케이크.jpg'}`} 
                                    alt={category} 
                                />
                                <p>{category}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="sd-divider" />

                   {/* 상품 리스트 */}
<div className="sd-products-container">
    {getProducts().map((product) => (
        <Link 
            to={`/user/cakedetail`}  // 상품 ID를 사용한 동적 라우팅
            key={product.id} 
            className="sd-product-item"
        >
            <div className="sd-product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="sd-price-info">
                <p className="sd-product-name">{product.name}</p>
                <p className="sd-price">{product.price}</p>
            </div>
        </Link>
    ))}
</div>
                </section>
            </main>

            <footer className="user-full-width">
                <Footer/>
            </footer>
        </div>
    );
};

export default UserStoreDetail;