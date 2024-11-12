import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSocialSignUpForm.css";

const UserSocialSignUpForm = () => {
  const navigate = useNavigate();

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

    // 개별 체크 시 모든 필수 항목이 체크되었는지 확인하여 전체 동의 상태 업데이트
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

      <div className="user-social-signup">
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="userSocialSignUpForm-social-signup-area">
          <form>
            <div className="userSocialSignUpForm-input-group">
              <div className="social-guide">
                <p>※ 아래의 정보는 최초 1회 입력이 필요하며,</p>
                <p>
                  추후 로그인 시 Kakao 아이디를 이용하여 간편로그인이
                  가능합니다.
                </p>
              </div>
              <label htmlFor="user-id">아이디(이메일)</label>
              <input
                id="user-id"
                type="text"
                value=""
                placeholder="이메일 주소를 입력해주세요."
              />
              <p className="user-social-id-ok">사용가능</p>
              <p className="user-social-id-ok">중복된 이메일 입니다.</p>
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-pw">비밀번호</label>
              <p className="user-social-pw-ok">
                ※ SNS(네이버,카카오)를 통한 회원가입시 비밀번호를 입력 할 필요가
                없습니다.
              </p>
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-name">이름</label>
              <input
                id="user-name"
                type="text"
                value=""
                placeholder="이름을 입력해주세요."
              />
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-nikname">닉네임</label>
              <input
                id="user-nikname"
                type="text"
                value=""
                placeholder="닉네임을 입력해주세요."
              />
            </div>

            <div className="userSocialSignUpForm-input-group">
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

            <div className="user-social-signup-btn">
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

export default UserSocialSignUpForm;
