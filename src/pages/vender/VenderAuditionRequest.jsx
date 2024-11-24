import React, { useState } from 'react';
import '../../assets/css/vender/venderauditionrequest.css';

const VerticalCakeOrder = () => {
    // 상태 관리
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [requestText, setRequestText] = useState('');
    const [price, setPrice] = useState('');

    // 숫자만 입력되도록 처리하는 함수
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrice(value);
    };

    // 이미지 데이터
    const images = [
        '/images/2호_일반케이크.jpg',
        '/images/3호_특별한케이크(달력).jpg',
        '/images/1호_일반케이크 1.jpg',
        '/images/4호_달걀 한판 케이크.png'
    ];

    // 색상 옵션 데이터
    const colorOptions = [
        { id: 'pink', name: '핑크', className: 'pink' },
        { id: 'yellow', name: '노랑', className: 'yellow' },
        { id: 'orange', name: '오렌지', className: 'orange' },
        { id: 'blue', name: '파랑', className: 'blue' },
        { id: 'green', name: '초록', className: 'green' },
        { id: 'purple', name: '보라', className: 'purple' },
        { id: 'brown', name: '갈색', className: 'brown' }
    ];

    // 맛 옵션 데이터
    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/기브미 쪼꼬레또.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/바닐라.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/딸기.jpg' },
        { id: 'matcha', name: '말차', image: '/images/말차.png' },
        { id: 'cheese', name: '치즈', image: '/images/치즈.jpg' },
        { id: 'redvelvet', name: '레드벨벳', image: '/images/레드벨벳.jpg' }
    ];

    // 사이즈 옵션 데이터
    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/1호.jpg' },
        { id: 'size2', name: '2호', image: '/images/2호.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' }
    ];

    // 썸네일 클릭 핸들러
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    // 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            price,
            selectedColor,
            selectedFlavor,
            selectedSize,
            requestText
        });
    };

    return (
        <div id="user-wrap">
        
            <div className="vertical-cake-order">
                {/* 제품명과 가격 입력 영역 */}
                <div className="product-info-input">
                    <h2 className="product-title">Lettering 맛있는 레터링 크림케이크 (1호,2호)</h2>
                </div>

                {/* 메인 이미지 및 썸네일 */}
                <div className="product-image-section">
                    <img src={mainImage} alt="메인 케이크 이미지" className="main-image" />
                    <div className="thumbnail-container">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`thumbnail-wrapper ${mainImage === image ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(image)}
                            >
                                <img src={image} alt={`썸네일 ${index + 1}`} className="thumbnail-image" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 옵션 선택 영역 */}
                <div className="options-section">
                    {/* 색상 선택 */}
                    <div className="option-group">
                        <h3>크림 색상</h3>
                        <div className="color-options">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.id}
                                    className={`color-option ${color.className} ${selectedColor === color.id ? 'active' : ''}`}
                                    onClick={() => setSelectedColor(color.id)}
                                    aria-label={`${color.name} 색상 선택`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 맛 선택 */}
                    <div className="option-group">
                        <h3>맛</h3>
                        <div className="option-grid">
                            {flavorOptions.map((flavor) => (
                                <button
                                    key={flavor.id}
                                    className={`option-item ${selectedFlavor === flavor.id ? 'active' : ''}`}
                                    onClick={() => setSelectedFlavor(flavor.id)}
                                >
                                    <div className="option-image">
                                        <img src={flavor.image} alt={flavor.name} />
                                    </div>
                                    <span>{flavor.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 사이즈 선택 */}
                    <div className="option-group">
                        <h3>케이크 호수</h3>
                        <div className="option-grid">
                            {sizeOptions.map((size) => (
                                <button
                                    key={size.id}
                                    className={`option-item ${selectedSize === size.id ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size.id)}
                                >
                                    <div className="option-image">
                                        <img src={size.image} alt={size.name} />
                                    </div>
                                    <span>{size.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 금액 측정*/}
                <div className="request-section">
                    <h3>금액 측정</h3>
                    <textarea
                        value={requestText}
                        onChange={(e) => setRequestText(e.target.value)}
                        placeholder="금액에 관련된 사항들을 측정해 주세요."
                        className="request-textarea"
                    />
                </div>

                {/* 신청 버튼 */}
                <button className="submit-button" onClick={handleSubmit}>
                    신청하기
                </button>
            </div>
        </div>
    );
};

export default VerticalCakeOrder;