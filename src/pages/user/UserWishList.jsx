import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import UserSidebar from '../../pages/user/include/UserSidebar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userwishlist.css';
import Header from '../include/Header';
import Footer from '../include/Footer';

const UserWishList = () => {
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');

    // 카테고리 옵션
    const styleOptions = ['귀여운', '화려한', '아기자기한', '만화같은', '웃긴', '깔끔한'];
    const targetOptions = ['친구생일', '웃어른생신', '애기 생일', '기념일', '파티'];

    // 샘플 상품 데이터
    const products = [
        {
            id: 1,
            image: '/images/2호_일반케이크.jpg',
            name: '초코 케이크 A',
            price: '60,000원',
            style: '만화같은',
            target: '친구생일'
        },
        {
            id: 2,
            image: '/images/4호_골프장 케이크.png',
            name: '초코 케이크 A',
            price: '40,000원',
            style: '화려한',
            target: '친구생일'
        },
        {
            id: 3,
            image: '/images/4호_달걀 한판 케이크.png',
            name: '초코 케이크 A',
            price: '60,000원',
            style: '귀여운',
            target: '친구생일'
        },
        {
            id: 4,
            image: '/images/3호_특별한케이크(달력).jpg',
            name: '초코 케이크 A',
            price: '60,000원',
            style: '귀여운',
            target: '친구생일'
        },
        // ... 더 많은 상품 데이터
    ];

    // 스타일 카테고리 선택/해제 핸들러
    const handleStyleSelect = (style) => {
        setSelectedStyle(prevStyle => prevStyle === style ? '' : style);
    };

    // 대상 카테고리 선택/해제 핸들러
    const handleTargetSelect = (target) => {
        setSelectedTarget(prevTarget => prevTarget === target ? '' : target);
    };

    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
                <Header />
            </header>

            <main id="user-wrap-body">
                <UserSidebar />
                <section id="user-wrap-main">
                    <h2>찜한 상품</h2>
                    <div className="wishlist-container">
                        {/* 검색 바 */}
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="찜한 상품 검색"
                                className="search-input"
                            />
                            <button className="search-button">
                                <Search size={20} />
                            </button>
                        </div>

                        {/* 카테고리 필터 */}
                        <div className="category-filters">
                            <div className="filter-group">
                                <h3>스타일</h3>
                                <div className="filter-options">
                                    {styleOptions.map((style) => (
                                        <button
                                            key={style}
                                            className={`filter-btn ${selectedStyle === style ? 'active' : ''}`}
                                            onClick={() => handleStyleSelect(style)}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-group">
                                <h3>대상</h3>
                                <div className="filter-options">
                                    {targetOptions.map((target) => (
                                        <button
                                            key={target}
                                            className={`filter-btn ${selectedTarget === target ? 'active' : ''}`}
                                            onClick={() => handleTargetSelect(target)}
                                        >
                                            {target}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 상품 그리드 - 필터링 적용 */}
                        <div className="products-grid">
                            {products
                                .filter(product =>
                                    (!selectedStyle || product.style === selectedStyle) &&
                                    (!selectedTarget || product.target === selectedTarget)
                                )
                                .map((product) => (
                                    <Link
                                        to={`/user/cakedetail`}
                                        key={product.id}
                                        className="product-card"
                                    >
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p>{product.price}</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>

                       

                        {/* 페이지네이션 */}
                        <div className="pagination">
                            <button className="prev-page">{'<'}</button>
                            <div className="page-numbers">
                                {[1, 2, 3, '...', 67, 68].map((page, index) => (
                                    <button
                                        key={index}
                                        className={`page-number ${page === 1 ? 'active' : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button className="next-page">{'>'}</button>
                        </div>
                    </div>
                </section>
            </main>

            <footer id="user-wrap-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default UserWishList;
