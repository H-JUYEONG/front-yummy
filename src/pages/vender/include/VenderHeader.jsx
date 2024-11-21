//import 라이브러리
import React,{useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트


//import css
import '../../../assets/css/vender/venderHeader.css';

import Gear from '@rsuite/icons/Gear';
import AddOutline from '@rsuite/icons/AddOutline';
import cakeLogo from '../../../assets/images/mainlogoimg02.avif';

import GearIcon from '@rsuite/icons/Gear';


const VenderHeader = () => {

    const [bannerURL, setBannerURL] = useState('');

    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem('authUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const {venderId} = useParams();

    const bnnerImg = ()=>{
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/getBanner/${venderId}`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            setBannerURL(response.data.apiData);   

        
        }).catch(error => {
            console.log(error);
        });
        
    }

    useEffect(()=>{
        bnnerImg();
    },[])

    


    return (
        <>
            <div className='vender-header-wrap'>
                <Link to={`/user/storedetail/${venderId}`}>
                    <img src={bannerURL} />
                </Link>
                {{venderId}!=null ? 
                <Link to={`/vender/${venderId}`}>
                    <GearIcon className='vender-header-icon' style={{ fontSize: '30px', color: 'gray' }} />
                </Link>: <p></p>}
            </div>


        </>
    );
}

export default VenderHeader;



