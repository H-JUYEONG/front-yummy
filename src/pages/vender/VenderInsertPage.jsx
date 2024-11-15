import React ,{useState , useEffect} from 'react';
import { Link  } from 'react-router-dom';


import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/insertPage.css';

import VenderHeader from './include/VenderHeader';
import VenderSidebar from './include/VenderSidebar';

//img
import ResizeIcon from '@rsuite/icons/Resize'; //미리보기 아이콘
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline'; //사진첨부 아이콘
import ArchiveIcon from '@rsuite/icons/Archive'; //이미지모양 아이콘
import TrashIcon from '@rsuite/icons/Trash'; //휴지통 아이콘





const VenderDashboard = () => {

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

    // 카테고리 추가 핸들러
    const addCategory = () => {
        setCategoryPreviews([...categoryPreviews, null]); // 새로운 카테고리 항목을 추가
    };
    const handleDeleteCategory = (index) => {
        const updatedCategoryPreviews = [...categoryPreviews];
        updatedCategoryPreviews.splice(index, 1); // 해당 인덱스의 항목 삭제
        setCategoryPreviews(updatedCategoryPreviews); // 상태 업데이트
    }

     // 미리보기 버튼 클릭 시 새로운 웹 창 열기
    const openPreviewInNewWindow = () => {
        const previewWindow = window.open('/user/storedetail', '_blank'); // 새 탭에서 '/vender/venderMain' 페이지 열기
        previewWindow.focus(); // 새 창이 열리면 포커스
    };
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 스크롤
    }, []);
    

    return (
        <>  
        
            <div className="vender-container">
                <div class="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <main className="main-content">
                            <div id="createPage-wrap">
                                <h1 className='sy-create-title'>나만의 사이트를 꾸며보세요!</h1>
                                <ul id="createPage-nav">
                                        <li>
                                            <button style={{ background: 'none', border: 'none' }} onClick={openPreviewInNewWindow}>
                                                <ResizeIcon className='formIcon' style={{ fontSize: '40px', color: '#007bff', backgroundColor: 'transparent'}} />
                                                <span>미리보기</span>
                                            </button>
                                        </li>
                                        
                                    
                                </ul>
                                
                                <div className='create-sy-flex-box'>
                                <div className="create-sy-section sy-img-margin-box">
                                    <h3 htmlFor='shop-name'>업체명</h3>
                                    <input className='short-input-txt' id='shop-name' type="text" placeholder="업체명을 입력해주세요!" name=''  />
                                </div>
                                

                                <div className="create-sy-section sy-img-margin-box">
                                    <div className='banner-flex'>
                                        <label htmlFor='bannerUpload'><h3>프로필이미지 추가</h3></label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleImageChange(e, setBannerPreview)}
                                            id="bannerUpload"
                                            style={{ display: 'none' }} // 파일 입력을 숨김
                                        />
                                        <label htmlFor="bannerUpload" className="upload-button">
                                            <ExpandOutlineIcon className='bannerIcon' style={{ fontSize: '24px', color: 'black',}} />
                                        </label>
                                    </div>
                                    {bannerPreview && <img src={bannerPreview} alt="프로필 이미지 미리보기" className="preview" />}
                                </div>
                                <div className="create-sy-section sy-img-margin-box">
                                
                                    <div className='banner-flex'>
                                        <label htmlFor='bannerUpload'><h3>베너이미지 추가</h3></label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleImageChange(e, setLogoPreview)}
                                            id="mainbannerUpload"
                                            style={{ display: 'none' }} // 파일 입력을 숨김
                                        />
                                        <label htmlFor="mainbannerUpload" className="upload-button">
                                            <ExpandOutlineIcon className='bannerIcon' style={{ fontSize: '24px', color: 'black',}} />
                                        </label>
                                    </div>
                                    
                                    {logoPreview && <img src={logoPreview} alt="베너이미지 미리보기" className="preview" />}
                                    
                                </div>
                                </div>

                                
                                <div className="create-sy-section">
                                    <h3><label htmlFor='shop-area'>업체위치 [주소첨부]</label></h3>
                                    <input className='long-input-txt' id='shop-area' type="text" placeholder="업체주소를 입력해주세요" name='' value='' />
                                </div>

                                <div className="create-sy-section">
                                    <h3><label htmlFor='shop-kakao'>카카오톡 채널 URL</label></h3>
                                    <input className='long-input-txt' id='shop-kakao' type="text" placeholder="추가할 카카오톡 채널 URL을 입력해주세요" name='' value=''/>
                                </div>
                                <div className="create-sy-section">
                                    <h3 htmlFor='shop-txt'>업체상세 설명</h3>
                                    <textarea  id='shop-txt' placeholder="자유롭게 작성해주세요" ></textarea>
                                </div>
                                
                                

                                
                                <div className='page-insert-btn'>
                                    
                                    <button className="sy-apply-button"><Link to='/vender'>적용하기</Link></button>
                                </div>    
                            </div>
                            
                            
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenderDashboard;
