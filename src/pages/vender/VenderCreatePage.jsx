import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/vender/createPage.css"





const VenderCreatePage = () => {

    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [categoryPreviews, setCategoryPreviews] = useState([null, null, null]);

    const handleImageChange = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    return (
        <div id="createPage-wrap">
            <p>나만의 사이트를 꾸며보세요!</p>
            <ul id="createPage-nav">
                <li><Link to="#">미리보기</Link></li>
            </ul>

            <div className="section">
                <label>로고 이미지</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageChange(e, setLogoPreview)}
                />
                {logoPreview && <img src={logoPreview} alt="로고 이미지 미리보기" className="preview" />}
            </div>

            <div className="section">
                <label>대문로고 이미지</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageChange(e, setBannerPreview)}
                />
                {bannerPreview && <img src={bannerPreview} alt="대문로고 이미지 미리보기" className="preview" />}
            </div>

            <div className="section">
                <label>업체명</label>
                <input type="text" placeholder="업체명을 입력해주세요!" />
            </div>

            <div className="section">
                <label>업체 설명</label>
                <textarea placeholder="자유롭게 작성해주세요"></textarea>
            </div>

            <div className="section">
                <label>카테고리 등록</label>
                {categoryPreviews.map((preview, index) => (
                    <div key={index} className="category-upload">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    const newPreviews = [...categoryPreviews];
                                    newPreviews[index] = imageUrl;
                                    setCategoryPreviews(newPreviews);
                                }
                            }} 
                            className="file-input"  // 파일 입력에 대한 클래스를 추가하여 숨길 준비
                        />
                        {preview && (
                        <div className="preview-container">
                            <img src={preview} alt={`카테고리 이미지 ${index + 1} 미리보기`} className="preview" />
                        </div>
                    )}
                    </div>
                ))}
                <button className="add-category">+ 추가</button>
            </div>

            <div className="section">
                <label>업체위치 [주소첨부]</label>
                <input type="text" placeholder="예정 주소를 입력해주세요" />
            </div>

            <div className="section">
                <label>카카오톡 채널 URL</label>
                <input type="text" placeholder="추가할 카카오톡 채널 URL을 입력해주세요" />
            </div>

            <button className="apply-button">적용하기</button>
        </div>
    );
}

export default VenderCreatePage;