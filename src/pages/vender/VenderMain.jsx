//import 라이브러리
import React from 'react';

//import 컴포넌트


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
                    <img src='../../assets/images/cake-facebook-cover-design_220346-14126' />
                    업체 대문로고
                </div>
                <div className='venderMain-content'>
                    <div className='venderMain-content-img'>
                        <div className='sub-logo-img'>
                            업체 로고이미지 들어오는 칸
                        </div>
                    </div>
                    <div className='venderMain-content-maintext'>
                        업체 상세설명 들어오는 칸
                    </div>
                </div>
                <div className='venderMain-category-box'>
                    <div>
                        <ul>
                            <li>ca1</li>
                            <li>ca1</li>
                            <li>ca1</li>
                            <li>ca1</li>
                        </ul>
                    </div>
                </div>
                <div className='venderMain-goodslist-box'>
                    
                </div>
                
            </div>
        </>
    );
}

export default VenderMain;



