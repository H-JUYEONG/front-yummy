import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [venderImg, setVenderImg] = useState(null);
  const [venderBusinessName, setVenderBusinessName] = useState("");
  const [venderNumber, setVenderNumber] = useState("");

  const [isEmailAvailable, setIsEmailAvailable] = useState(null); // true: 사용 가능, false: 중복됨
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  // 전체 동의 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsTermsChecked(checked);
    setIsPrivacyChecked(checked);
  };

  const handleIndividualCheck = (e, setFunction) => {
    const checked = e.target.checked;
    setFunction(checked);

    if (checked && isTermsChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  // 이메일 중복 체크
  const handleVenderId = (e) => {
    const email = e.target.value;
    setVenderId(email);

    if (email) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/check/email`, {
          params: { email: email },
        })
        .then((response) => {
          setIsEmailAvailable(response.data.result === "success"); // 서버에서 중복 체크 결과 받음
        })
        .catch((error) => console.error("이메일 중복 체크 오류:", error));
    }
  };

  // 비밀번호 핸들러
  const handleVenderPassword = (e) => {
    const password = e.target.value;
    setVenderPassword(password);
    setIsPasswordMatch(password === venderPasswordCheck); // 비밀번호 일치 여부 확인
  };

  // 비밀번호 확인 핸들러
  const handleVenderPasswordCheck = (e) => {
    const passwordCheck = e.target.value;
    setVenderPasswordCheck(passwordCheck);
    setIsPasswordMatch(venderPassword === passwordCheck); // 비밀번호 일치 여부 확인
  };

  const handleVenderOwner = (e) => setVenderOwner(e.target.value);
  const handleVenderImg = (e) => setVenderImg(e.target.files[0]); // 파일 업로드 핸들러
  const handleVenderBusinessName = (e) => setVenderBusinessName(e.target.value);
  const handleVenderNumber = (e) => setVenderNumber(e.target.value);

  // 회원가입
  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 입력 사항과 약관 동의 여부 확인
    if (
      !venderId ||
      !venderPassword ||
      !venderOwner ||
      !venderBusinessName ||
      !isTermsChecked ||
      !isPrivacyChecked
    ) {
      alert("필수 입력 사항을 모두 입력하고 약관에 동의해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // FormData 객체를 사용하여 이미지 포함한 데이터 전송 준비
    const formData = new FormData();
    formData.append("email", venderId);
    formData.append("password_hash", venderPassword);
    formData.append("representative_name", venderOwner);
    formData.append("vender_name", venderBusinessName);
    formData.append("vender_number", venderNumber);
    formData.append("business_license_url", venderImg);

    // 서버로 전송
    axios({
      method: "post", // put, post, delete
      url: `${process.env.REACT_APP_API_URL}/api/venders`,

      headers: { "Content-Type": "multipart/form-data" }, //첨부파일
      data: formData, // 첨부파일  multipart방식

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log(response); //수신데이타
        console.log(response.data); //수신데이타
        if (response.data.result === "success") {
          navigate("/vender/signup/succ");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap" className="user-text-center">
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
                  onChange={handleVenderId}
                />
                {isEmailAvailable === false && (
                  <p className="vender-id-ok error">중복된 이메일 입니다.</p>
                )}
                {isEmailAvailable === true && (
                  <p className="vender-id-ok success">
                    사용 가능한 이메일입니다.
                  </p>
                )}
              </div>

              <div className="vender-input-group">
                <label htmlFor="vender-pw">비밀번호</label>
                <input
                  id="vender-pw"
                  type="password"
                  value={venderPassword}
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleVenderPassword}
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
                  onChange={handleVenderPasswordCheck}
                />
                {!isPasswordMatch && (
                  <p className="vender-pw-ok error">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              <div className="vender-input-group">
                <label htmlFor="vender-owner">대표자명</label>
                <input
                  id="vender-owner"
                  type="text"
                  value={venderOwner}
                  placeholder="대표자명을 입력해주세요."
                  onChange={handleVenderOwner}
                />
              </div>

              <div className="vender-input-group">
                <label htmlFor="vender-number">사업자 번호</label>
                <input
                  id="vender-number"
                  type="text"
                  value={venderNumber}
                  placeholder="사업자 번호를 입력해주세요."
                  onChange={handleVenderNumber}
                />
              </div>

              <div className="vender-input-group">
                <label htmlFor="vender-businessReg">사업자등록증</label>
                <input
                  id="vender-businessReg"
                  type="file"
                  name="file"
                  onChange={handleVenderImg}
                />
              </div>

              <div className="vender-input-group">
                <label htmlFor="vender-businessName">상호 입력</label>
                <input
                  id="vender-businessName"
                  type="text"
                  value={venderBusinessName}
                  placeholder="상호명을 입력해주세요."
                  onChange={handleVenderBusinessName}
                />
              </div>

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
                    onChange={(e) =>
                      handleIndividualCheck(e, setIsTermsChecked)
                    }
                  />
                  <label htmlFor="terms-agree">
                    (필수) 서비스 이용약관 동의
                  </label>
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
                  disabled={!(isTermsChecked && isPrivacyChecked)}
                >
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>

        <footer id="user-wrap-footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default VenderSignUpForm;
