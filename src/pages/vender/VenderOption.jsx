import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/option.css';
import VenderSidebar from './include/VenderSidebar';

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
    const [options, setOptions] = useState([]);
    const venderId = 39; // 예시로 사용
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/options/${venderId}`);
                const translatedOptions = translateOptionTypeName(response.data); // 한글 이름으로 변환
                setOptions(translatedOptions); // 상태에 저장
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
        console.log("삭제할 optionValueId:", optionValueId); // 삭제할 ID 확인

        try {
            await axios.delete(`${API_URL}/api/options/delete/${optionValueId}`);

            setOptions(options.map(option =>
                option.optionTypeId === optionTypeId
                    ? {
                        ...option,
                        optionValues: option.optionValues.filter(subOption => subOption.optionValueId !== optionValueId)
                    }
                    : option
            ));
        } catch (error) {
            console.error('옵션 값을 삭제하는 중 에러 발생:', error);
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
                                <button className="register-product-button">상품등록하기</button>
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
        if (!subOptionName.trim() || !subOptionFile) {
            alert("옵션 이름과 이미지를 모두 입력해주세요.");
            return;
        }

        const newSubOption = {
            name: subOptionName,
            file: subOptionFile, // 파일 포함
        };

        await addSubOption(option.optionTypeId, newSubOption);

        setSubOptionName("");
        setSubOptionFile(null);
        setPreviewUrl("");
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
                                    <span className="upload-placeholder">이미지 선택</span>
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
