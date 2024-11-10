import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/admin/adminshopproduct.css";
import AdminSidebar from './include/AdminSidebar';

const AdminShopProduct = () => {
    // 상품 데이터 초기화
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "밀가루 (1kg)",
            category: "기본 재료",
            price: "5,000원",
            stock: 100
        },
        {
            id: 2,
            name: "설탕 (500g)",
            category: "기본 재료",
            price: "2,000원",
            stock: 200
        }
    ]);

    // 삭제 버튼 클릭 시 상품 삭제 처리
    const handleDelete = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    // 상품 판매 시 재고 감소 처리
    const handleSell = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id && product.stock > 0
                    ? { ...product, stock: product.stock - 1 }
                    : product
            )
        );
    };

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="admin-shopproduct-page">
                <header className="admin-shopproduct-header">
                    <h1>쇼핑몰 상품 관리</h1>
                </header>

                <section>
                    <button className="add-product-button" onClick={() => navigate('/admin/shopproductsdetail')}>새 재료 등록하기</button>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>카테고리</th>
                                <th>가격</th>
                                <th>재고</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock > 0 ? `${product.stock}개` : "품절"}</td>
                                    <td>
                                        <button className="edit-button">수정</button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            삭제
                                        </button>
                                        <button
                                            className="sell-button"
                                            onClick={() => handleSell(product.id)}
                                            disabled={product.stock === 0}
                                        >
                                            판매
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminShopProduct;
