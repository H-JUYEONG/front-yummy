import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/productlist.css';

import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';

const VenderProductList = () => {
    const navigate = useNavigate();
    const itemsPerPage = 5; // 페이지당 아이템 수 설정
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // 상품 리스트 데이터 예시
    const [products, setProducts] = useState([
        { name: '초콜릿 케이크', type: '일반 케이크', price: '30,000원', description: '촉촉, 풍부한 초콜릿 맛', status: '노출' },
        { name: '바닐라 생크림 케이크', type: '생크림 케이크', price: '32,000원', description: '부드러운 생크림, 클래식한 맛', status: '임시저장' },
        { name: '바닐라 비건 케이크', type: '비건 케이크', price: '32,000원', description: '부드러운 비건 생크림, 클래식한 맛', status: '미노출' },
        // ... 더 많은 상품 데이터 추가 가능
    ]);

    // 검색어에 따라 필터링된 상품 리스트
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 현재 페이지에 맞는 데이터 가져오기
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 수 계산
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // 상품 노출 상태 변경 함수
    const toggleProductStatus = (productIndex) => {
        setProducts(prevProducts => {
            // 원래 products 배열에서 인덱스 기반으로 변경
            const updatedProducts = prevProducts.map((product, index) => {
                if (index === productIndex) {
                    return {
                        ...product,
                        status: product.status === '노출' ? '미노출' : '노출'
                    };
                }
                return product;
            });
            return updatedProducts;
        });
    };

    return (
        <>
            <div className="vender-container">
                <div class="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <header className="vender-header ">
                            <VenderHeader />
                        </header>
                        <main className="product-list-main-content">
                            <section className="product-list">
                                <header className="product-list-header">
                                    <h2 className="product-list-title">상품 리스트</h2>
                                    <div className="button-group">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder="상품명 검색하기"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button className="add-button" onClick={() => navigate('/vender/option')}>
                                            옵션등록하기
                                        </button>
                                        <button className="add-button" onClick={() => navigate('/vender/cakeDesign/add')}>
                                            도안등록하기
                                        </button>
                                        <button className="add-button" onClick={() => navigate('/vender/registrationform')}>
                                            상품등록하기
                                        </button>
                                    </div>
                                </header>
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th>상품명</th>
                                            <th>상품종류</th>
                                            <th>가격</th>
                                            <th>설명</th>
                                            <th>상태</th>
                                            <th>관리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>{product.type}</td>
                                                <td>{product.price}</td>
                                                <td>{product.description}</td>
                                                <td>
                                                    <button
                                                        className={`status-button ${product.status === '노출' ? 'visible' : 'hidden'}`}
                                                        onClick={() => toggleProductStatus(indexOfFirstItem + index)}
                                                    >
                                                        {product.status}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="edit-button" onClick={() => navigate('/vender/registrationform')}>수정</button>
                                                    <button className="delete-button">삭제</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* 페이징 네비게이션 */}
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenderProductList;
