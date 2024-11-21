import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VenderHeader from '../vender/include/VenderHeader';
import '../../assets/css/user/userstoredetail.css';
import cakeLogo from '../../assets/images/mainlogoimg02.avif';

const UserStoreDetail = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    //const {venderId} = useParams();
    //venderId
    // ** user또는 비회원 > product에있는 venderId값 넣기   // vender > authUser에있는 값 넣기
    const [venderId, setVenderId] = useState('');
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    //상품 리스트
    const [productList, setProductList] = useState([]);

    //카테고리
    const [categoryList, setCategoryList] = useState([]);

    
    //업체 플렛폼 부분
    const [detailVo, setDetailVo] = useState('');

    //map
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const KAKAOMAP = process.env.REACT_APP_MAP_REST_API_KEY

    useEffect(()=>{
        if (authUser && authUser.vender_id) {
            setVenderId(authUser.vender_id);
        } else {
            setVenderId(null); 
        }
    },[authUser])
    

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if(venderId != null){
            console.log("venderId ok")
            getdetails();
            goodsList();
            getOptions();
        }else{
            console.log("venderId no")
        }
        
        console.log('로케잇션은222???'+latitude)
        console.log('로케잇션은222???'+longitude)

        
        console.log('authUser값확인',authUser)

        console.log('venderId알려줘요',venderId)

    }, [venderId]);




    const getdetails = ()=>{
        console.log('*********//////////////',venderId)
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/getdetails/${venderId}`,
    
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
    
            responseType: 'json' //수신타입
            }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data.apiData);
            setDetailVo(response.data.apiData);
            
            
            setLatitude(response.data.apiData.latitude) //위도
            setLongitude(response.data.apiData.longitude) //경도
            
            console.log('**'+latitude);
            console.log('**'+longitude)
            
    
            }).catch(error => {
            console.log(error);
            });
    }


    //위도, 경도로 지도 표시
    // 카카오맵 API 로드 및 지도 표시
    useEffect(() => {
        console.log('로케잇션은???'+longitude)
        console.log('로케잇션은???'+latitude)
        console.log(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false`)


        if (longitude,latitude) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false`; // 여기에 발급받은 카카오 API 키 입력
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
            const container = document.getElementById('map'); // 지도 표시할 DOM 요소
            const options = {
                center: new window.kakao.maps.LatLng(latitude, longitude), // DB에서 가져온 위도, 경도를 지도 중심으로 설정
                level: 3, // 줌 레벨 (3: 보통, 1: 가까운 거리, 14: 더 멀리)
            };

            const map = new window.kakao.maps.Map(container, options); // 지도 객체 생성

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(latitude,longitude);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map); // 지도에 마커 표시
            });
        };
        document.body.appendChild(script); // script 태그로 카카오맵 API 로드
        }
        return () => {
            const scriptTag = document.querySelector(`script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP}&autoload=false"]`);
            if (scriptTag) {
            document.body.removeChild(scriptTag); // 컴포넌트가 언마운트 될 때 script 태그를 제거
            }
        };
    },[longitude, latitude]); // latitude, longitude 값이 바뀔 때마다 실행되도록 설정]);


    //상품 가져오기
    const goodsList = ()=>{
        //console.log(venderId,'no값 있나요 상품')
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/veder/goodsList/${venderId}`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log('ddddddddddd',response.data.apiData)

            //상품 넣기
            setProductList(response.data.apiData)
        
        }).catch(error => {
            console.log(error);
        });
        
    }

    //옵션 가져오기
    const getOptions = ()=>{
        //console.log(venderId,'no값 있나요 옵션')
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/options/${venderId}`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            setCategoryList(response.data.apiData)
            console.log('==============',response.data.apiData)
            

        }).catch(error => {
            console.log(error);
        });
    }

    const handleCategoryClick = (optionValueName) => {
        // 카테고리 클릭 시 선택된 카테고리 상태 업데이트
        setSelectedCategory(optionValueName);
    };

    // 선택된 카테고리에 맞는 상품 필터링
    const filteredProducts = selectedCategory
        ? productList.filter(product => product.optionValueName === selectedCategory)
        : productList;


    
    

    

    

    
    

    const handleKakaoChat = () => {
        window.open(`${detailVo.kakaoURL}`, '_blank');

    };

    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader />
            <main id="user-wrap-body" className="clearfix">
                <section id="user-wrap-main">
                    <div className="sd-profile-container">
                        <div className="sd-profile-header">
                        {detailVo.venderName ? <h2 className="sd-store-name">{detailVo.venderName}</h2> : <h2 className="sd-store-name">업체명을 입력해주세요!</h2>}

                            
                        </div>
                        <div className="sd-profile-content">
                            {/* 프로필 이미지 섹션 */}
                            <div className="sd-section sd-image-section">
                                <div className="sd-profile-image">
                                    <img src={detailVo.profileURL} alt="cakefactory" />
                                </div>
                            </div>

                            {/* 프로필 정보 섹션 */}
                            <div className="sd-section sd-info-section">
                                <div className="sd-profile-stats">
                                    <span>게시물 0</span>
                                    <span>리뷰 0</span>
                                    <button onClick={handleKakaoChat} className="kakao-chat-btn">
                                        <svg className="kakao-icon" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 3C6.477 3 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" fill="#FFE812"/>
                                            <path d="M12 6.5c-3.866 0-7 2.614-7 5.833 0 2.06 1.368 3.868 3.43 4.898-.151.517-.486 1.87-.556 2.164-.087.37.136.365.287.265.118-.078 1.878-1.276 2.632-1.792.395.057.8.087 1.207.087 3.866 0 7-2.614 7-5.833S15.866 6.5 12 6.5z" fill="#381F1F"/>
                                        </svg>
                                        카카오톡 문의
                                    </button>
                                </div>
                                <div className="sd-info-content">
                                    {detailVo.venderDescription}
                                    {/*<p>🎂케이크는 맛있게</p>
                                    <p>📍송파롤링스톤즈 - 송파평생학습원2층</p>
                                    <p>⭐케이크 주문제작 전문, 비건케이크까지🌱</p>
                                    <p>💕디자인과 맛 모두 놓치지 않는 케이크🍰</p>
                                    <p>🎨캐릭터, 포토, 생화케이크는 DM문의💌</p>
                                    <p>✔️주문마감 D-2</p>
                                    <p>✔️11시-20시</p>
                                    <p>⚡️디자인상담 1:1채팅 문의해주세요</p>*/}
                                </div>
                            </div>

                            {/* 지도 섹션 */}
                            <div className="sd-section sd-map-section">
                                <div className="sd-map-container">
                                    <div className="map-placeholder">
                                        {{latitude} ? (
                                            <div id="map" style={{ width: '100%', height: '100%', backgroundColor: 'red' }}></div> 
                                        ):(
                                            <>
                                            <p>지도 영역</p>
                                            <p>Kakao Maps </p>
                                            </>
                                        )}
                                        
                                        
                                    </div>
                                </div>
                                <div className="sd-map-info">
                                    <p className="sd-map-title">📍 매장 위치</p>
                                    {detailVo.venderAddress}
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="sd-divider" />

                    <div className="sd-category-container">
                    {categoryList && categoryList.length > 0 ? (
                        categoryList.map((category, index) => (
                            <div
                                key={index}  // categoryId를 고유 키로 사용
                                className={`sd-category-item ${selectedCategory === category.optionValueName ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.optionValueName)} // 클릭 시 카테고리 이름을 설정
                            >
                                <img
                                    src={category.option_value_image_url}  // 카테고리 이미지 경로
                                    alt={category.optionValueName}  // alt를 카테고리 이름으로 설정
                                />
                                <p>{category.optionValueName}</p>  {/* 카테고리 이름 표시 */}
                            </div>
                        ))
                    ) : (
                        <p>카테고리가 없습니다.</p>  // 카테고리가 없을 경우 메시지 표시
                    )}
                    </div>

                    <hr className="sd-divider" />

                    <div className="sd-products-container">
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link
                                to={`/user/cakedetail/${product.productId}`}
                                className="sd-product-item"
                                key={product.productId}
                            >
                                <div className="sd-product-image">
                                    <img src={product.productURL} alt='' />
                                </div>
                                <div className="sd-price-info">
                                    <p className="sd-product-name">{product.productName}</p>
                                    <p className="sd-price">{product.productPrice}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>상품이 없습니다.</p>  // 필터링된 상품이 없을 때 보여줄 메시지
                    )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserStoreDetail;