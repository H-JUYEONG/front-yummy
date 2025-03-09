//import 라이브러리
import React,{useState} from 'react';

//import 컴포넌트


//import css
import  '../../assets/css/vendor/appealDesignDetails.css';
import '../../assets/css/vendor/syModal.css';
import '../../assets/css/vendor/AuditionParticipation.css';




const VendorAuditionParticipation = ({ isOpen, onClose, children }) => {
    const [fileImg , setFileImg] = useState();

    if (!isOpen) return null; // isOpen이 false일 경우 모달을 렌더링하지 않음
    return (
        <div className="vender-sso-modal-overlay">
            <div className="vender-sso-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='sso-modal-head'>
                    <button className="vender-sso-modal-close-button" onClick={onClose}>X</button>
                    <h2 className='vender-appeal-title-name'>참여하기</h2>
                </div>
                <div className='sso-modal-body'>
                    
                    <div className='sso-modal-body-content'>
                    <p className='sy-modal-sub-title'>신청하기</p>
                    <form>  
                        <div className='input-recept-box'>
                            <div className='search-input input-recept-value'>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="상품명 검색하기"
                                value=''
                            />
                                    
                                
                            </div>
                            <div className="input-recept-box-right">
                                <div className='input-recept-value'>
                                    <label htmlFor="">신청 내용</label>
                                    <textarea placeholder='신청멘트를 작성해주세요' id='input-txt' className='solid input-recept-text-value' name='' value=""></textarea>
                                </div>
                                <div className='input-recept-value'>
                                    <label htmlFor='input-price'>제시 금액</label>
                                    <input id="input-price" placeholder='제시금액을 입력해주세요' className='solid' type='text' name='price' value="" /> 원
                                </div>
                            </div>
                        </div>
                        <button>등록하기</button>
                    </form>  
                        <div className="sso-modal-body-flex">
                        <div className='modal-user-input-text'>
                            <p className='sy-modal-sub-title'>주문정보</p>
                            <div className='appeal-design-text'>
                                <ul>
                                    <li>선택지역 : 강남구</li>
                                    <li>주문번호 : 1</li>
                                    <li>제시금액 : 60,000원</li>
                                    <li>사이즈 : 12cm</li>
                                    <li>수령방식 : 픽업</li>
                                    <li>수령일자 : 2024-11-10</li>
                                    <li>요청사항</li>
                                    <li>
                                        <div className='appeal-design-text-RequestedTerm'>
                                            1.예쁘게 만들어주세요!<br />
                                            2.맛도있게요~~<br />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='modal-user-input-img'>
                            <p className='sy-modal-sub-title'>예시도안</p>
                            <div className='appeal-design-photo'><img src='../../assts/images/짱구얼굴'/>도안사진</div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                {children}
            </div>
        </div>
    );
};


export default VendorAuditionParticipation;