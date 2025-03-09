import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/user/CakeOrder.css"; // 케이크 주문 페이지 스타일
import VenderHeader from '../../components/vendor/VenderHeader'; // 커스텀 헤더 컴포넌트
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 한글 옵션 유형 매핑
const OPTION_TYPE_NAME_KO = {
    1: "상품 종류",
    2: "케이크 크기",
    3: "맛 - 시트",
    4: "맛 - 크림",
    5: "케이크 배경 색상",
    6: "크림 위치",
    7: "크림 색상",
    8: "데코 종류",
    9: "데코 색상",
    10: "카테고리"
};
const VendorProductPreview = () => {
    const [previewData, setPreviewData] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [optionDetails, setOptionDetails] = useState({}); // 옵션 ID -> 이름 매핑
    const [selectedTab, setSelectedTab] = useState('상품 상세정보');

    useEffect(() => {
        const data = localStorage.getItem('previewData');
        if (data) {
            const parsedData = JSON.parse(data);
            setPreviewData(parsedData);
            setMainImage(parsedData.images.main); // 초기 메인 이미지 설정

            // 옵션 데이터를 백엔드에서 가져오기
            const optionArray = convertOptionsToArray(parsedData.selectedOptions);
            fetchOptionDetails(optionArray);
        }
    }, []);

    const convertOptionsToArray = (selectedOptions) => {
        return Object.values(selectedOptions).flat(); // 옵션 ID 배열로 변환
    };

    const fetchOptionDetails = async (selectedOptions) => {
        try {
            const response = await axios.post(`${API_URL}/api/options/details`, { selectedOptions });
            // 데이터 구조 확인 후 변환
            const formattedDetails = response.data.reduce((acc, option) => {
                // optionTypeId를 키로 사용하고 옵션 값을 배열로 저장
                if (!acc[option.optionTypeId]) {
                    acc[option.optionTypeId] = [];
                }
                acc[option.optionTypeId].push(option);
                return acc;
            }, {});
            setOptionDetails(formattedDetails);
        } catch (error) {
            console.error('옵션 데이터를 가져오는 중 오류 발생:', error);
        }
    };
    const renderOptionItem = (optionTypeId, optionValueId) => {
        // optionDetails[optionTypeId]가 배열인지 확인
        const optionsArray = Array.isArray(optionDetails[optionTypeId]) ? optionDetails[optionTypeId] : [];
        console.log(`optionsArray for type ${optionTypeId}:`, optionsArray);

        // 해당 옵션 값을 찾음
        const option = optionsArray.find(option => option.optionValueId === optionValueId);

        return option ? (
            <div key={optionValueId} className="option-item">
                <img src={option.optionValueImageUrl} alt={option.optionValueName} className="option-image" />
                <p>{option.optionValueName}</p>
            </div>
        ) : (
            <p key={optionValueId}>옵션 정보를 불러오는 중...</p>
        );
    };
    if (!previewData) {
        return <div>데이터를 불러오는 중...</div>;
    }

    const { productName, description, images, selectedOptions, price } = previewData;

    const renderTabContent = () => {
        if (selectedTab === '상품 상세정보') {
            return (
                <div className="content-section">
                    {description ? (
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    ) : (
                        <p>상품 설명이 없습니다.</p>
                    )}
                </div>
            );
        }

        if (selectedTab === '후기') {
            return (
                <div className="reviews-container">
                    <h3>후기 기능 구현 예정</h3>
                </div>
            );
        }
    };

    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader />
            <main id="user-wrap-body" className="clearfix">
                <div className="cake-order-container">
                    {/* 왼쪽 섹션 */}
                    <div className="left-section">
                        <div className="product-image">
                            <img
                                src={mainImage || images.main}
                                alt="메인 이미지"
                                className="main-image"
                                onClick={() => setMainImage(images.main)} // 메인 이미지를 클릭하면 기본 메인 이미지로 복구
                            />
                            <div className="thumbnail-container">
                                {[images.main, ...images.subs].map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-wrapper ${mainImage === image ? 'active' : ''}`}
                                        onClick={() => setMainImage(image)} // 모든 썸네일 이미지를 클릭 가능
                                    >
                                        <img src={image} alt={`썸네일 ${index + 1}`} className="thumbnail-image" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-tabs">
                            <div className="tabs-header sticky">
                                {['상품 상세정보', '후기'].map(tab => (
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

                    {/* 오른쪽 섹션 */}
                    <div className="right-section">
                        <div className="product-info">
                            <h2>{productName}</h2>
                            <p className="price">{price} 원</p>
                        </div>
                        <div className="preview-cake-options">
                            <div className="preview-cake-option-group">
                                {/* 선택한 옵션들을 표시 */}
                                <h3>선택한 옵션</h3>

                                {Object.entries(selectedOptions).map(([optionTypeId, optionValueId]) => {
                                    // optionTypeId를 숫자로 변환 (string으로 전달될 가능성 처리)
                                    const typeId = parseInt(optionTypeId, 10);

                                    // 한글 옵션 유형 이름 가져오기
                                    const optionTypeName = OPTION_TYPE_NAME_KO[typeId] || '알 수 없는 옵션';

                                    return (
                                        <div className="preview-cake-option-group">
                                            <h4>{optionTypeName}</h4> {/* 한글 옵션 유형 이름 출력 */}
                                            <div className="preview-cake-container">
                                                {Array.isArray(optionValueId) ? (
                                                    // optionValueId가 배열인 경우 모든 값을 렌더링
                                                    optionValueId.map(valueId => renderOptionItem(typeId, valueId))
                                                ) : (
                                                    // optionValueId가 단일 값인 경우
                                                    renderOptionItem(typeId, optionValueId)
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="option-group">
                                    <h3>배송 방식</h3>
                                    <div className="delivery-type-buttons">
                                        <button
                                            className="delivery-option-button"

                                        >
                                            픽업
                                        </button>
                                        <button
                                            className="delivery-option-button"

                                        >
                                            퀵
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <Link
                                to="/user/paymentdetail"
                                className="submit-button"
                            >
                                요청사항 확인
                            </Link>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default VendorProductPreview;
