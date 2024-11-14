import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/venderSignUpForm.css";

const VenderSignUpForm = () => {
  const navigate = useNavigate();

  const [venderId, setVenderId] = useState("");
  const [venderPassword, setVenderPassword] = useState("");
  const [venderPasswordCheck, setVenderPasswordCheck] = useState("");
  const [venderOwner, setVenderOwner] = useState("");
  const [venderImg, setVenderImg] = useState();
  const [venderBusinessName, setVenderBusinessName] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsTermsChecked(checked);
    setIsPrivacyChecked(checked);
  };

  const handleIndividualCheck = (e, setFunction) => {
    const checked = e.target.checked;
    setFunction(checked);

    // 필수 약관이 모두 체크되었을 경우에만 전체 동의 체크박스도 체크
    if (checked && isTermsChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

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
  };

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="vender-signup">
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="vender-signup-area">
          <form onSubmit={handleSubmit}>
            <div className="vender-input-group">
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

            <div className="vender-input-group">
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

            <div className="vender-input-group">
              <label htmlFor="vender-owner">대표자명</label>
              <input
                id="vender-owner"
                type="text"
                value={venderOwner}
                placeholder="대표자명을 입력해주세요."
                onChange={handlVenderOwner}
              />
            </div>

            <div className="vender-input-group">
              <label htmlFor="vender-businessReg">사업자등록증</label>
              <input
                id="vender-businessReg"
                type="file"
                name="file"
                placeholder="사업자등록증을 첨부해주세요."
                onChange={handlVenderImg}
              />
            </div>

            <div className="vender-input-group">
              <label htmlFor="vender-businessName">상호 입력</label>
              <input
                id="vender-businessName"
                type="text"
                value={venderBusinessName}
                placeholder="상호명을 입력해주세요."
                onChange={handlVenderBusinessName}
              />
            </div>

            {/* 약관 동의 */}
            <div className="terms-agreement">
              <div>
                <input
                  type="checkbox"
                  id="all-agree"
                  checked={isAllChecked}
                  onChange={handleAllCheck}
                />
                <label htmlFor="all-agree">전체 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms-agree"
                  checked={isTermsChecked}
                  onChange={(e) => handleIndividualCheck(e, setIsTermsChecked)}
                />
                <label htmlFor="terms-agree">(필수) 서비스 이용약관 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="privacy-agree"
                  checked={isPrivacyChecked}
                  onChange={(e) =>
                    handleIndividualCheck(e, setIsPrivacyChecked)
                  }
                />
                <label htmlFor="privacy-agree">
                  (필수) 개인정보 처리방침 동의
                </label>
              </div>
            </div>

            <div className="vender-signup-btn">
              <button
                type="submit"
                onClick={() => navigate("/vender/signup/succ")}
                disabled={!(isTermsChecked && isPrivacyChecked)} // 필수 약관 미동의 시 버튼 비활성화
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default VenderSignUpForm;
