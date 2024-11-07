import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/productlist.css'; // 상품리스트 페이지 전용 스타일

import VenderSidebar from './include/VenderSidebar';

const VenderProductList = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="container">
                {/* 사이드바 영역 */}
                <VenderSidebar />

                {/* 메인 콘텐츠 영역 */}
                <div className="vender-content">
                    <main className="main-content">
                        <section className="product-list">
                            <header className="product-list-header">
                                <h2 className="product-list-title">상품 리스트</h2>
                                <div className="button-group">
                                    <button
                                        className="add-button"
                                        onClick={() => navigate('/vender/option')}
                                    >
                                        옵션등록하기
                                    </button>
                                    <button
                                        className="add-button"
                                        onClick={() => navigate('/vender/designregistration')}
                                    >
                                        도안등록하기
                                    </button>
                                    <button
                                        className="add-button"
                                        onClick={() => navigate('/vender/registrationform')}
                                    >
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
                                    <tr>
                                        <td>초콜릿 케이크</td>
                                        <td>일반 케이크</td>
                                        <td>30,000원</td>
                                        <td>촉촉, 풍부한 초콜릿 맛</td>
                                        <td>노출</td>
                                        <td>
                                            <button className="edit-button">수정</button>
                                            <button className="delete-button">삭제</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>바닐라 생크림 케이크</td>
                                        <td>생크림 케이크</td>
                                        <td>32,000원</td>
                                        <td>부드러운 생크림, 클래식한 맛</td>
                                        <td>임시저장</td>
                                        <td>
                                            <button className="edit-button">수정</button>
                                            <button className="delete-button">삭제</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>바닐라 비건 케이크</td>
                                        <td>비건 케이크</td>
                                        <td>32,000원</td>
                                        <td>부드러운 비건 생크림, 클래식한 맛</td>
                                        <td>미노출</td>
                                        <td>
                                            <button className="edit-button">수정</button>
                                            <button className="delete-button">삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default VenderProductList;
