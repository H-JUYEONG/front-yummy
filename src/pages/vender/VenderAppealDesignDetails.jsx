//import 라이브러리
import React from 'react';

//import 컴포넌트


//import css
import  '../../assets/css/vender/appealDesignDetails.css';
import '../../assets/css/vender/syModal.css';




const VenderAppealDesignDetails = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen이 false일 경우 모달을 렌더링하지 않음
    return (
        <div className="vender-sso-modal-overlay">
            <div className="vender-sso-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="vender-sso-modal-close-button" onClick={onClose}>X</button>
                <p>ddddd</p>
                {children}
            </div>
        </div>
    );
};


export default VenderAppealDesignDetails;