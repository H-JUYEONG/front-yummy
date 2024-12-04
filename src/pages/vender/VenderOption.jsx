import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/option.css';
import VenderSidebar from './include/VenderSidebar';
import yummyLogo from '../../assets/images/yummylogo.webp'; // 기본 이미지 임포트

const API_URL = process.env.REACT_APP_API_URL;
// 한글 옵션 유형 매핑
const OPTION_TYPE_NAME_KO = {
    1: "상품 종류",
    2: "케이크 크기",
    3: "맛 - 시트",
    4: "맛 - 크림",
    5: "케이크 배경 색상",
    6: "크림 위치",
    7: "크림 색상",
    8: "데코 종류",
    9: "데코 색상",
    10: "카테고리"
};

const translateOptionTypeName = (options) => {
    return options.map(option => ({
        ...option,
        optionTypeName: OPTION_TYPE_NAME_KO[option.optionTypeId] || option.optionTypeName // 매핑된 이름이 없으면 기본 이름 사용
    }));
};

function VenderOption() {
    const navigate = useNavigate();
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const [options, setOptions] = useState([]);
    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기
    
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/options/${venderId}`);
                const translatedOptions = translateOptionTypeName(response.data);

                // 조건에 따라 필터링
                const filteredOptions = translatedOptions.filter(option => {
                    if (venderId === 73) {
                        return option.optionTypeId >= 11 && option.optionTypeId <= 13; // 73번 업체는 11~13번 옵션만
                    } else {
                        return option.optionTypeId >= 1 && option.optionTypeId <= 10; // 기본 업체는 1~10번 옵션만
                    }
                });

                setOptions(filteredOptions); // 필터링된 옵션을 상태에 저장
            } catch (error) {
                console.error('옵션 데이터를 가져오는 중 에러 발생:', error);
            }
        };

        fetchOptions();
    }, [venderId]);


    const addSubOption = async (optionTypeId, subOption) => {
        const formData = new FormData();
        formData.append("file", subOption.file);
        formData.append("optionTypeId", optionTypeId);
        formData.append("venderId", venderId);
        formData.append("optionValueName", subOption.name);
        console.log("FormData:", Object.fromEntries(formData.entries()));
        try {
            // 옵션 값 추가 API 호출
            const response = await axios.post(`${API_URL}/api/options/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const newSubOption = response.data; // 서버에서 반환된 새 옵션 값
            setOptions(options.map(option =>
                option.optionTypeId === optionTypeId
                    ? { ...option, optionValues: [...option.optionValues, newSubOption] }
                    : option
            ));
        } catch (error) {
            console.error("옵션 값 추가 중 오류 발생:", error);
        }
    };


    // 삭제 핸들러 함수
    const removeSubOption = async (optionTypeId, optionValueId) => {
        if (!optionValueId || optionValueId <= 0) {
            alert("유효하지 않은 옵션 값 ID입니다.");
            return;
        }

        const confirmDelete = window.confirm("정말로 이 옵션을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${API_URL}/api/options/delete/${optionValueId}`);
            if (response.status === 200) {
                setOptions(options.map(option =>
                    option.optionTypeId === optionTypeId
                        ? {
                            ...option,
                            optionValues: option.optionValues.filter(subOption => subOption.optionValueId !== optionValueId)
                        }
                        : option
                ));
                alert(response.data.message || "옵션이 성공적으로 삭제되었습니다.");
            } else {
                throw new Error("삭제 요청이 실패했습니다.");
            }
        } catch (error) {
            console.error("옵션 값을 삭제하는 중 에러 발생:", error);
            alert("옵션 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const toggleOption = (optionTypeId) => {
        setOptions(prevState =>
            prevState.map(option =>
                option.optionTypeId === optionTypeId
                    ? { ...option, isExpanded: !option.isExpanded }
                    : option
            )
        );
    };

    return (
        <div className="vender-container">
            <div className="vender-content-wrapper">
                <VenderSidebar />
                <div className="vender-content">
                    <div className="option-selection-area">
                        {/* 왼쪽: 옵션 리스트 */}
                        <div className="left-panel">
                            <ul className="option-list">
                                {options.map(option => (
                                    <Option
                                        key={option.optionTypeId}
                                        option={option}
                                        addSubOption={addSubOption}
                                        isExpanded={option.isExpanded}
                                        toggleOption={() => toggleOption(option.optionTypeId)}
                                    />
                                ))}
                            </ul>
                        </div>
                        {/* 오른쪽: 선택된 옵션 */}
                        <div className="right-panel">
                            <div className="right-panel-header">
                                <h3>선택된 옵션</h3>
                                <button className="register-product-button" onClick={() => navigate('/vender/registrationform')} >상품등록하기</button>
                            </div>
                            <div className="selected-options">
                                {options.map(option => (
                                    <div key={option.optionTypeId} className="selected-option-group">
                                        <h4 className="option-group-title">{option.optionTypeName}</h4>
                                        {option.optionValues.map((subOption, index) => (
                                            <SubOption
                                                key={`${option.optionTypeId}-${index}`}
                                                subOption={subOption}
                                                optionTypeId={option.optionTypeId} // 추가: optionTypeId 전달
                                                removeSubOption={removeSubOption}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Option({ option, addSubOption, isExpanded, toggleOption }) {
    const [subOptionName, setSubOptionName] = useState("");
    const [subOptionFile, setSubOptionFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleAddSubOption = async () => {
        const defaultImageBlob = await fetch(yummyLogo).then((res) => res.blob()); // 기본 이미지 Blob 생성
        const newSubOption = {
            name: subOptionName,
            file: subOptionFile || defaultImageBlob, // 파일이 없으면 기본 이미지
        };

        await addSubOption(option.optionTypeId, newSubOption);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSubOptionFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <li className="option-item">
            <div className="option-header" onClick={toggleOption}>
                <span className="option-name">{option.optionTypeName}</span>
                <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
            </div>
            {isExpanded && (
                <div className="option-details">
                    <div className="add-sub-option">
                        <div className="input-group">
                            <label className="upload-label" htmlFor={`file-input-${option.optionTypeId}`}>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="미리보기" className="preview-image" />
                                ) : (
                                    <img src={yummyLogo} alt="기본 이미지" className="preview-image" />
                                )}
                            </label>
                            <input
                                type="file"
                                id={`file-input-${option.optionTypeId}`}
                                className="input-file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="옵션 이름"
                            value={subOptionName}
                            onChange={(e) => setSubOptionName(e.target.value)}
                        />
                        <button className="add-button" onClick={handleAddSubOption}>등록하기</button>
                    </div>
                </div>
            )}
        </li>
    );
}

function SubOption({ subOption, optionTypeId, removeSubOption }) {
    return (
        <div className="option-sub-item">
            {subOption.optionValueImageUrl && (
                <img
                    src={subOption.optionValueImageUrl}
                    alt="옵션 이미지"
                    className="sub-option-image"
                />
            )}
            <span className="sub-option-name">{subOption.optionValueName}</span>
            <button
                className="delete-button"
                onClick={() => removeSubOption(optionTypeId, subOption.optionValueId)}
            >
                &times;
            </button>
        </div>
    );
}

export default VenderOption;
