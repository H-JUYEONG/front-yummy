import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/vendor/vendorauditionrequest.css';

const VerticalCakeOrder = ({ onClose, productId, venderId, onOptionSelect}) => {
    const navigate = useNavigate();

    // 선택된 항목들
    const [selectCakeType, setSelectCakeType] = useState('');
    const [selectCar, setSelectCar] = useState('');
    const [selectBackgroundColor, setSelectBackgroundColor] = useState('');

        //크림
    const [selectCreamPosition, setSelectCreamPosition] = useState('');
    const [selectCreamTaste, setSelectCreamTaste] = useState('');
    const [selectedColor, setSelectedColor] = useState('');     //크림색상

    const [selectDecoration, setSelectDecoration] = useState('');
    const [selectDecorationType, setSelectDecorationType] = useState('');


    const [selectedFlavor, setSelectedFlavor] = useState('');   //시트맛
    const [selectedSize, setSelectedSize] = useState('');

    
    //db에서 가져온 옵션 리스트들
    const [cake, setCake] = useState('');
    const [cakeType, setCakeType] = useState('');
    const [cakeCarList, setCakeCarList] = useState([]);
    const [backgroundColorList, setBackgroundColorList] = useState([]);

    const [creamList, setCreamList] = useState([]);
    const [creamPositionList, setCreamPositionList] = useState([]);
    const [creamTasteList, setCreamTasteList] = useState([]);

    const [sizeList, setSizeList] = useState([]);
    const [tasteList, setTasteList] = useState([]);

    const [decorationTypeList, setDecorationTypeList] = useState([]);
    const [decorationColorList, setDecorationColorList] = useState([]);

    const [context, setContext] = useState("");

    //모달 닫기
    const handleClose = ()=>{
        //선택된 옵션값들 모아주기
        
        const sendVo = {
            cakeType: selectCakeType,
            category: selectCar,
            backgroundColor: selectBackgroundColor,

            creamColor: selectedColor,
            creamTaste: selectCreamTaste,
            creamPosition: selectCreamPosition,

            decorationType: selectDecorationType,
            decorationColor: selectDecoration,

            taste: selectedFlavor,
            size: selectedSize,

            content: context
        }
        //부모에서 보내준 함수로 선택된 값들 받아주기
        onOptionSelect(sendVo);

        onClose();
    }

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
            setCakeType(response.data.apiData.cakeType);
            setCakeCarList(response.data.apiData.cakeCar);
            setBackgroundColorList(response.data.apiData.backgroundColor);

            setCreamList(response.data.apiData.creamList);
            setCreamPositionList(response.data.apiData.creamPosition);
            setCreamTasteList(response.data.apiData.creamTaste);

            setSizeList(response.data.apiData.sizeList);
            setTasteList(response.data.apiData.tasteList);

            setDecorationTypeList(response.data.apiData.decorationType);
            setDecorationColorList(response.data.apiData.decorationColor);
        
        }).catch(error => {
            console.log(error);
        });
    }

    //context 작성
    const handleContext = (e)=>{
        setContext(e.target.value)
    }

    useEffect(()=>{
        getOptionList();
        console.log("옵션페이지벤더아이디:"+venderId);
        console.log("옵션페이지상품아이디:"+productId);
    },[])



    

    return (
        <div id="option-madal-wrap">
            
            <div className="vertical-cake-order">
                {/* 제품명과 가격 입력 영역 */}
                
                <div className="product-info-input">
                    <button className="vender-sso-modal-close-button" onClick={onClose}>
                        X
                    </button>
                    <h2 className="product-title">{cake.cakeName}</h2>

                </div>

                {/* 메인 이미지 및 썸네일 */}
                <div className="product-image-section">
                    <img src={cake.cakeURL} alt="메인 케이크 이미지" className="main-image" />
                    
                </div>

                {/* 옵션 선택 영역 */}
                <div className="options-section">

                    {/* 상품타입 선택 */}
                    <div className="option-group">
                        <h3>상품타입</h3>
                        <div className="option-grid">
                            <button
                                key={cakeType.productType}
                                className={`option-item ${selectCakeType === cakeType.productType ? 'active' : ''}`}
                                onClick={() => setSelectCakeType(cakeType.productType)}
                            >
                                <div className="option-image">
                                    <img src={cakeType.optionURL} alt='상품타입사진'/>
                                </div>
                                <span>{cakeType.productType}</span>
                            </button>
                        </div>
                    </div>

                    {/* 카테고리 선택 */}
                    <div className="option-group">
                        <h3>카테고리</h3>
                        <div className="option-grid">
                            {cakeCarList.map((car) => (
                                    <button
                                        key={car.category}
                                        className={`option-item ${selectCar === car.category ? 'active' : ''}`}
                                        onClick={() => setSelectCar(car.category)}
                                    >
                                        <div className="option-image">
                                            <img src={car.optionURL} />
                                        </div>
                                        <span>{car.category}</span>
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
                                        <img src={size.optionURL}/>
                                    </div>
                                    <span>{size.size}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 시트맛 선택 */}
                    <div className="option-group">
                        <h3>시트맛</h3>
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

                    {/* 케이크배경색상 선택 */}
                    <div className="option-group">
                        <h3>케이크배경 색</h3>
                        <div className="color-options">
                            {backgroundColorList.map((backgroundColor) => (
                                <button
                                    key={backgroundColor.cakeColor}
                                    className={`color-option  ${selectBackgroundColor === backgroundColor.cakeColor ? 'active' : ''}`}
                                    onClick={() => setSelectBackgroundColor(backgroundColor.cakeColor)}
                                    
                                    title={backgroundColor.cakeColor}
                                >
                                    <img src={backgroundColor.imageURL} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 크림위치 선택 */}
                    <div className="option-group">
                        <h3>크림위치</h3>
                        <div className="option-grid">
                            {creamPositionList.map((creamPosition) => (
                                <button
                                    key={creamPosition.creamPosition}
                                    className={`option-item ${selectCreamPosition === creamPosition.creamPosition ? 'active' : ''}`}
                                    onClick={() => setSelectCreamPosition(creamPosition.creamPosition)}
                                >
                                    <div className="option-image">
                                        <img src={creamPosition.optionURL} />
                                    </div>
                                    <span>{creamPosition.creamPosition}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 크림맛 선택 */}
                    <div className="option-group">
                        <h3>크림맛</h3>
                        <div className="option-grid">
                            {creamTasteList.map((creamTaste) => (
                                <button
                                    key={creamTaste.flavorCream}
                                    className={`option-item ${selectCreamTaste === creamTaste.flavorCream ? 'active' : ''}`}
                                    onClick={() => setSelectCreamTaste(creamTaste.flavorCream)}
                                >
                                    <div className="option-image">
                                        <img src={creamTaste.optionURL} />
                                    </div>
                                    <span>{creamTaste.flavorCream}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 크림색상 선택 */}
                    <div className="option-group">
                        <h3>크림 색상</h3>
                        <div className="color-options">
                            {creamList.map((color) => (
                                <button
                                    key={color.creamColor}
                                    className={`color-option  ${selectedColor === color.creamColor ? 'active' : ''}`}
                                    onClick={() => setSelectedColor(color.creamColor)}
                                    
                                    title={color.creamColor}
                                >
                                    <img src={color.imageURL} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 데코레이션 타입 선택 */}
                    <div className="option-group">
                        <h3>데코레이션</h3>
                        <div className="option-grid">
                            {decorationTypeList.map((decotationType) => (
                                <button
                                    key={decotationType.decorationType}
                                    className={`option-item ${selectDecorationType === decotationType.decorationType ? 'active' : ''}`}
                                    onClick={() => setSelectDecorationType(decotationType.decorationType)}
                                >
                                    <div className="option-image">
                                        <img src={decotationType.optionURL} />
                                    </div>
                                    <span>{decotationType.decorationType}</span>
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* 데코레이션색상 선택 */}
                    <div className="option-group">
                        <h3>데코레이션색상</h3>
                        <div className="color-options">
                            {decorationColorList.map((decorationColor) => (
                                <button
                                    key={decorationColor.decorationColor}
                                    className={`color-option  ${selectDecoration === decorationColor.decorationColor ? 'active' : ''}`}
                                    onClick={() => setSelectDecoration(decorationColor.decorationColor)}
                                    
                                    title={decorationColor.decorationColor}
                                >
                                    <img src={decorationColor.imageURL} />
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
                <button className="submit-button" onClick={handleClose}>
                    선택하기
                </button>
            </div>
        </div>
    );
};

export default VerticalCakeOrder;