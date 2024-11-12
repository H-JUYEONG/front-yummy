import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSignUpForm.css";

const UserSignUpForm = () => {
  const navigate = useNavigate();

  // 개별 체크박스 상태
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

    // 필수 항목이 모두 체크되었는지 확인하여 전체 동의 상태 업데이트
    if (checked && isTermsChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="user-signup">
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="user-signup-intput-area">
          <form>
            {/* 회원가입 입력 필드 */}
            <div className="user-input-group-txt">
              <label htmlFor="user-id">아이디(이메일)</label>
              <input
                id="user-id"
                type="text"
                value=""
                placeholder="이메일 주소를 입력해주세요."
              />
              <p className="user-id-ok">사용가능</p>
              <p className="user-id-ok">중복된 이메일 입니다.</p>
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-pw">비밀번호</label>
              <input
                id="user-pw"
                type="password"
                value=""
                placeholder="비밀번호를 입력해주세요."
              />
              <p className="user-pw-ok">
                ※ 영문,숫자,특수문자 조합하여 6~16자로 입력해주세요.
              </p>
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-pw-check">비밀번호 확인</label>
              <input
                id="user-pw-check"
                type="password"
                value=""
                placeholder="비밀번호를 재입력"
              />
              <p className="user-pw-ok">※ 비밀번호가 일치하지 않습니다.</p>
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-name">이름</label>
              <input
                id="user-name"
                type="text"
                value=""
                placeholder="이름을 입력해주세요."
              />
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-nikname">닉네임</label>
              <input
                id="user-nikname"
                type="text"
                value=""
                placeholder="닉네임을 입력해주세요."
              />
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-phone">휴대폰번호</label>
              <div className="user-phonenum-input-wrapper">
                <input
                  id="user-phone"
                  type="text"
                  value=""
                  placeholder="'-' 제외하고 숫자만 입력해주세요."
                />
                <button type="button" className="request-code-btn">
                  인증번호 요청
                </button>
              </div>
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

            {/* 회원가입 버튼 */}
            <div className="user-signup-btns">
              <button
                type="submit"
                onClick={() => navigate("/user/signup/succ")}
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

export default UserSignUpForm;
