import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
            <div className="design-list">
                <h3>찜한 도안</h3>
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
            <div className="design-list">
                <h3>내가 그린 도안</h3>
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


function VenderProductRegistrationFormEdit() {
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기
    const memberId = authUser?.member_id || null;
    const navigate = useNavigate();
    const { productId } = useParams(); // URL에서 productId 가져오기
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
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
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
    useEffect(() => {
        console.log("Available options:", availableOptions);
    }, [availableOptions])


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


    // 도안 데이터 로드
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


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/products/${productId}`);
                const { product, options } = response.data;
                console.log("Fetched product:", product);

                if (!product || !options) {
                    console.error("Invalid product or options data:", response.data);
                    return;
                }

                // 데이터 설정
                setProductName(product.productName || '');
                setPrice(product.price || '');
                setDescription(product.description || '');
                setImages({
                    main: product.productImage1Url || null,
                    subs: [
                        product.productImage2Url || null,
                        product.productImage3Url || null,
                        product.productImage4Url || null,
                    ],
                });

                const formattedOptions = options.reduce((acc, option) => {
                    const { optionTypeId, optionTypeName, optionValueId, optionValueName, isSelected } = option;
                    if (!acc[optionTypeId]) {
                        acc[optionTypeId] = {
                            optionTypeName: OPTION_TYPE_NAME_KO[optionTypeId] || optionTypeName,
                            values: [],
                        };
                    }
                    acc[optionTypeId].values.push({
                        optionValueId,
                        optionValueName,
                        isSelected,
                    });
                    return acc;
                }, {});
                setAvailableOptions(formattedOptions);

                const selected = options.filter(opt => opt.isSelected).reduce((acc, opt) => {
                    if (!acc[opt.optionTypeId]) {
                        acc[opt.optionTypeId] = [];
                    }
                    acc[opt.optionTypeId].push(opt.optionValueId);
                    return acc;
                }, {});
                setSelectedOptions(selected);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);



    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products/${productId}`);
                const data = response.data;

                // apiData 유효성 검사
                if (!data || data.result !== "success" || !data.apiData) {
                    console.error("Invalid product data", data);
                    return;
                }

                const product = data.apiData;

                setProductName(product.productName || "");
                setPrice(product.productPrice || 0);
                setDescription(""); // API 응답에 description이 없으므로 기본값 설정

                setImages({
                    main: product.productImage1Url || null,
                    subs: [
                        product.productImage2Url || null,
                        product.productImage3Url || null,
                        product.productImage4Url || null,
                    ],
                });

                setPreview({
                    main: product.productImage1Url || null,
                    subs: [
                        product.productImage2Url || null,
                        product.productImage3Url || null,
                        product.productImage4Url || null,
                    ],
                });
            } catch (error) {
                console.error("Failed to fetch product data:", error);
            }
        };

        fetchProductData();
    }, [productId]);


    useEffect(() => {
        const fetchProductOptions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/products/${productId}/options`);
                const options = response.data.options;

                // 옵션 데이터가 없을 경우 기본값 설정
                if (!options || !Array.isArray(options)) {
                    setAvailableOptions({});
                    return;
                }

                const formattedOptions = options.reduce((acc, option) => {
                    const { optionTypeId, optionTypeName, optionValueId, optionValueName, isSelected } = option;

                    if (!acc[optionTypeId]) {
                        acc[optionTypeId] = {
                            optionTypeName,
                            values: []
                        };
                    }

                    acc[optionTypeId].values.push({
                        optionValueId,
                        optionValueName,
                        isSelected: Boolean(isSelected) // 선택 여부를 Boolean으로 변환
                    });

                    return acc;
                }, {});

                setAvailableOptions(formattedOptions);

                // 초기 선택된 옵션 설정
                const initialSelected = Object.entries(formattedOptions).reduce((acc, [typeId, { values }]) => {
                    acc[typeId] = values.filter(value => value.isSelected).map(value => value.optionValueId);
                    return acc;
                }, {});
                setSelectedOptions(initialSelected);
            } catch (error) {
                console.error("옵션 데이터 로드 실패:", error);
                setAvailableOptions({}); // 에러 발생 시 기본값 설정
            }
        };

        fetchProductOptions();
    }, [productId]);



    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoadingOptions(true); // 로딩 시작
            try {
                const response = await axios.get(`${API_URL}/api/options/${venderId}`);
                const translatedOptions = translateOptionTypeName(response.data);
                setAvailableOptions(translatedOptions);
            } catch (error) {
                console.error("옵션 데이터 로드 중 에러 발생:", error);
            } finally {
                setIsLoadingOptions(false); // 로딩 완료
            }
        };

        fetchOptions();
    }, [venderId]);
    // 필터링된 옵션
    const visibleOptions = Array.isArray(availableOptions)
        ? availableOptions.filter(option => option.optionValues && option.optionValues.length > 0)
        : [];
    // 옵션 선택 핸들러
    const handleOptionSelect = (optionTypeId, valueId) => {
        setSelectedOptions(prevState => {
            const currentValues = prevState[optionTypeId] || [];
            if (currentValues.includes(valueId)) {
                // 선택 해제
                return {
                    ...prevState,
                    [optionTypeId]: currentValues.filter(id => id !== valueId)
                };
            } else {
                // 선택 추가
                return {
                    ...prevState,
                    [optionTypeId]: [...currentValues, valueId]
                };
            }
        });
    };
    // 이미지 업로드 핸들러
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = { ...images };
            const updatedPreview = { ...preview };

            if (index === 'main') {
                updatedImages.main = file; // 새 이미지 파일 저장
                updatedPreview.main = URL.createObjectURL(file); // 새 미리보기 생성
            } else {
                updatedImages.subs[index] = file;
                updatedPreview.subs[index] = URL.createObjectURL(file);
            }

            setImages(updatedImages);
            setPreview(updatedPreview);
        }
    };
    // 옵션 페이지로 이동
    const handleAddOptions = () => {
        navigate('/vender/option');  // VenderOption 페이지 경로
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // 상품 데이터 추가
        formData.append("venderId", venderId);
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("description", description);
        console.log([...formData.entries()]); // formData 확인
        // 선택한 도안 정보 추가
        if (selectedDesign) {
            formData.append("cakeDesignId", selectedDesign.cakeDesignId);
        }

        // 메인 이미지 추가
        if (images.main) {
            formData.append("mainImage", images.main);
        }

        // 서브 이미지 추가
        images.subs.forEach((subImage, index) => {
            if (subImage) {
                formData.append("subImages", subImage);
            }
        });

        // **선택된 옵션 데이터를 JSON 문자열로 추가**
        if (Object.keys(selectedOptions).length > 0) {
            formData.append("selectedOptions", JSON.stringify(selectedOptions));
        }

        try {
            // PUT 요청으로 상품 및 옵션 수정
            const response = await axios.put(`${API_URL}/api/vender/products/${productId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("상품 및 옵션 수정 성공:", response.data);
            alert("상품 및 옵션이 성공적으로 수정되었습니다!");
            navigate("/vender/productslist"); // 수정 후 목록 페이지로 이동 (필요 시 경로 수정)
        } catch (error) {
            console.error("상품 및 옵션 수정 실패:", error.response || error.message);
            alert("상품 및 옵션 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
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
                                    value={productName || ""} // 기본값 설정
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
                                    value={price || 0} // 기본값 설정
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
                                    {images.subs.map((subImage, index) => (
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
                                myDesigns={myDesigns} // 내가 그린 도안 전달
                                onSelectDesign={handleDesignSelect}
                            />
                            <div className="form-group centered-button-group">
                                <button type="submit" className="add-button">수정하기</button>
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

export default VenderProductRegistrationFormEdit;
