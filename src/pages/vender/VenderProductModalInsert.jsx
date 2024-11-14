import React from 'react';
import '../../assets/css/vender/venderProductModalInsert.css'; // 모달 스타일

const VenderProductModalInsert = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="ssso-modal-content">
                <div className='ssso-title-box'>
                    <h2>상품 선택</h2>
                </div>
                <div className='ssso-insert-box'>
                    <label>검색</label>
                    <input className='sso-insert-txt' placeholder='상품명을 검색해주세요'></input>
                </div>
                <div className='ssso-productlist-box'>
                    <div className='ssso-product-one-box'>
                        <div className='ssso-img-box'>
                            <img src='#' />
                        </div>
                        <p>상품명</p>
                    </div>
                    <div className='ssso-product-one-box'>
                        <div className='ssso-img-box'>
                            <img src='#' />
                        </div>
                        <p>상품명</p>
                    </div>
                    <div className='ssso-product-one-box'>
                        <div className='ssso-img-box'>
                            <img src='#' />
                        </div>
                        <p>상품명</p>
                    </div>
                    <div className='ssso-product-one-box'>
                        <div className='ssso-img-box'>
                            <img src='#' />
                        </div>
                        <p>상품명</p>
                    </div>
                    <div className='ssso-product-one-box'>
                        <div className='ssso-img-box'>
                            <img src='#' />
                        </div>
                        <p>상품명</p>
                    </div>
                </div>

                <div className='ssso-pick-btn-box'>
                    <button onClick={onClose}>선택하기</button>
                </div>
                
            </div>
        </div>
    );
};

export default VenderProductModalInsert;