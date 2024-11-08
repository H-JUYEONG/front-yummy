import React, { useState } from 'react';
import '../../assets/css/all.css';
import '../../assets/css/vender/venderProductPreview.css';

const VenderProductPreview = () => {
    const [selectedTab, setSelectedTab] = useState('상품 상세정보');
    const [mainImage, setMainImage] = useState('/images/1호_일반케이크.jpg');
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const images = [
        '/images/1호_일반케이크.jpg',
        '/images/2호_일반케이크.jpg',
        '/images/3호_일반케이크.jpg',
        '/images/4호_일반케이크.jpg',
    ];

    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/flavor-choco.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/flavor-vanilla.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/flavor-strawberry.jpg' },
        { id: 'matcha', name: '말차', image: '/images/flavor-matcha.jpg' },
    ];

    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/size-1.jpg' },
        { id: 'size2', name: '2호', image: '/images/size-2.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' },
    ];

    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    const handleFlavorSelect = (flavorId) => setSelectedFlavor(flavorId);
    const handleSizeSelect = (sizeId) => setSelectedSize(sizeId);

    const tabs = ['상품 상세정보', '배송/교환/환불', '상품후기', '상품문의'];

    const renderTabContent = () => {
        switch (selectedTab) {
            case '상품 상세정보':
                return <div>상품 상세정보 내용</div>;
            case '배송/교환/환불':
                return <div>배송/교환/환불 내용</div>;
            case '상품후기':
                return <div>상품후기 내용</div>;
            case '상품문의':
                return <div>상품문의 내용</div>;
            default:
                return null;
        }
    };

    return (

        <main className="preview-body clearfix">
            <div className="product-preview-container text-center">
                <div className="preview-image-section">
                    <div className="main-product-image">
                        <img src={mainImage} alt="케이크" className="main-image" />
                        <div className="thumbnail-list">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-item ${mainImage === image ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(image)}
                                >
                                    <img
                                        src={image}
                                        alt={`썸네일${index + 1}`}
                                        className="thumbnail-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product-tabs">
                        <div className="tabs-header">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="tab-content">{renderTabContent()}</div>
                    </div>
                </div>
                <div className="preview-info-section">
                    <div className="product-details">
                        <h2>Lettering 맛있는 레터링 크림케이크 (1호,2호)</h2>
                        <p className="price">46,000 won</p>
                    </div>
                    <div className="product-options">
                        <div className="option-group">
                            <h3>맛</h3>
                            <div className="option-scroll">
                                <div className="option-grid">
                                    {flavorOptions.map((flavor) => (
                                        <button
                                            key={flavor.id}
                                            className={`option-item ${selectedFlavor === flavor.id ? 'active' : ''}`}
                                            onClick={() => handleFlavorSelect(flavor.id)}
                                        >
                                            <img src={flavor.image} alt={flavor.name} />
                                            <span>{flavor.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="option-group">
                            <h3>사이즈</h3>
                            <div className="option-grid">
                                {sizeOptions.map((size) => (
                                    <button
                                        key={size.id}
                                        className={`option-item ${selectedSize === size.id ? 'active' : ''}`}
                                        onClick={() => handleSizeSelect(size.id)}
                                    >
                                        <img src={size.image} alt={size.name} />
                                        <span>{size.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="order-button">주문하기</button>
                </div>
            </div>
        </main>

    );
};

export default VenderProductPreview;
