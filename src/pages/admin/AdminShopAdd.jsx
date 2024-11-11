import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../../assets/css/admin/adminshopmanage.css';
import AdminSidebar from './include/AdminSidebar';

const AdminShopAdd = () => {
    const navigate = useNavigate(); // 뒤로가기 기능 추가
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [categoryPreviews, setCategoryPreviews] = useState([null, null, null]);
    const [shopName, setShopName] = useState('');
    const [shopDescription, setShopDescription] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [shopKakao, setShopKakao] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const handleCategoryImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newPreviews = [...categoryPreviews];
            newPreviews[index] = imageUrl;
            setCategoryPreviews(newPreviews);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div id="adminShopManage-wrap">
                <p className='admin-shop-title'>새로운 회사 정보를 등록해 주세요!</p>
                <ul id="adminShopManage-nav">
                    <li><button onClick={openModal} className="preview-button">미리보기</button></li>
                </ul>

                <div className="admin-shop-section">
                    <label>로고 이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setLogoPreview)}
                    />
                    {logoPreview && <img src={logoPreview} alt="로고 이미지 미리보기" className="preview" />}
                </div>

                <div className="admin-shop-section">
                    <label htmlFor='shop-name'>회사명</label>
                    <input
                        id='shop-name'
                        type="text"
                        placeholder="회사명을 입력해주세요!"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                    />
                </div>

                <div className="admin-shop-section">
                    <label htmlFor='shop-description'>회사 설명</label>
                    <textarea
                        id='shop-description'
                        placeholder="회사 설명을 작성해주세요"
                        value={shopDescription}
                        onChange={(e) => setShopDescription(e.target.value)}
                    />
                </div>

                <div className="admin-shop-section">
                    <label htmlFor='shop-location'>회사 위치</label>
                    <input
                        id='shop-location'
                        type="text"
                        placeholder="회사 주소를 입력해주세요"
                        value={shopLocation}
                        onChange={(e) => setShopLocation(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <button className="admin-apply-button"><Link to='/user/storedetail'>등록하기</Link></button>
                </div>
                {/* 미리보기 모달 */}
                {isModalOpen && (
                    <div className="modal" style={{ display: 'block' }}>
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <div className="sd-profile-container">
                                <div className="sd-profile-header">
                                    <h2 className="sd-store-name">{shopName || '샘플 회사명'}</h2>
                                </div>
                                <div className="sd-profile-content">
                                    <div className="sd-profile-image">
                                        <img src={logoPreview || 'placeholder-logo.png'} alt="logo preview" />
                                    </div>

                                    <div className="sd-profile-text">
                                        <div className="preview-info">
                                            <span>게시물 24     </span>
                                            <span>리뷰 128</span>
                                        </div>
                                        <p>{shopDescription || '회사 설명을 입력하세요.'}</p>
                                        <p>위치: {shopLocation || '회사 위치를 입력하세요.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminShopAdd;
