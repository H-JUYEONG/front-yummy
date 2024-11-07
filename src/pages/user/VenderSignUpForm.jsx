//import 라이브러리
import React, { useState } from "react";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/venderSignUpForm.css";

const VenderSignUpForm = () => {
  const [venderId, setVenderId] = useState(""); // 아이디
  const [venderPassword, setVenderPassword] = useState(""); // 비밀번호
  const [venderPasswordCheck, setVenderPasswordCheck] = useState(""); // 비밀번호 확인
  const [venderOwner, setVenderOwner] = useState(""); // 대표자명
  const [venderImg, setVenderImg] = useState();
  const [venderBusinessName, setVenderBusinessName] = useState(""); // 상호명

  const handlVenderId = (e) => {
    setVenderId(e.target.value);
  };

  const handlVenderPassword = (e) => {
    setVenderPassword(e.target.value);
  };

  const handlVenderPasswordCheck = (e) => {
    setVenderPasswordCheck(e.target.value);
  };

  const handlVenderOwner = (e) => {
    setVenderOwner(e.target.value);
  };

  const handlVenderImg = (e) => {
    setVenderImg(e.target.value);
  };

  const handlVenderBusinessName = (e) => {
    setVenderBusinessName(e.target.value);
  };

  // 회원가입
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div id="wrap" className="text-center">
      {/* Header */}
      <header id="wrap-head">
        <h1>Header 영역</h1>
      </header>

      <div className="vender-signup">
        {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="vender-signup-area">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="vender-id">아이디(이메일)</label>
              <input
                id="vender-id"
                type="text"
                value={venderId}
                placeholder="이메일 주소를 입력해주세요."
                onChange={handlVenderId}
              />
              <p className="vender-id-ok">사용가능</p>
              <p className="vender-id-ok">중복된 이메일 입니다.</p>
            </div>

            <div className="vender-input-group">
              <label htmlFor="vender-pw">비밀번호</label>
              <input
                id="vender-pw"
                type="password"
                value={venderPassword}
                placeholder="비밀번호를 입력해주세요."
                onChange={handlVenderPassword}
              />
              <p className="vender-pw-ok">
                ※ 영문,숫자,특수문자 조합하여 6~16자로 입력해주세요.
              </p>
            </div>

            <div className="input-group">
              <label htmlFor="vender-pw-check">비밀번호 확인</label>
              <input
                id="vender-pw-check"
                type="password"
                value={venderPasswordCheck}
                placeholder="비밀번호 재입력"
                onChange={handlVenderPasswordCheck}
              />
              <p className="user-pw-ok">※ 비밀번호가 일치하지 않습니다.</p>
            </div>

            <div className="input-group">
              <label htmlFor="vender-owner">대표자명</label>
              <input
                id="vender-owner"
                type="text"
                value={venderOwner}
                placeholder="대표자명을 입력해주세요." 
                onChange={handlVenderOwner}
              />
            </div>

            <div className="input-group">
              <label htmlFor="vender-businessReg">사업자등록증</label>
              <input
                id="vender-businessReg"
                type="file" 
                name="file"
                placeholder="사업자등록증을 첨부해주세요." 
                onChange={handlVenderImg}
              />
            </div>

            <div className="input-group">
              <label htmlFor="vender-businessName">상호 입력</label>
              <input
                id="vender-businessName"
                type="text"
                value={venderBusinessName}
                placeholder="상호명을 입력해주세요." 
                onChange={handlVenderBusinessName}
              />
            </div>
            <div className="vender-signup-btn">
              <button type="submit">회원가입</button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="full-width">
        <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
      </footer>
    </div>
  );
};
export default VenderSignUpForm;
