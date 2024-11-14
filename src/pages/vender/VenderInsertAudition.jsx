//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

//import 컴포넌트
import VenderProductModalInsert from './VenderProductModalInsert';

//import css
import '../../assets/css/vender/venderInsertAudition.css';




const VenderInsertAudition = () => {

    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openNewWindow = () => {
        window.open('/vender/venderauditonrequest', '_blank');
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    

    




    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)



    return (
        <>
            <div className="vender-container">
                <div className='vender-insert-audition-wrap'>
                    <div className='insert-h1-box'>
                        <h1>신청하기</h1>
                    </div>
                    <div className='insert-recipt-box'>
                        <div className='insert-audition-right-box'>
                            <div className='insert-h2-box'>
                                <h2>주문정보</h2>
                            </div>
                            <div className='appeal-design-text'>
                                <ul>
                                    <li>주문번호: 1 </li>
                                    <li>주문이름: </li>
                                    <li>제시금액 : 60,000원</li>
                                    <li>사이즈 : 12cm</li>
                                    <li>수령방식 : 픽업</li>
                                    <li>희망지역: 강남구</li>
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
                        <div className='insert-audition-left-box'>
                            <div className='insert-h2-box'>
                                <h2>예시도안</h2>
                            </div>
                            <div className='input-photo-box'>
                                <div className='input-photo-box-line'>
                                    <img src='#' />
                                </div>
                            </div>
                        </div>
                    </div>


                    
                        <div className='insert-h2-box choose-flex-box'>
                            <h2>상품선택</h2>
                            <button onClick={openModal}>선택하러가기</button>
                        </div>
                        <div className='insert-h2-box choose-flex-box'>
                            <h2>옵션선택</h2>
                            <button type='button' onClick={openNewWindow}>선택하러가기</button>
                        </div>
                        <div className='insert-h2-box choose-flex-box'>
                            <h2><label htmlFor='insert-price-txt'>신청금액</label></h2>
                            <input id='insert-price-txt' type='text' name='' value=''/>원
                        </div>
                        <div className='insert-btn-box'>
                            <Link to='/user/audition/ongoing'>
                                <button type='button' className='insert-btn'>신청하기</button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
                {/* 모달이 열려 있을 때만 VenderProductModalInsert 렌더링 */}
            {isModalOpen && <VenderProductModalInsert onClose={closeModal} />}
            

                    
        </>
    );
}

export default VenderInsertAudition;





