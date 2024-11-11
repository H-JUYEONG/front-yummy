//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';

//import 컴포넌트
import logoImage from '../../assets/images/logoyogo-1-167.jpg';

//import css
import '../../assets/css/vender/venderMain.css';




const VenderMain = () => {

    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/



    




    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)



    return (
        <>
            <div className="venderMain-wrap">
                <div className='venderMain-head'>
                    <img src={logoImage} />
                </div>
                <div className='venderMain-title-name'>
                    cake shop
                </div>
                <div className='venderMain-content'>
                    <div className='venderMain-content-img'>
                        <div className='sub-logo-img'>
                            <img src={logoImage} />
                        </div>
                    </div>
                    <div className='venderMain-content-maintext'>
                        <ul>
                            <li>게시물 84개</li>
                            <li>전체리뷰 100개</li>
                            <li>카카오톡 문의</li>
                        </ul>
                        특별한날 맞춤케이크<br />
                        원하시는 날 맞춰 전국 택배로 배송됩니다.<br />
                        카카오톡 또는 고객센터로 문의 바랍니다.<br />
                        다양한 내용들을 추가해주세요.<br />
                        업체에 대한 설명이 적혀있습니다.<br />
                        위치 : 서울시 강남구 120-34 1층
                    </div>
                </div>
                <div className='venderMain-category-box'>
                    <ul>
                        <li><button type='button'>카테고리 1</button></li>
                        <li><button type='button'>카테고리 2</button></li>
                        <li><button type='button'>카테고리 3</button></li>
                        <li><button type='button'>카테고리 4</button></li>
                    </ul>
                </div>
                <div className='venderMain-goodslist-box'>
                    *상품리스트*
                    
                </div>
                
            </div>
        </>
    );
}

export default VenderMain;



