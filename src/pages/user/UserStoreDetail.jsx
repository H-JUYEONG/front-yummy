import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VenderHeader from '../vender/include/VenderHeader';
import '../../assets/css/user/userstoredetail.css';
import cakeLogo from '../../assets/images/mainlogoimg02.avif';

const UserStoreDetail = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {venderId} = useParams();
    const [detailVo, setDetailVo] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    

     // 위치 데이터를 저장할 상태
    const [location, setLocation] = useState(null);
    const kakaoMapApiKey = process.env.REACT_APP_MAP_REST_API_KEY;

    useEffect(() => {
        window.scrollTo(0, 0);
        getdetails();
        console.log('로케잇션은222???'+latitude)
        console.log('로케잇션은222???'+longitude)

    }, []);




    const getdetails = ()=>{
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
        if (longitude,latitude) {
        const script = document.createElement("script");
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=6b812f78ce9508fcc788afd21fa76b3b&autoload=false'; // 여기에 발급받은 카카오 API 키 입력
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
            const scriptTag = document.querySelector('script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6b812f78ce9508fcc788afd21fa76b3b&autoload=false"]');
            if (scriptTag) {
            document.body.removeChild(scriptTag); // 컴포넌트가 언마운트 될 때 script 태그를 제거
            }
        };
        },[longitude, latitude]); // latitude, longitude 값이 바뀔 때마다 실행되도록 설정]);


    
    

    // 상품 데이터
    const categoryProducts = {
        '카테고리 1': [
            { id: 1, image: '/images/1호_일반케이크.jpg', name: '블랙 레터링 케이크', price: '35,000원' },
            { id: 2, image: '/images/1호_일반케이크.jpg', name: '레터링 케이크', price: '45,000원' },
            { id: 3, image: '/images/1호_일반케이크.jpg', name: '생일 케이크', price: '38,000원' },
            { id: 4, image: '/images/1호_일반케이크.jpg', name: '파티 케이크', price: '42,000원' }
        ],
        '카테고리 2': [
            { id: 5, image: '/images/2호_일반케이크.jpg', name: '비건 초콜릿 케이크', price: '48,000원' },
            { id: 6, image: '/images/2호_일반케이크.jpg', name: '비건 바닐라 케이크', price: '46,000원' },
            { id: 7, image: '/images/2호_일반케이크.jpg', name: '비건 생크림 케이크', price: '44,000원' },
            { id: 8, image: '/images/2호_일반케이크.jpg', name: '비건 당근 케이크', price: '42,000원' }
        ],
        '카테고리 3': [
            { id: 9, image: '/images/3호_떡케이크.png', name: '떡 케이크 1호', price: '40,000원' },
            { id: 10, image: '/images/3호_떡케이크.png', name: '떡 케이크 2호', price: '50,000원' },
            { id: 11, image: '/images/3호_떡케이크.png', name: '떡 케이크 3호', price: '60,000원' },
            { id: 12, image: '/images/3호_떡케이크.png', name: '떡 케이크 4호', price: '70,000원' }
        ],
        '카테고리 4': [
            { id: 13, image: '/images/3호_특별한케이크(달력).jpg', name: '포토 케이크', price: '55,000원' },
            { id: 14, image: '/images/3호_특별한케이크(달력).jpg', name: '캐릭터 케이크', price: '60,000원' },
            { id: 15, image: '/images/3호_특별한케이크(달력).jpg', name: '웨딩 케이크', price: '150,000원' },
            { id: 16, image: '/images/3호_특별한케이크(달력).jpg', name: '기업 케이크', price: '100,000원' }
        ],
        '카테고리 5': [
            { id: 17, image: '/images/강아지_미니케이크.jpg', name: '미니 케이크 1', price: '25,000원' },
            { id: 18, image: '/images/강아지_미니케이크.jpg', name: '미니 케이크 2', price: '28,000원' },
            { id: 19, image: '/images/강아지_미니케이크.jpg', name: '미니 케이크 3', price: '20,000원' },
            { id: 20, image: '/images/강아지_미니케이크.jpg', name: '미니 케이크 4', price: '30,000원' }
        ]
    };

    const allProducts = Object.values(categoryProducts).flat();

    const getProducts = () => {
        if (!selectedCategory) {
            return allProducts;
        }
        return categoryProducts[selectedCategory] || [];
    };

    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    const handleKakaoChat = () => {
        window.open(`http://pf.kakao.com/${detailVo.kakaoURL}`, '_blank');

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
                        {Object.keys(categoryProducts).map((category) => (
                            <div
                                key={category}
                                className={`sd-category-item ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img
                                    src={`/images/category-${category.slice(-1)}.jpg`}
                                    alt={category}
                                />
                                <p>{category}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="sd-divider" />

                    <div className="sd-products-container">
                        {getProducts().map((product) => (
                            <Link
                                to={`/user/cakedetail`}
                                key={product.id}
                                className="sd-product-item"
                            >
                                <div className="sd-product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="sd-price-info">
                                    <p className="sd-product-name">{product.name}</p>
                                    <p className="sd-price">{product.price}</p>
                                </div>
                            </Link> 
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserStoreDetail;