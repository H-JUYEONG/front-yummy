import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
const OptionSelector = ({ optionTypeId, optionName, options, selectedOptions = [], onSelect }) => {
    return (
        <div className="option-selector">
            <label>{optionName}</label>
            <div className="option-items">
                {options.map((option) => (
                    <div
                        key={option.optionValueId}
                        className={`option-item ${selectedOptions.includes(option.optionValueId) ? 'selected' : ''}`}
                    >
                        <input
                            type="checkbox"
                            id={`${optionName}-${option.optionValueId}`}
                            checked={option.isSelected} // isSelected 값 사용
                            onChange={() => onSelect(optionTypeId, option.optionValueId)} // 옵션 선택
                        />
                        <label htmlFor={`${optionName}-${option.optionValueId}`}>
                            {option.optionValueImageUrl && (
                                <img
                                    src={option.optionValueImageUrl}
                                    alt={option.optionValueName}
                                    className="option-image"
                                />

                            )}

                            <span className="option-name">{option.optionValueName}</span>
                        </label>
                    </div>
                ))}
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
                        <button onClick={() => {
                            console.log("도안 선택 버튼 클릭됨:", design); // 클릭 로그
                            onSelectDesign(design);
                        }}>
                            선택
                        </button>
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
                key={description} // 상태가 바뀔 때마다 키를 변경하여 강제 업데이트
                ref={quillRef}
                id="description"
                value={description}
                onChange={handleChange}
                placeholder="상품 설명을 작성해주세요..."
                className="textarea-editor"
                theme="snow"
                modules={modules}
                formats={formats}
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, myDesignsResponse, wishlistDesignsResponse, optionsResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/vender/products/${productId}`),
                    axios.get(`${API_URL}/api/my-designs`, { params: { memberId } }),
                    axios.get(`${API_URL}/api/wishlist-designs`, { params: { memberId } }),
                    axios.get(`${API_URL}/api/vender/products/${productId}/options`, { params: { venderId } }),
                ]);

                const { product } = productResponse.data;
                const myDesigns = myDesignsResponse.data;
                const wishlistDesigns = wishlistDesignsResponse.data;
                const availableOptionsData = optionsResponse.data.options;

                console.log("Product 데이터:", product);

                // 상태 초기화
                if (product) {
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
                    setPreview({
                        main: product.productImage1Url || null,
                        subs: [
                            product.productImage2Url || null,
                            product.productImage3Url || null,
                            product.productImage4Url || null,
                        ],
                    });

                    if (product.cakeDesignTitle || product.cakeDesignImageUrl) {
                        setSelectedDesign({
                            cakeDesignId: product.cakeDesignId, // 유지
                            cakeDesignTitle: product.cakeDesignTitle,
                            cakeDesignImageUrl: product.cakeDesignImageUrl,
                        });
                    }
                    if (product.selectedOptions) {
                        const mappedOptions = availableOptions.map(option => ({
                            ...option,
                            optionValues: option.optionValues.map(value => ({
                                ...value,
                                isSelected: (product.selectedOptions[option.optionTypeId] || []).includes(value.optionValueId),
                            })),
                        }));
                        setAvailableOptions(mappedOptions);
                    }
                }

                const formattedOptions = availableOptionsData.map(option => ({
                    ...option,
                    optionTypeName: OPTION_TYPE_NAME_KO[option.optionTypeId] || option.optionTypeName,
                    optionValues: option.optionValues.map(value => ({
                        ...value,
                        isSelected: (product.selectedOptions[option.optionTypeId] || []).includes(value.optionValueId),
                    })),
                }));

                setAvailableOptions(formattedOptions);
                setAvailableDesigns(wishlistDesigns);
                setMyDesigns(myDesigns);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        };

        fetchData();
    }, [productId, memberId]);

    const openDesignModal = useCallback(() => {
        setIsDesignModalOpen(true);
    }, []);

    const closeDesignModal = useCallback(() => {
        setIsDesignModalOpen(false);
    }, []);

    const handleDesignSelect = (design) => {
        console.log("선택된 도안 데이터:", design); // 디버깅용 로그
        setSelectedDesign(design); // 선택된 도안을 상태로 설정
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
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/products/${productId}/options`, {
                    params: { venderId },
                });

                const optionsData = response.data.options || [];

                // 선택된 옵션 데이터 초기화
                const initialSelectedOptions = optionsData.reduce((acc, option) => {
                    const selectedValues = option.optionValues
                        .filter(value => value.isSelected) // isSelected가 true인 경우만 선택
                        .map(value => value.optionValueId);

                    if (selectedValues.length > 0) {
                        acc[option.optionTypeId] = selectedValues;
                    }

                    return acc;
                }, {});

                setAvailableOptions(optionsData); // 옵션 데이터 설정
                setSelectedOptions(initialSelectedOptions); // 선택된 옵션 상태 설정
            } catch (error) {
                console.error("옵션 데이터 로드 실패:", error);
            }
        };

        fetchOptions();
    }, [productId, venderId]);



    // 필터링된 옵션
    const visibleOptions = useMemo(() => {
        if (!availableOptions.length) return [];
        return availableOptions.map(option => ({
            ...option,
            optionValues: option.optionValues.map(value => ({
                ...value,
                isSelected: value.isSelected, // isSelected 값 유지
            })),
        }));
    }, [availableOptions]);
    // 옵션 선택 핸들러
    const handleOptionSelect = useCallback((optionTypeId, valueId) => {
        setSelectedOptions((prevState) => {
            const currentValues = prevState[optionTypeId] || [];
            const updatedValues = currentValues.includes(valueId)
                ? currentValues.filter((id) => id !== valueId) // 선택 해제
                : [...currentValues, valueId]; // 새로 선택

            console.log(`옵션 유형 ${optionTypeId} 업데이트:`, updatedValues); // 디버깅 로그

            // isSelected 값을 동기화
            const updatedOptions = availableOptions.map(option => ({
                ...option,
                optionValues: option.optionValues.map(value => ({
                    ...value,
                    isSelected: updatedValues.includes(value.optionValueId),
                })),
            }));
            setAvailableOptions(updatedOptions);

            return {
                ...prevState,
                [optionTypeId]: updatedValues,
            };
        });
    }, [availableOptions]);

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

    const handleProductSubmit = async () => {
        try {
            const productFormData = new FormData();
            productFormData.append("venderId", venderId || "");
            productFormData.append("productName", productName || "");
            productFormData.append("price", price || 0);
            productFormData.append("description", description || "");
            productFormData.append("isVisible", 1);

            if (selectedDesign?.cakeDesignId) {
                productFormData.append("cakeDesignId", selectedDesign.cakeDesignId);
            }

            // 메인 이미지 추가 (있을 경우에만)
            if (images.main) {
                productFormData.append("mainImage", images.main);
            }

            // 서브 이미지 추가 (있을 경우에만)
            images.subs.forEach((subImage, index) => {
                if (subImage) {
                    productFormData.append(`subImages`, subImage);
                }
            });

            // 상품 데이터 전송
            const response = await axios.put(
                `${API_URL}/api/vender/products/${productId}`,
                productFormData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("상품 수정 성공:", response.data);
            alert("상품이 성공적으로 수정되었습니다!");
        } catch (error) {
            console.error("상품 수정 실패:", error.response || error.message);
            alert("상품 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleOptionsSubmit = async () => {
        try {
            // selectedOptions 자체를 payload로 전송
            const optionsPayload = Object.fromEntries(
                Object.entries(selectedOptions).map(([key, value]) => [Number(key), value])
            );
    
            const optionsResponse = await axios.put(
                `${API_URL}/api/vender/products/${productId}/options`,
                optionsPayload, // selectedOptions 키 제거
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("옵션 수정 성공:", optionsResponse.data);
            alert("옵션이 성공적으로 수정되었습니다!");
        } catch (error) {
            console.error("옵션 수정 실패:", error.response || error.message);
            alert("옵션 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 상품 데이터 전송
        await handleProductSubmit();

        // 옵션 데이터 전송
        await handleOptionsSubmit();
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

                            {/* 상품 설명 작성 */}
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
                                {visibleOptions.map((option) => (
                                    <OptionSelector
                                        key={option.optionTypeId}
                                        optionTypeId={option.optionTypeId}
                                        optionName={option.optionTypeName}
                                        options={option.optionValues} // 옵션 값 전달
                                        selectedOptions={selectedOptions[option.optionTypeId] || []} // 선택된 옵션 전달
                                        onSelect={handleOptionSelect}
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
                                        {selectedDesign.cakeDesignImageUrl ? (
                                            <img src={selectedDesign.cakeDesignImageUrl} alt={selectedDesign.cakeDesignTitle || "선택된 도안"} />
                                        ) : (
                                            <span>이미지 없음</span>
                                        )}
                                        <span>{selectedDesign.cakeDesignTitle || "도안 제목 없음"}</span>
                                    </div>
                                )}
                            </div>

                            {/* 도안 모달 */}
                            <CakeDesignModal
                                isOpen={isDesignModalOpen}
                                onRequestClose={closeDesignModal}
                                designs={availableDesigns}
                                myDesigns={myDesigns} // 내가 그린 도안 전달
                                onSelectDesign={handleDesignSelect} // 함수 연결
                            />
                            <div className="form-group centered-button-group">
                                <button type="submit" className="add-button">수정하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default VenderProductRegistrationFormEdit;
