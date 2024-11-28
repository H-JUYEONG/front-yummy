import React from 'react';
import '../../assets/css/vender/venderProductModalInsert.css'; // 모달 스타일

const VenderProductModalInsert = ({ onClose, productList, onProductSelect}) => {

    const handleProductSelect = (product)=>{
        onProductSelect(product.productId);
        onClose();
    }

    return (
        <div className="vender-sso-modal-overlay">
            <div className="vender-sso-modal-content">
                <div className='ssso-title-box'>
                    <button className="vender-sso-modal-close-button" onClick={onClose}>
                            X
                        </button>
                    <h2>상품 선택</h2>
                    
                </div>
                
                
                <div className='ssso-productlist-box'>
                    {productList    .filter((product) => product.selectProduct == '일치')
                                    .map((product)=>{
                        return (
                            <div className='ssso-product-one-box' onClick={() => handleProductSelect(product)}>
                                <div className='ssso-img-box'>
                                    <img src={product.productURL} />
                                </div>
                                <p>{product.productName}</p>
                            </div>
                        )
                    })}
                    
                    
                </div>

                    
                
            </div>
        </div>
    );
};

export default VenderProductModalInsert;