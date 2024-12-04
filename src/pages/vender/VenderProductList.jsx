import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/productlist.css';
import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';

const VenderProductList = () => {
    const navigate = useNavigate();
    const itemsPerPage = 5; // 페이지당 아이템 수 설정
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [products, setProducts] = useState([]); // 서버에서 받아온 상품 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기

    // 상품 데이터 불러오기
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
                    params: { venderId },
                });
                setProducts(response.data); // API 응답 데이터를 상태로 저장
            } catch (err) {
                console.error('데이터를 불러오는 중 오류 발생:', err);
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [venderId]);

    // 검색어에 따라 필터링된 상품 리스트
    const filteredProducts = products.filter(
        product => product && product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 현재 페이지에 맞는 데이터 가져오기
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 네비게이션 로직
    const maxPageNumbersToShow = 10; // 한 번에 표시할 페이지 번호 수
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // 전체 페이지 수 계산
    const currentGroup = Math.ceil(currentPage / maxPageNumbersToShow); // 현재 그룹 계산
    const startPage = (currentGroup - 1) * maxPageNumbersToShow + 1; // 현재 그룹의 시작 페이지
    const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages); // 현재 그룹의 끝 페이지
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    // 상품 노출 상태 변경 함수
    const toggleProductStatus = async (productId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${productId}/toggle-visibility`);
            if (response.status === 200) {
                // API 응답에 따라 상태 업데이트
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.productId === productId
                            ? { ...product, isVisible: product.isVisible === 1 ? 0 : 1 }
                            : product
                    )
                );
            }
        } catch (err) {
            console.error('상품 상태 변경 중 오류 발생:', err);
            alert('상품 상태 변경 중 오류가 발생했습니다.');
        }
    };

    // 상품 삭제 함수
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${productId}/mark-deleted`);
            if (response.status === 200) {
                setProducts(prevProducts =>
                    prevProducts.filter(product => product.productId !== productId)
                );
                alert('상품이 삭제 상태로 변경되었습니다.');
            } else {
                alert('삭제 상태로 변경할 수 없습니다.');
            }
        } catch (err) {
            console.error('상품 삭제 상태 변경 중 오류 발생:', err);
            alert('상품 삭제 상태 변경 중 오류가 발생했습니다.');
        }
    };

    return (

            <div className="vender-container">
                <div className="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <header className="vender-header">
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

                                {loading ? (
                                    <div>로딩 중...</div>
                                ) : error ? (
                                    <div className="error-message">{error}</div>
                                ) : (
                                    <>
                                        <table className="product-table">
                                            <thead>
                                                <tr>
                                                    <th>상품명</th>
                                                    <th>가격</th>
                                                    <th>상태</th>
                                                    <th>관리</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentProducts.map(product => (
                                                    <tr key={product.productId}>
                                                        <td>{product.productName}</td>
                                                        <td>{product.price.toLocaleString()} 원</td>
                                                        <td>
                                                            <button
                                                                className={`status-button ${product.isVisible === 1 ? 'visible' : 'hidden'
                                                                    }`}
                                                                onClick={() => toggleProductStatus(product.productId)}
                                                            >
                                                                {product.isVisible === 1 ? '노출' : '미노출'}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="edit-button"
                                                                onClick={() => navigate(`/vender/registrationformedit/${product.productId}`)}
                                                            >
                                                                수정
                                                            </button>
                                                            <button
                                                                className={`delete-button ${product.isVisible === 0 ? '' : 'disabled'}`}
                                                                onClick={() => product.isVisible === 0 && deleteProduct(product.productId)}
                                                                disabled={product.isVisible !== 0}
                                                            >
                                                                삭제
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* 페이징 네비게이션 */}
                                        <div className="pagination">
                                            {/* 이전 그룹 버튼 */}
                                            {startPage > 1 && (
                                                <button onClick={() => setCurrentPage(startPage - 1)}>이전</button>
                                            )}

                                            {/* 현재 그룹의 페이지 번호 */}
                                            {pageNumbers.map((pageNumber) => (
                                                <button
                                                    key={pageNumber}
                                                    className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            ))}

                                            {/* 다음 그룹 버튼 */}
                                            {endPage < totalPages && (
                                                <button onClick={() => setCurrentPage(endPage + 1)}>다음</button>
                                            )}
                                        </div>

                                    </>
                                )}
                            </section>
                        </main>
                    </div>
                </div>
            </div>

    );
};

export default VenderProductList;
