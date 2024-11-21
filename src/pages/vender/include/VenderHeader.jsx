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

    const [authUser, setAuthUser] = useState('');
    const [venderNo, setVenderNo] = useState('');

    const {venderId} = useParams();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setAuthUser(parsedUser); 
        }

        bnnerImg();
    }, []);

    useEffect(() => {
        if (authUser && authUser.vender_id) {
            setVenderNo(authUser.vender_id);
        }
    }, [authUser]);

    
    useEffect(() => {
        console.log("venderId:", venderId);
        console.log("venderNo:", venderNo);
    }, [venderId, venderNo]);


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

    


    return (
        <>
            <div className='vender-header-wrap'>
                <Link to={`/user/storedetail/${venderId}`}>
                    <img src={bannerURL} />
                </Link>
                {venderId && venderNo && venderId == venderNo ?  (
                    <Link to={`/vender/${venderId}`}>
                        <GearIcon className='vender-header-icon' style={{ fontSize: '30px', color: 'gray' }} />
                    </Link>
                ) : (
                    <p></p>
                )}
            </div>


        </>
    );
}

export default VenderHeader;



