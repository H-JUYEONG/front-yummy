import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 기본 테마 CSS

function ProductDescriptionEditor() {
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    return (
        <div>
            <h2>상품 설명</h2>
            <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
                placeholder="상품 설명을 작성하세요..."
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image'],
                        [{ 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean'] // 스타일 초기화
                    ]
                }}
            />
            <button onClick={() => console.log(description)}>
                설명 저장
            </button>
        </div>
    );
}

export default ProductDescriptionEditor;
