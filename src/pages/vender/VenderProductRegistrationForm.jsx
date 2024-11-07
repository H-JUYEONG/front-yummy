import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/product.css'; // 상품 등록 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';

const ProductEditor = ({ description, setDescription }) => {
    const quillRef = useRef(null);

    const imageHandler = () => {
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
                        const range = quill.getSelection();
                        if (range) {
                            quill.insertEmbed(range.index, 'image', reader.result);
                        }
                    }
                };
            }
        };
    };

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
        }
    };

    return (
        <div className="form-group">
            <label htmlFor="description">상품 설명</label>
            <ReactQuill
                ref={quillRef}
                id="description"
                value={description}
                onChange={setDescription}
                placeholder="상품 설명을 작성해주세요..."
                className="textarea-editor"
                theme="snow"
                modules={modules}
            />
        </div>
    );
};

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
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [images, setImages] = useState({ main: null, subs: [null, null, null] });
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState({
        cakeSize: '',
        sheetFlavor: '',
        creamFlavor: '',
        backgroundColor: '',
        creamPlacement: '',
        creamColor: '',
        decorationType: '',
        decorationColor: ''
    });

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

    const handlePreview = () => {
        alert('미리보기 버튼 클릭됨! 여기서 미리보기 기능을 구현할 수 있습니다.');
    };

    return (
        <div className="vender-container">
            <VenderSidebar />
            <div className="vender-content">
                <div className="main-content">
                    <h1 className="product-list-title">상품 등록</h1>

                    {/* 상품명 입력란 */}
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

                    {/* 상품 종류 선택 */}
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

                    {/* 상품 이미지 등록 */}
                    <ProductImages images={images} handleImageChange={handleImageChange} />

                    {/* 가격 입력란 */}
                    <div className="form-group">
                        <label htmlFor="price">가격</label>
                        <input
                            type="text"
                            id="price"
                            placeholder="가격을 입력해주세요"
                            className="input-text"
                        />
                    </div>

                    {/* 상품 설명 에디터 */}
                    <ProductEditor
                        description={description}
                        setDescription={setDescription}
                    />

                    {/* 상품 옵션 설정 */}
                    <div className="form-group">
                        <label>상품 옵션 설정</label>
                        <div className="options-container">
                            {Object.keys(options).map((key) => (
                                <div key={key} className="option-item">
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        type="text"
                                        id={key}
                                        value={options[key]}
                                        onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
                                        className="input-text"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 등록 버튼 */}
                    <div className="form-group">
                        <button type="submit" className="add-button">상품 등록하기</button>
                    </div>
                </div>
            </div>
            {/* 떠다니는 미리보기 버튼 */}
            <button className="floating-preview-button" onClick={handlePreview}>
                미리보기
            </button>
        </div>
    );
}

export default ProductRegistrationForm;
