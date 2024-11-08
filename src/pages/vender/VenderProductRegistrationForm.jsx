import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/productregistrationform.css';
import VenderSidebar from './include/VenderSidebar';

// 옵션 선택 컴포넌트 (체크 박스 버전)
const OptionSelector = ({ optionName, options, selectedOptions, onSelect }) => {
    return (
        <div className="option-selector">
            <label>{optionName}</label>
            <div className="option-items">
                {options.map((option, index) => (
                    <div key={index} className="option-item">
                        <input
                            type="checkbox"
                            id={`${optionName}-${index}`}
                            checked={selectedOptions.includes(option.name)}
                            onChange={() => onSelect(option.name)}
                        />
                        <label htmlFor={`${optionName}-${index}`}>
                            <img
                                src={option.imageUrl}
                                alt={option.name}
                                className="option-image"
                            />
                            <span className="option-name">{option.name}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
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

// ProductImages 컴포넌트
const ProductImages = ({ images, handleImageChange }) => {
    return (
        <div className="form-group">
            <label>상품 이미지 등록</label>
            <div className="image-upload-container">
                <div className="image-upload">
                    <label htmlFor="mainImage" className="image-placeholder">
                        {images.main ? (
                            <img src={images.main} alt="메인이미지" />
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
                                <img src={image} alt={`서브이미지${index + 1}`} />
                            ) : (
                                <span>서브이미지{index + 1}</span>
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
    );
};

function ProductRegistrationForm() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [images, setImages] = useState({ main: null, subs: [null, null, null] });
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // 옵션 상태 관리
    const [availableOptions, setAvailableOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});

    // 옵션 데이터 불러오기
    useEffect(() => {
        // 실제 구현시에는 API 호출로 대체
        const fetchOptions = async () => {
            try {
                // 임시 데이터
                const mockOptions = [
                    {
                        id: 1,
                        name: '크기',
                        subOptions: [
                            { name: '소형', imageUrl: 'https://via.placeholder.com/150' },
                            { name: '중형', imageUrl: 'https://via.placeholder.com/150' },
                            { name: '대형', imageUrl: 'https://via.placeholder.com/150' }
                        ]
                    },
                    {
                        id: 2,
                        name: '시트 맛',
                        subOptions: [
                            { name: '초코', imageUrl: 'https://via.placeholder.com/150' },
                            { name: '바닐라', imageUrl: 'https://via.placeholder.com/150' },
                            { name: '레드벨벳', imageUrl: 'https://via.placeholder.com/150' }
                        ]
                    }
                ];
                setAvailableOptions(mockOptions);
            } catch (error) {
                console.error('옵션 로드 중 에러:', error);
            }
        };

        fetchOptions();
    }, []);

    // 옵션 선택 핸들러
    const handleOptionSelect = (optionType, value) => {
        setSelectedOptions(prev => {
            const currentOptions = prev[optionType] ? [...prev[optionType]] : [];
            if (currentOptions.includes(value)) {
                return {
                    ...prev,
                    [optionType]: currentOptions.filter(opt => opt !== value)
                };
            } else {
                return {
                    ...prev,
                    [optionType]: [...currentOptions, value]
                };
            }
        });
    };

    // 옵션 페이지로 이동
    const handleAddOptions = () => {
        navigate('/vender/option');  // VenderOption 페이지 경로
    };

    const handleImageChange = useCallback((e, index) => {
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
    }, [images]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        // 제출 로직에 선택된 옵션 포함
        console.log({
            productName,
            productType,
            images,
            description,
            price,
            selectedOptions
        });
    }, [productName, productType, images, description, price, selectedOptions]);

    return (
        <div className="vender-container product-registration">
            <VenderSidebar />
            <div className="vender-content">
                <form className="main-content" onSubmit={handleSubmit}>
                    <h1 className="product-list-title">상품 등록</h1>

                    <div className="form-group">
                        <label htmlFor="productName">상품명</label>
                        <input
                            type="text"
                            id="productName"
                            placeholder="상품명을 입력해주세요"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="input-text"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productType">상품 종류 선택</label>
                        <select
                            id="productType"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            className="input-select"
                        >
                            <option value="">상품 종류를 선택해주세요</option>
                            <option value="케이크">케이크</option>
                            <option value="디저트">디저트</option>
                        </select>
                    </div>

                    <ProductImages images={images} handleImageChange={handleImageChange} />

                    <div className="form-group">
                        <label htmlFor="price">가격</label>
                        <input
                            type="text"
                            id="price"
                            placeholder="가격을 입력해주세요"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input-text"
                        />
                    </div>

                    <ProductEditor
                        description={description}
                        setDescription={setDescription}
                    />

                    {/* 옵션 선택 섹션 */}
                    <div className="options-section">
                        <div className="options-header">
                            <h2>상품 옵션 선택</h2>
                            <button
                                type="button"
                                className="add-options-button"
                                onClick={handleAddOptions}
                            >
                                옵션 추가하기
                            </button>
                        </div>

                        {availableOptions.map(option => (
                            <OptionSelector
                                key={option.id}
                                optionName={option.name}
                                options={option.subOptions}
                                selectedOptions={selectedOptions[option.name.toLowerCase().replace(/\s+/g, '')] || []}
                                onSelect={(value) => handleOptionSelect(
                                    option.name.toLowerCase().replace(/\s+/g, ''),
                                    value
                                )}
                            />
                        ))}
                    </div>

                    <div className="form-group centered-button-group">
                        <button type="submit" className="add-button">상품 등록하기</button>
                    </div>
                </form>
                <button className="floating-preview-button">미리보기</button>
            </div>
        </div>
    );
}

export default ProductRegistrationForm;
