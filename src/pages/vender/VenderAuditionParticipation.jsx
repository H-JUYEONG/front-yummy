//import 라이브러리
import React from 'react';

//import 컴포넌트


//import css
import  '../../assets/css/vender/appealDesignDetails.css';
import '../../assets/css/vender/syModal.css';
import '../../assets/css/vender/AuditionParticipation.css';




const VenderAuditionParticipation = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen이 false일 경우 모달을 렌더링하지 않음
    return (
        <div className="vender-sso-modal-overlay">
            <div className="vender-sso-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='sso-modal-head'>
                    <button className="vender-sso-modal-close-button" onClick={onClose}>X</button>
                    <h2 className='vender-appeal-title-name'>신청내역 상세</h2>
                </div>
                <div className='sso-modal-body'>
                    
                    <div className='sso-modal-body-content'>
                    <p className='sy-modal-sub-title'>신청하기</p>
                    <form>  
                        <div className='input-recept-box'>
                            <div className='input-recept-value'>
                                <label  htmlFor='input-photo' name="" value="">상품사진을 첨부해주세요</label>
                                <input id="input-photo" type='file' name=''/>
                                <div className='input-photo-value'>사진 들어가는 공간 </div>
                            </div>
                            <div className='input-recept-value'>
                                <label htmlFor='input-txt' name="">신청멘트를 작성해주세요</label>
                                <input id='input-txt' className='solid input-recept-text-value' type="text" name='' value="" />
                            </div>
                            <div className='input-recept-value'>
                                <label htmlFor='input-price'>제시금액을 입력해주세요</label>
                                <input id="input-price" className='solid' type='text' name='price' value="" /> 원
                            </div>
                        </div>
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


export default VenderAuditionParticipation;