//import 라이브러리
import React from 'react';
import { Link, useParams } from 'react-router-dom';

//import 컴포넌트


//import css
import '../../../assets/css/vender/venderHeader.css';

import Gear from '@rsuite/icons/Gear';
import AddOutline from '@rsuite/icons/AddOutline';
import cakeLogo from '../../../assets/images/mainlogoimg02.avif';

import GearIcon from '@rsuite/icons/Gear';


const VenderHeader = () => {



    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/








    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)



    return (
        <>
            <div className='vender-header-wrap'>
                <Link to='/user/storedetail'>
                    <img src='#' />
                </Link>
                <Link to='/vender/'>
                    <GearIcon className='vender-header-icon' style={{ fontSize: '30px', color: 'gray' }} />
                </Link>
            </div>


        </>
    );
}

export default VenderHeader;



