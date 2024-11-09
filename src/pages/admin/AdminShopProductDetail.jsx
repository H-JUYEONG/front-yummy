import React, { useState } from 'react';
import "../../assets/css/admin/adminshopproductdetail.css";
import AdminSidebar from './include/AdminSidebar';

const AdminShopProductDetail = () => {
    // 폼 상태 초기화
    const [product, setProduct] = useState({
        name: "",
        category: ["밀가루"]["달걀"], // 기본 선택값을 기본 재료로 설정
        price: "",
        stock: ""
    });

    const [preview, setPreview] = useState(false);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // 미리 보기 버튼 클릭 핸들러
    const handlePreview = () => {
        setPreview(true);
    };

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="admin-shopproductdetail-page">
                <header className="admin-shopproductdetail-header">
                    <h1>쇼핑몰 상품 등록</h1>
                </header>

                <section>
                    <form className="product-form">
                        <div className="form-group">
                            <label htmlFor="name">상품명:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">카테고리:</label>
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            >
                                <option value="기본 재료">기본 재료</option>
                                <option value="장식 재료">장식 재료</option>
                                <option value="도구">도구</option>
                                <option value="포장">포장</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">가격:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">재고:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="preview-button"
                                onClick={handlePreview}
                            >
                                미리 보기
                            </button>
                            <button type="submit" className="submit-button">
                                등록하기
                            </button>
                        </div>
                    </form>

                    {preview && (
                        <div className="preview-section">
                            <h2>상품 미리 보기</h2>
                            <p><strong>상품명:</strong> {product.name}</p>
                            <p><strong>카테고리:</strong> {product.category}</p>
                            <p><strong>가격:</strong> {product.price}</p>
                            <p><strong>재고:</strong> {product.stock}개</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminShopProductDetail;
