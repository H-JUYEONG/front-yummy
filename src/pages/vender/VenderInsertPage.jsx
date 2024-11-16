import React ,{useState , useEffect} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';


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

    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [bannerFile, setBannerFile] = useState(null);       
    const [bannerPreview, setBannerPreview] = useState(null);


    //등록정보들
    const [shopName, setShopName] = useState('');
    const [kakaoURL, setKakaoURL] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [content, setContent] = useState('');


    //주소검색 api연결
    
    
    //로드확인
    // const openPostcode = (e) => {
    //     setShopAddress(e.target.value)
    // };
    // useEffect(() => {
        // Daum Postcode API가 로드되었는지 확인
    //     if (!window.daum || !window.daum.Postcode) {
    //         console.error("Daum Postcode API가 로드되지 않았습니다.");
    //     }
    // }, []);

    const handleLogoImageChange = (e, setPreview) => {
        const logoFile = e.target.files[0];
        if (logoFile) {
            setLogoFile(logoFile)
            const imageUrl = URL.createObjectURL(logoFile);
            setLogoPreview(imageUrl);
        }
    };
    const handleBannerImageChange = (e, setPreview) => {
        const bannerFile = e.target.files[0];
        if (bannerFile) {
            setBannerFile(bannerFile)
            const imageUrl = URL.createObjectURL(bannerFile);
            setPreview(imageUrl);
        }
    };
    const handleAddress = (e)=>{
        setShopAddress(e.target.value);
    }
    const handleContent = (e)=>{
        setContent(e.target.value);
    }
     // 입력창들관리
    const handleShopName = (e) =>{
        setShopName(e.target.value);
    }
    const handelKakaoURL = (e)=>{
        setKakaoURL(e.target.value);
    }

  

     // 미리보기 버튼 클릭 시 새로운 웹 창 열기
    const openPreviewInNewWindow = () => {
        const previewWindow = window.open('/user/storedetail', '_blank'); // 새 탭에서 '/vender/venderMain' 페이지 열기
        previewWindow.focus(); // 새 창이 열리면 포커스
    };
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 스크롤
    }, []);



    //****** 업체정보 등록 *******
    const handleSubmit = (e)=>{
        e.preventDefault();

        if (logoFile instanceof File) {
            console.log('logoFile 파일입니다.');
        } else {
            console.log('logoFile 파일이 아닙니다.');
        }
        
        const formData = new FormData();
        
        formData.append('venderId', 1);
        formData.append('venderName', shopName);
        formData.append('venderAddress', shopAddress);
        formData.append('district', '성동구');
        formData.append('latitude', 1.1);
        formData.append('longitude', 2.2);
        formData.append('kakaoURL', kakaoURL);
        formData.append('venderDescription', content);

        formData.append('bannerFile',bannerFile); //배너이미지
        formData.append('profileFile', logoFile); //프로필

        console.log(formData)

        axios({
            method: 'put',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/svenderVo`,
            
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response); //수신데이타
            
        
        }).catch(error => {
            console.log(error);
        });
        



    }


    

    return (
        <>  
            
            <div className="vender-container">
                <div class="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <main className="main-content">
                        
                        <form onSubmit={handleSubmit}>
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
                                    <input className='short-input-txt' id='shop-name'
                                        type="text" placeholder="업체명을 입력해주세요!" name='' onChange={handleShopName} value={shopName}/>
                                </div>
                                

                                <div className="create-sy-section sy-img-margin-box">
                                    <div className='banner-flex'>
                                        <label htmlFor='bannerUpload'><h3>프로필이미지 추가</h3></label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleLogoImageChange(e, setLogoPreview, setLogoFile)}
                                            id="bannerUpload"
                                            style={{ display: 'none' }} // 파일 입력을 숨김
                                        />
                                        <label htmlFor="bannerUpload" className="upload-button">
                                            <ExpandOutlineIcon className='bannerIcon' style={{ fontSize: '24px', color: 'black',}} />
                                        </label>
                                    </div>
                                    {logoPreview && <img src={logoPreview} alt="프로필 이미지 미리보기" className="preview" />}
                                </div>
                                <div className="create-sy-section sy-img-margin-box">
                                
                                    <div className='banner-flex'>
                                        <label htmlFor='mainbannerUpload'><h3>베너이미지 추가</h3></label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleBannerImageChange(e, setBannerPreview, setBannerFile)}
                                            id="mainbannerUpload"
                                            style={{ display: 'none' }} // 파일 입력을 숨김
                                        />
                                        <label htmlFor="mainbannerUpload" className="upload-button">
                                            <ExpandOutlineIcon className='bannerIcon' style={{ fontSize: '24px', color: 'black',}} />
                                        </label>
                                    </div>
                                    
                                    {bannerPreview && <img src={bannerPreview} alt="베너이미지 미리보기" className="preview" />}
                                    
                                </div>
                                </div>

                                
                                <div className="create-sy-section">
                                    <h3><label htmlFor='shop-area' >업체위치 [주소첨부]</label></h3>
                                    <input className='long-input-txt' id='shop-area' type="text" placeholder="" name='' onChange={handleAddress} value={shopAddress}  />
                                </div>
                                
                                
                                

                                <div className="create-sy-section">
                                    <h3><label htmlFor='shop-kakao'>카카오톡 채널 URL</label></h3>
                                    <input className='long-input-txt' id='shop-kakao' type="text" placeholder="추가할 카카오톡 채널 URL을 입력해주세요" name='' value={kakaoURL} onChange={handelKakaoURL}/>
                                </div>
                                <div className="create-sy-section">
                                    <h3 htmlFor='shop-txt'>업체상세 설명</h3>
                                    <textarea  id='shop-txt' placeholder="자유롭게 작성해주세요" onChange={handleContent} >{content}</textarea>
                                </div>
                                
                                

                                
                                <div className='page-insert-btn'>
                                    
                                    <button type='submit' className="sy-apply-button">적용하기</button>
                                </div>    
                            </div>
                            </form>
                            
                            
                        </main>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default VenderDashboard;
