import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import Modal from 'react-modal'; // 모달 라이브러리 import
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/productregistrationform.css';
import VenderSidebar from './include/VenderSidebar';
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

// 옵션 이름 변환
const translateOptionTypeName = (options) => {
    return options.map(option => ({
        ...option,
        optionTypeName: OPTION_TYPE_NAME_KO[option.optionTypeId] || option.optionTypeName
    }));
};

// 옵션 선택 컴포넌트 (체크 박스 버전)
const OptionSelector = ({ optionName, options, selectedOptions, onSelect }) => {
    return (
        <div className="option-selector">
            <label>{optionName}</label>
            <div className="option-items">
                {options.map((option, index) => {
                    const isSelected = selectedOptions.includes(option.optionValueId); // 선택 여부 확인
                    return (
                        <div key={index} className={`option-item ${isSelected ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                id={`${optionName}-${index}`}
                                checked={isSelected}
                                onChange={() => onSelect(option.optionValueId)}
                            />
                            <label htmlFor={`${optionName}-${index}`}>
                                <img
                                    src={option.optionValueImageUrl}
                                    alt={option.optionValueName}
                                    className="option-image"
                                />
                                <span className="option-name">{option.optionValueName}</span>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// 도안 모달 컴포넌트
const CakeDesignModal = ({ isOpen, onRequestClose, designs, onSelectDesign }) => {
    const [searchText, setSearchText] = useState('');

    // 검색된 도안 필터링
    const filteredDesigns = designs.filter(design =>
        design.cakeDesignTitle?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="도안 선택 모달"
            className="venderregistrationform-design-modal"
            overlayClassName="venderregistrationform-design-modal-overlay"
        >
            <h2>도안 선택</h2>
            <input
                type="text"
                placeholder="도안 검색..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="design-search-input"
            />
            <div className="design-list">
                {filteredDesigns.map((design, index) => (
                    <div key={index} className="design-item">
                        {design.cakeDesignImageUrl ? (
                            <img src={design.cakeDesignImageUrl} alt={design.cakeDesignTitle} className="design-image" />
                        ) : (
                            <div className="design-image-placeholder">이미지 없음</div>
                        )}
                        <span className="design-name">{design.cakeDesignTitle}</span>
                        <button onClick={() => onSelectDesign(design)}>선택</button>
                    </div>
                ))}
            </div>
            <button onClick={onRequestClose} className="close-modal-button">닫기</button>
        </Modal>
    );
};

// ProductEditor 컴포넌트
const ProductEditor = ({ description, setDescription }) => {
    const quillRef = useRef(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (quillRef.current) {
                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection(true);
                        if (range) {
                            quill.insertEmbed(range.index, 'image', reader.result);
                        }
                    }
                };
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            matchVisual: false
        }
    };

    const formats = [
        'header', 'font', 'list', 'bold', 'italic', 'underline', 'strike',
        'blockquote', 'color', 'background', 'align', 'link', 'image', 'video'
    ];

    const handleChange = useCallback((content) => {
        setDescription(content);
    }, [setDescription]);

    return (
        <div className="form-group">
            <label htmlFor="description">상품 설명</label>
            <ReactQuill
                ref={quillRef}
                id="description"
                value={description}
                onChange={handleChange}
                placeholder="상품 설명을 작성해주세요..."
                className="textarea-editor"
                theme="snow"
                modules={modules}
                formats={formats}
                preserveWhitespace
            />
        </div>
    );
};


function ProductRegistrationForm() {
    const venderId = 39; // 예시로 사용
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [images, setImages] = useState({ main: null, subs: [null, null, null] });
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [availableDesigns, setAvailableDesigns] = useState([]);
    // 옵션 상태 관리
    const [availableOptions, setAvailableOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const openDesignModal = useCallback(() => {
        setIsDesignModalOpen(true);
    }, []);

    const closeDesignModal = useCallback(() => {
        setIsDesignModalOpen(false);
    }, []);

    const handleDesignSelect = (design) => {
        setSelectedDesign(design); // 선택한 도안 저장
        closeDesignModal(); // 모달 닫기
    };
    // 도안 데이터 로드
    useEffect(() => {
        const fetchWishlistDesigns = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/wishlist-designs`, {
                    params: { memberId: 39 },
                });
                console.log("찜한 도안 데이터:", response.data);
                setAvailableDesigns(response.data);
            } catch (error) {
                console.error("찜한 도안 데이터 로드 중 에러 발생:", error);
            }
        };

        fetchWishlistDesigns();
    }, []);

    // 옵션 데이터 로드
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/options/${venderId}`);
                const translatedOptions = translateOptionTypeName(response.data);
                setAvailableOptions(translatedOptions);
            } catch (error) {
                console.error('옵션 데이터 로드 중 에러 발생:', error);
            }
        };

        fetchOptions();
    }, [venderId]);
    // 필터링된 옵션
    const visibleOptions = availableOptions.filter(option => option.optionValues && option.optionValues.length > 0);
    // 옵션 선택 핸들러
    const handleOptionSelect = (optionTypeId, value) => {
        setSelectedOptions(prevState => {
            const currentValues = prevState[optionTypeId] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prevState,
                    [optionTypeId]: currentValues.filter(opt => opt !== value)
                };
            } else {
                return {
                    ...prevState,
                    [optionTypeId]: [...currentValues, value]
                };
            }
        });
    };

    // 이미지 업로드 핸들러
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = { ...images };
            if (index === 'main') {
                newImages.main = URL.createObjectURL(file);
            } else {
                newImages.subs[index] = URL.createObjectURL(file);
            }
            setImages(newImages);
        }
    };
    // 옵션 페이지로 이동
    const handleAddOptions = () => {
        navigate('/vender/option');  // VenderOption 페이지 경로
    };
    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            productName,
            productType,
            price,
            description,
            selectedOptions,
            isVisible: 0, // 미노출 상태로 등록
            images: images.subs.map((url, index) => ({
                [`image${index + 1}`]: url, // 이미지 매핑
            })),
            designId: selectedDesign ? selectedDesign.cakeDesignId : null, // 선택된 도안
        };
        console.log("제출 데이터:", productData);
        try {
            const response = await axios.post(`${API_URL}/api/products`, productData);
            console.log("상품 등록 성공:", response.data);
            alert("상품이 미노출 상태로 등록되었습니다!");
        } catch (error) {
            console.error("상품 등록 실패:", error);
            alert("상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="vender-container">
            <div className="vender-content-wrapper">
                <VenderSidebar />
                <div className="vender-content">
                    <div className="product-registration">
                        <form className="main-content" onSubmit={handleSubmit}>
                            <h1 className="product-list-title">상품 등록</h1>

                            {/* 상품명 입력 */}
                            <div className="form-group">
                                <label htmlFor="productName">상품명</label>
                                <input
                                    type="text"
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="상품명을 입력해주세요"
                                    className="input-text"
                                />
                            </div>

                            <ProductEditor
                                description={description}
                                setDescription={setDescription}
                            />
                            {/* 가격 입력 */}
                            <div className="form-group">
                                <label htmlFor="price">가격</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="가격을 입력해주세요"
                                    className="input-text"
                                />
                            </div>

                            {/* 이미지 업로드 */}
                            <div className="form-group">
                                <label>이미지 업로드</label>
                                <div className="image-upload-container">
                                    <div className="image-upload">
                                        <label htmlFor="mainImage" className="image-placeholder">
                                            {images.main ? (
                                                <img src={images.main} alt="메인 이미지" />
                                            ) : (
                                                <span>메인 이미지</span>
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            id="mainImage"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'main')}
                                        />
                                    </div>
                                    {images.subs.map((image, index) => (
                                        <div key={index} className="image-upload">
                                            <label htmlFor={`subImage${index}`} className="image-placeholder">
                                                {image ? (
                                                    <img src={image} alt={`서브 이미지 ${index + 1}`} />
                                                ) : (
                                                    <span>서브 이미지 {index + 1}</span>
                                                )}
                                            </label>
                                            <input
                                                type="file"
                                                id={`subImage${index}`}
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <h3>상품 옵션 선택</h3>
                                <button
                                    type="button"
                                    className="add-options-button"
                                    onClick={handleAddOptions}
                                >
                                    옵션 추가하기
                                </button>
                                {visibleOptions.map(option => (
                                    <OptionSelector
                                        key={option.optionTypeId}
                                        optionName={option.optionTypeName}
                                        options={option.optionValues}
                                        selectedOptions={selectedOptions[option.optionTypeId] || []}
                                        onSelect={(value) => handleOptionSelect(option.optionTypeId, value)}
                                    />
                                ))}
                            </div>

                            {/* 도안 선택 섹션 */}
                            <div className="cakeDesign-section">
                                <div className="options-header">
                                    <h2>케이크 도안 선택</h2>
                                    <button
                                        type="button"
                                        className="add-options-button"
                                        onClick={openDesignModal}
                                    >
                                        도안 추가하기
                                    </button>
                                </div>
                                {selectedDesign && (
                                    <div className="selected-design">
                                        <img src={selectedDesign.cakeDesignImageUrl} alt={selectedDesign.cakeDesignTitle} className="selected-design-image" />
                                        <span className="selected-design-name">{selectedDesign.cakeDesignTitle}</span>
                                    </div>
                                )}

                            </div>

                            {/* 도안 모달 */}
                            <CakeDesignModal
                                isOpen={isDesignModalOpen}
                                onRequestClose={closeDesignModal}
                                designs={availableDesigns}
                                onSelectDesign={handleDesignSelect}
                            />
                            <div className="form-group centered-button-group">
                                <button type="submit" className="add-button">등록하기</button>
                            </div>
                        </form>
                        <button
                            className="floating-preview-button"
                            onClick={() => window.open('/vender/productpreview', '_blank')}
                        >
                            미리보기
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductRegistrationForm;
