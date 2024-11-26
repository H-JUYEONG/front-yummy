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
const OptionSelector = ({ optionName, options, selectedOptions, onSelect, isSingleSelect }) => {
    return (
        <div className="option-selector">
            <label>{optionName}</label>
            <div className="option-items">
                {options.map((option, index) => {
                    const isSelected = isSingleSelect
                        ? selectedOptions === option.optionValueId // 라디오 버튼은 단일 값 선택
                        : selectedOptions.includes(option.optionValueId); // 체크박스는 배열로 관리

                    return (
                        <div key={index} className={`option-item ${isSelected ? 'selected' : ''}`}>
                            <input
                                type={isSingleSelect ? "radio" : "checkbox"} // 단일 선택 여부에 따라 타입 변경
                                id={`${optionName}-${index}`}
                                checked={isSelected}
                                onChange={() => onSelect(option.optionValueId)}
                                name={isSingleSelect ? optionName : undefined} // 라디오 그룹 네임 설정
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
const CakeDesignModal = ({ isOpen, onRequestClose, designs = [], myDesigns = [], onSelectDesign }) => {
    const [searchText, setSearchText] = useState('');

    // 검색된 도안 필터링
    const filteredWishlistDesigns = (designs || []).filter(design =>
        design.cakeDesignTitle?.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredMyDesigns = (myDesigns || []).filter(design =>
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
            <div>
                <h3>찜한 도안</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {filteredWishlistDesigns.map((design, index) => (
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
            </div>
            <div>
                <h3>내가 그린 도안</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {filteredMyDesigns.map((design, index) => (
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
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [images, setImages] = useState({ main: null, subs: [null, null, null] });
    const [preview, setPreview] = useState({ main: null, subs: [null, null, null] });
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [availableDesigns, setAvailableDesigns] = useState([]);
    const [myDesigns, setMyDesigns] = useState([]); // 내가 그린 도안 상태
    // 옵션 상태 관리
    const [availableOptions, setAvailableOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기
    const memberId = authUser?.member_id || null;
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

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handlePreview = async () => {
        const mainImageBase64 = images.main ? await convertToBase64(images.main) : null;
        const subsBase64 = await Promise.all(
            images.subs.map((file) => (file ? convertToBase64(file) : null))
        );

        const previewData = {
            productName,
            description,
            images: {
                main: mainImageBase64,
                subs: subsBase64.filter(Boolean), // 서브 이미지 필터링
            },
            selectedOptions,
            price,
            selectedDesign,
        };

        localStorage.setItem('previewData', JSON.stringify(previewData));
        window.open('/vender/productpreview', '_blank', 'width=1200,height=800');
    };
    // 내가 그린 도안
    useEffect(() => {
        const fetchMyDesigns = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/my-designs`, {
                    params: { memberId }, // 현재 사용자 ID
                });
                console.log("내가 그린 도안 데이터:", response.data);
                setMyDesigns(response.data); // 도안 데이터 상태 업데이트
            } catch (error) {
                console.error("내가 그린 도안 데이터 로드 중 에러 발생:", error);
            }
        };

        fetchMyDesigns();
    }, []);
    // 찜한 데이터 로드
    useEffect(() => {
        const fetchWishlistDesigns = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/wishlist-designs`, {
                    params: { memberId },
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
            const isSingleSelect = availableOptions.find(opt => opt.optionTypeId === optionTypeId)?.optionTypeName === "상품 종류";

            if (isSingleSelect) {
                // 단일 선택
                return { ...prevState, [optionTypeId]: value };
            } else {
                // 다중 선택
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
            }
        });
    };

    // 이미지 업로드 핸들러
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = { ...images };
            const newPreview = { ...preview };
            if (index === 'main') {
                newImages.main = file; // 원본 파일 저장
                newPreview.main = URL.createObjectURL(file); // 미리보기 URL 생성
            } else {
                newImages.subs[index] = file; // 원본 파일 저장
                newPreview.subs[index] = URL.createObjectURL(file); // 미리보기 URL 생성
            }
            setImages(newImages);
            setPreview(newPreview);
        }
    };
    // 옵션 페이지로 이동
    const handleAddOptions = () => {
        navigate('/vender/option');  // VenderOption 페이지 경로
    };


    const prepareOptionsForServer = (selectedOptions) => {
        const formattedOptions = {};
        for (const [key, value] of Object.entries(selectedOptions)) {
            formattedOptions[key] = Array.isArray(value) ? value : [value]; // 단일 값도 배열로 변환
        }
        return formattedOptions;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // 기본 데이터 추가
        formData.append("venderId", venderId);
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("isVisible", 0);

        // 도안 데이터 추가
        if (selectedDesign) {
            formData.append("cakeDesignId", selectedDesign.cakeDesignId);
        }

        // 이미지 데이터 추가
        if (images.main) {
            formData.append("mainImage", images.main);
        }
        images.subs.forEach((subImage, index) => {
            if (subImage) {
                formData.append("subImages", subImage);
            }
        });

        // 옵션 데이터 추가
        const preparedOptions = prepareOptionsForServer(selectedOptions);
        formData.append("selectedOptions", JSON.stringify(preparedOptions));

        // 데이터 확인
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post(`${API_URL}/api/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("상품이 성공적으로 등록되었습니다!");
            navigate("/vender/productslist");
        } catch (error) {
            console.error("상품 등록 실패:", error.response || error.message);
            alert("상품 등록 중 오류가 발생했습니다.");
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
                                    {/* 메인 이미지 */}
                                    <div className="image-upload">
                                        <label htmlFor="mainImage" className="image-placeholder">
                                            {preview.main ? (
                                                <img src={preview.main} alt="메인 이미지 미리보기" className="preview-image" />
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
                                    {/* 서브 이미지 */}
                                    {images.subs.map((image, index) => (
                                        <div key={index} className="image-upload">
                                            <label htmlFor={`subImage${index}`} className="image-placeholder">
                                                {preview.subs[index] ? (
                                                    <img src={preview.subs[index]} alt={`서브 이미지 ${index + 1} 미리보기`} className="preview-image" />
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
                                        selectedOptions={selectedOptions[option.optionTypeId] || (option.optionTypeName === "상품 종류" ? null : [])}
                                        onSelect={(value) => handleOptionSelect(option.optionTypeId, value)}
                                        isSingleSelect={option.optionTypeName === "상품 종류"} // "상품 종류"는 라디오 버튼
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
                                myDesigns={myDesigns} // 내가 그린 도안 전달
                                onSelectDesign={handleDesignSelect}
                            />
                            <div className="form-group centered-button-group">
                                <button type="submit" className="add-button">등록하기</button>
                            </div>
                        </form>
                        <button className="floating-preview-button" onClick={handlePreview}>
                            미리보기
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductRegistrationForm;
