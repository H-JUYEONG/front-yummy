import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../assets/css/user/userheaderstyle.css';

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [venderId, setVenderId] = useState(authUser.vender_id)
  const navigate = useNavigate();






  const handleLogout = () => {
    // Remove token and authUser from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');

    // Update state to reflect logged-out status
    setToken(null);
    setAuthUser(null);
    
  };

  //소영 : 업체 홈페이지 등록여부확인 및 부여
  
  const handleCheckShop = ()=>{
    
    
    console.log("type:"+typeof venderId)
    console.log(venderId)
    axios({
      method: 'get',          // put, post, delete                   
      url: `${process.env.REACT_APP_API_URL}/api/svender/${venderId}`,
      
      responseType: 'json' //수신타입
  }).then(response => {
      console.log(response); //수신데이타
      console.log(response.data.apiData)

      if(response.data.apiData == 0){
        alert("등록된 홈페이지가 없습니다.\n홈페이지를 등록하시겠습니까?")
        navigate('/vender');

        //shop status 1로 변경(생성, 비활성)
        axios({
          method: 'put',          // put, post, delete                   
          url: `${process.env.REACT_APP_API_URL}/api/svender/${venderId}`,
          
          responseType: 'json' //수신타입
      }).then(response => {
          console.log(response); //수신데이타
          console.log(response.data.apiData)
    
          
      
      }).catch(error => {
          console.log(error);
      });
      
      }else if(response.data.apiData == 1){
        navigate(`/vender/${venderId}`);
      }else if(response.data.apiData == 2){
        navigate(`/vender/${venderId}`);
      }else{
        console.log("오류")
      }
      
  
  }).catch(error => {
      console.log(error);
  });

  }



  // Render navigation menu based on user role
  const renderNavMenu = () => (
    <ul>
      <li><Link to="/user/audition">케이크요청</Link></li>
      <li><Link to="/user/cakeDesign/board">디자인공유</Link></li>
      <li><Link to="/board">케이크토크</Link></li>
    </ul>
  );

  // Render user actions based on authentication status and user role
  const renderUserActions = () => {
    if (!authUser) {
      // If not logged in, show login and signup links
      return (
        <>
          <Link to="/user/login" className="header-link">로그인</Link>
          <Link to="/user/signup/type" className="header-link">회원가입</Link>
        </>
      );
    }

    // Display different actions based on `authUser` type
    switch(authUser.type) {
      case '업체':
        return (
          <>
            <Link to="#" className="header-link" onClick={handleCheckShop}>내 업체 페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      case '어드민':
        return (
          <>
            <Link to="/admin/" className="header-link">관리페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      default: // 'user'
        return (
          <>
            <Link to='/user/mypage/order' className="header-link">마이페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
    }
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo">
        <Link to={`/`}>
          <h1>YUMMY</h1>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {renderNavMenu()}
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        {renderUserActions()}
      </div>
    </div>
  );
};

export default Header;
