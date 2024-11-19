import React ,{useState , useEffect, useContext, useRef} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import {useVenderContext} from '../../context/VenderContext';


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
import { AlignRight } from 'lucide-react';






const VenderInsertPage = () => {

    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem('authUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const venderId = authUser?.vender_id || null;

    // useVenderContext 훅을 사용하여 데이터 업데이트 함수와 상태를 가져옴
    const { venderData, updateVenderData } = useVenderContext();

    const [previewWindow, setPreviewWindow] = useState(null);  // 새 창을 관리할 상태
    const previewWindowRef = useRef(null); // 새 창의 참조


    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [bannerFile, setBannerFile] = useState(null);       
    const [bannerPreview, setBannerPreview] = useState(null);


    //등록정보들
    const [shopName, setShopName] = useState('');
    const [kakaoURL, setKakaoURL] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [content, setContent] = useState('');

    //변경된 값만 저장용도
    const [nonce, setNonce] = useState({
        venderName: '',
        shopAddress: '',
        district: '',
        latitude: '',
        longitude: '',
        kakaoURL: '',
        venderDescription: '',
        bannerFile: '',
        profileFile: ''
    })

    //주소 검색
    
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    //지도에 필요한 좌표
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //API 로딩 관리
    const [postcodeLoaded, setPostcodeLoaded] = useState(false); // 주소검색
    const [mapsLoaded, setMapsLoaded] = useState(false); // 지도 API 로드 상태  

    //수정폼

    const firstList = async ()=>{
        console.log('시작')
        try {
            const response = await axios({
            method: 'get',          // put, post, delete                   
            url:`${process.env.REACT_APP_API_URL}/api/svenderlist/${venderId}`,
            responseType: 'json' //수신타입
        });
        
            console.log(response); //수신데이타
            console.log(response.data.apiData)
            const data = response.data.apiData;

            // URL을 File로 변환하는 함수
            const convertUrlToFile = async (url, filename) => {
                const response = await fetch(url);  // URL에서 이미지 다운로드
                const blob = await response.blob(); // Blob 객체로 변환
                const file = new File([blob], filename, { type: blob.type }); // Blob을 File 객체로 변환
                return file;
            };

            // bannerURL과 profileURL을 File로 변환
            const bannerFile = data.bannerURL ? await convertUrlToFile(data.bannerURL, "banner.jpg") : null;
            const logoFile = data.profileURL ? await convertUrlToFile(data.profileURL, "profile.jpg") : null;

            
            setNonce({
                venderName: data.shopName || '',
                shopAddress:data.venderAddress || '',
                district:data.district || '',
                latitude:data.latitude || '',
                longitude:data.longitude || '',
                kakaoURL:data.kakaoURL || '',
                content:data.venderDescription || '',
                bannerFile:bannerFile || '',
                logoFile:logoFile || ''
            })

            setShopName(data.venderName || "");
            setLogoPreview(data.profileURL || "");
            setBannerPreview(data.bannerURL || "");
            setShopAddress(data.venderAddress || "");
            setKakaoURL(data.kakaoURL || "");
            setContent(data.venderDescription || "");
            //.log(data.venderName)

            updateVenderData({
                venderName: data.venderName,
                content: data.venderDescription,
                logoPreview:data.profileURL,
                bannerPreview: data.bannerURL,
                shopAddress: data.venderAddress
            })

            console.log(updateVenderData)

        }catch(error)  {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        firstList();

    },[])
    useEffect(()=>{
        console.log(venderData)

    },[venderData])


    const handleLogoImageChange = (e, setPreview) => {
        const logoFile = e.target.files[0];
        if (logoFile) {
            setLogoFile(logoFile)
            const pimageUrl = URL.createObjectURL(logoFile);
            setLogoPreview(pimageUrl);
            updateVenderData({ logoPreview:pimageUrl});
        }
    };
    const handleBannerImageChange = (e, setPreview) => {
        const bannerFile = e.target.files[0];
        if (bannerFile) {
            setBannerFile(bannerFile)
            const bimageUrl = URL.createObjectURL(bannerFile);
            setBannerPreview(bimageUrl);
            updateVenderData({ bannerPreview:bimageUrl });
        }
    };
    const handleAddress = (e)=>{
        setShopAddress(e.target.value);
    }
    const handleContent = (e)=>{
        setContent(e.target.value);
        updateVenderData({ content: e.target.value });
    }
    const handleShopName = (e) =>{
        setShopName(e.target.value);
        updateVenderData({ venderName: e.target.value });
    }
    const handelKakaoURL = (e)=>{
        setKakaoURL(e.target.value);
    }

    //주소검색
    //Daum 우편번호 API 스크립트를 동적으로 로드
    useEffect(() => {
        // Daum 우편번호 API 로드
        const postcodeScript = document.createElement('script');
        postcodeScript.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        postcodeScript.async = true;
    
        postcodeScript.onload = () => {
            console.log('Daum Postcode API 로드 완료');
            setPostcodeLoaded(true); // 우편번호 API 로드 완료
        };
    
        postcodeScript.onerror = () => {
            console.error('Daum Postcode API 로드 실패');
        };
    
        // Daum 지도 API 로드
        const mapsScript = document.createElement('script');
        mapsScript.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6b812f78ce9508fcc788afd21fa76b3b&autoload=false&libraries=services"; // API Key를 입력하세요.
        mapsScript.async = true;
    
        mapsScript.onload = () => {
            console.log('Daum Maps API 로드 완료');
            window.daum.maps.load(() => {
                console.log('Daum 지도 API 로드 완료 후 처리');
                setMapsLoaded(true);  // 지도 API 로드 후 mapsLoaded를 true로 설정
            });
        };
    
        mapsScript.onerror = () => {
            console.error('Daum Maps API 로드 실패');
        };
    
        // 스크립트들을 head에 추가
        document.head.appendChild(postcodeScript);
        document.head.appendChild(mapsScript);
    
        // Cleanup: 컴포넌트가 unmount될 때 스크립트 제거
        return () => {
            document.head.removeChild(postcodeScript);
            document.head.removeChild(mapsScript);
        };
    }, []);
    
    const openPostcode = () => {
        // 두 API가 모두 로드되었을 때만 실행
        if (postcodeLoaded && mapsLoaded) { 
            // 우편번호 API가 로드되었는지 확인
            if (window.daum && window.daum.Postcode) {
                // 우편번호 API 실행
                new window.daum.Postcode({
                    oncomplete: function (data) {
                        let addr = '';  // 최종 주소
                        let extraAddr = '';  // 참고 항목
    
                        // 주소 유형에 따라 주소를 선택
                        if (data.userSelectedType === 'R') { // 도로명 주소를 선택한 경우
                            addr = data.roadAddress;
                        } else { // 지번 주소를 선택한 경우
                            addr = data.jibunAddress;
                        }
    
                        // 도로명 주소 선택 시 추가 정보 처리
                        if (data.userSelectedType === 'R') {
                            // 법정동명이 있을 경우 추가
                            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                extraAddr += data.bname;
                            }
                            // 건물명이 있고 공동주택일 경우 추가
                            if (data.buildingName !== '' && data.apartment === 'Y') {
                                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                            }
                            if (extraAddr !== '') {
                                extraAddr = ' (' + extraAddr + ')';
                            }
                        }
    
                        // 상태 업데이트
                        setPostcode(data.zonecode);
                        setShopAddress(addr);
                        setExtraAddress(extraAddr);
                        setDetailAddress(''); // 상세주소 입력 필드를 위한 초기화
                        
                        console.log(shopAddress);
                        
                        

                        // 지도 API가 로드된 후에 Geocoder 사용
                        if (window.daum && window.daum.maps) {
                            console.log("jw!")
                            const geocoder = new window.daum.maps.services.Geocoder();
                            geocoder.addressSearch(addr, function (results, status) {
                                if (status === window.daum.maps.services.Status.OK) {
                                    const result = results[0];
                                    setLatitude(result.y);  // 위도
                                    setLongitude(result.x);  // 경도
                                    console.log("Latitude: ", result.y, "Longitude: ", result.x);
                                } else {
                                    console.error('주소 검색 실패');
                                }
                            });
                        } else {
                            console.error('Daum 지도 API가 완전히 로드되지 않았습니다.');
                        }
    
                        // 팝업에서 검색결과 항목 클릭 후 상세주소로 포커스 이동
                        document.getElementById("shop-area").focus();
                    }
                }).open();
            } else {
                console.error('Daum Postcode API가 로드되지 않았습니다.');
            }
        } else {
            console.error('Daum 지도 API 또는 우편번호 API가 로드되지 않았습니다.');
        }
    };



    
     // 미리보기 버튼 클릭 시 새로운 웹 창 열기
    const openPreviewInNewWindow = (e) => {
        e.preventDefault();
        const newWindow = window.open(`/vender/exeStoreDetail/${venderId}`, '_blank'); // 새 탭에서 '/vender/venderMain' 페이지 열기
        // 새 창이 정상적으로 열렸는지 확인
        if (newWindow) {
            setPreviewWindow(newWindow);
            previewWindowRef.current = newWindow; // 새 창 참조 저장
            // 새 창이 열리면 포커스
            newWindow.focus(); 
        } else {
            console.error("새 창이 열리지 않았습니다.");
        }
    };



    // venderData가 변경될 때마다 새 창에 데이터를 전송
    useEffect(() => {
        if (previewWindowRef.current) {
            previewWindowRef.current.postMessage(venderData, '*');  // 새 창에 데이터 전송
        }
    }, [venderData]);



    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 스크롤
    }, []);



    //****** 업체정보 등록 *******
    const handleSubmit = (e)=>{
        e.preventDefault();


        if (bannerFile instanceof File) {
            console.log('logoFile 파일입니다.');
        } else {
            console.log('logoFile 파일이 아닙니다.');
        }
        
        const formData = new FormData();
        
        formData.append('venderName', shopName || nonce.shopName);
        formData.append('venderAddress', shopAddress || nonce.shopAddress);
        formData.append('district', '성동구' || nonce.district);
        formData.append('latitude', latitude || nonce.latitude);
        formData.append('longitude', longitude || nonce.longitude);
        formData.append('kakaoURL', kakaoURL || nonce.kakaoURL);
        formData.append('venderDescription', content || nonce.content);

        formData.append('bannerFile', bannerFile || nonce.bannerFile); //배너이미지
        formData.append('profileFile', logoFile || nonce.logoFile); //프로필

        console.log(formData)

        axios({
            method: 'put',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/svenderVo/${venderId}`,
            
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data.result)


            if(response.data.result == "success"){
                alert("업체정보가 저장되었습니다!")
                navigate(`/user/storedetail/${venderId}`)
            }else{
                alert("정보등록에 실패하였습니다.")
            }
            
        
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
                                    <h3><label htmlFor='shop-area' onClick={openPostcode} >업체위치 [주소검색]</label></h3>
                                    <input className='long-input-txt' id='shop-area'  type="text" placeholder="" name='' onChange={handleAddress} value={shopAddress}  />
                                </div>
                                
                                
                                

                                <div className="create-sy-section">
                                    <h3><label htmlFor='shop-kakao'>카카오톡 채널 URL</label></h3>
                                    <input className='long-input-txt' id='shop-kakao' type="text" placeholder="추가할 카카오톡 채널 URL을 입력해주세요" name='' value={kakaoURL} onChange={handelKakaoURL}/>
                                </div>
                                <div className="create-sy-section">
                                    <h3 htmlFor='shop-txt'>업체상세 설명</h3>
                                    <textarea  id='shop-txt' placeholder="자유롭게 작성해주세요" value={content} onChange={handleContent} ></textarea>
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
}

export default VenderInsertPage;
