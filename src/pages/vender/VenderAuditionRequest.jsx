import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/vender/venderauditionrequest.css';

const VerticalCakeOrder = () => {
    // 상태 관리
    const [mainImage, setMainImage] = useState('/images/2호_일반케이크.jpg');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [requestText, setRequestText] = useState('');
    
    const {venderId} = useParams();
    const {productId} = useParams();

    const [cake, setCake] = useState('');
    const [creamList, setCreamList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [tasteList, setTasteList] = useState([]);

    const [context, setContext] = useState("");

    const getOptionList = ()=>{

        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/getOptions/${venderId}/${productId}`,
            responseType: 'json' //수신타입

        }).then(response => {
            console.log(response); //수신데이타
            console.log("옵션 리스트요")
            console.log(response.data)
            setCake(response.data.apiData.cake);
            setCreamList(response.data.apiData.creamList);
            setSizeList(response.data.apiData.sizeList);
            setTasteList(response.data.apiData.tasteList);
            
        
        }).catch(error => {
            console.log(error);
        });
    }

    const handleContext = (e)=>{
        setContext(e.target.value)
    }



    

    // 이미지 데이터
    

    // 색상 옵션 데이터
    const colorOptions = [
        { id: 'pink', name: '핑크', className: 'pink' },
        { id: 'yellow', name: '노랑', className: 'yellow' },
        { id: 'orange', name: '오렌지', className: 'orange' },
        { id: 'blue', name: '파랑', className: 'blue' },
        { id: 'green', name: '초록', className: 'green' },
        { id: 'purple', name: '보라', className: 'purple' },
        { id: 'brown', name: '갈색', className: 'brown' }
    ];

    // 맛 옵션 데이터
    const flavorOptions = [
        { id: 'choco', name: '초코', image: '/images/기브미 쪼꼬레또.jpg' },
        { id: 'vanilla', name: '바닐라', image: '/images/바닐라.jpg' },
        { id: 'strawberry', name: '딸기', image: '/images/딸기.jpg' },
        { id: 'matcha', name: '말차', image: '/images/말차.png' },
        { id: 'cheese', name: '치즈', image: '/images/치즈.jpg' },
        { id: 'redvelvet', name: '레드벨벳', image: '/images/레드벨벳.jpg' }
    ];

    // 사이즈 옵션 데이터
    const sizeOptions = [
        { id: 'size1', name: '1호', image: '/images/1호.jpg' },
        { id: 'size2', name: '2호', image: '/images/2호.jpg' },
        { id: 'size3', name: '3호', image: '/images/size-3.jpg' }
    ];

    // 썸네일 클릭 핸들러
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath);
    };

    // 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            selectedColor,
            selectedFlavor,
            selectedSize,
            requestText
        });
    };


    useEffect(()=>{
        console.log("옵션 가져오기 랜더링")
        getOptionList();
    },[])

    return (
        <div id="user-wrap">
        
            <div className="vertical-cake-order">
                {/* 제품명과 가격 입력 영역 */}
                <div className="product-info-input">
                    <h2 className="product-title">{cake.cakeName}</h2>
                </div>

                {/* 메인 이미지 및 썸네일 */}
                <div className="product-image-section">
                    <img src={cake.cakeURL} alt="메인 케이크 이미지" className="main-image" />
                    
                </div>

                {/* 옵션 선택 영역 */}
                <div className="options-section">
                    {/* 색상 선택 */}
                    <div className="option-group">
                        <h3>크림 색상</h3>
                        <div className="color-options">
                            {creamList.map((color) => (
                                <button
                                    key={color.CreamColor}
                                    className={`color-option ${color.CreamColor} ${selectedColor === color.CreamColor ? 'active' : ''}`}
                                    onClick={() => setSelectedColor(color.CreamColor)}
                                    aria-label={`${color.CreamColor} 색상 선택`}
                                    title={color.CreamColor}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 맛 선택 */}
                    <div className="option-group">
                        <h3>맛</h3>
                        <div className="option-grid">
                            {tasteList.map((taste) => (
                                <button
                                    key={taste.taste}
                                    className={`option-item ${selectedFlavor === taste.taste ? 'active' : ''}`}
                                    onClick={() => setSelectedFlavor(taste.taste)}
                                >
                                    <div className="option-image">
                                        <img src={taste.optionURL} />
                                    </div>
                                    <span>{taste.taste}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 사이즈 선택 */}
                    <div className="option-group">
                        <h3>케이크 호수</h3>
                        <div className="option-grid">
                            {sizeList.map((size) => (
                                <button
                                    key={size.size}
                                    className={`option-item ${selectedSize === size.size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size.size)}
                                >
                                    <div className="option-image">
                                        <img src={size.optionURL} alt={size.name} />
                                    </div>
                                    <span>{size.size}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 금액 측정*/}
                <div className="request-section">
                    <h3>금액 측정</h3>
                    <textarea
                        value={context}
                        onChange={handleContext}
                        placeholder="금액에 관련된 사항들을 측정해 주세요."
                        className="request-textarea"
                    />
                </div>

                {/* 신청 버튼 */}
                <button className="submit-button" onClick={handleSubmit}>
                    신청하기
                </button>
            </div>
        </div>
    );
};

export default VerticalCakeOrder;