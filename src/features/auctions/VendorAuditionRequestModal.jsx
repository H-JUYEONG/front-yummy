import React, { useState } from 'react';
import '../../assets/css/vendor/vendormodal.css';
import '../../assets/css/vendor/vendorauditionrequest.css';
import VenderAuditionRequest from './VendorAuditionRequest';  // VerticalCakeOrder 컴포넌트 import

const VendorAuditionRequestModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기 핸들러
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="vender-audition-request-modal">
      <button className="open-modal-button" onClick={openModal}>
        주문하기
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">주문하기</h2>
              <button className="modal-close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <VenderAuditionRequest/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAuditionRequestModal;