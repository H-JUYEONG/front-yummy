import React, { useState } from 'react';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/option.css'; // 상품 등록 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';

function VenderOption() {
    const [options, setOptions] = useState([
        { id: 1, name: '상품종류', subOptions: [{ name: '일반케이크', imageUrl: 'https://via.placeholder.com/150' }] },
        { id: 2, name: '케이크 사이즈', subOptions: [] },
        { id: 3, name: '맛-시트', subOptions: [] },
        { id: 4, name: '맛-크림', subOptions: [] },
        { id: 5, name: '케이크 배경 색상', subOptions: [] },
        { id: 6, name: '크림 위치', subOptions: [] },
        { id: 7, name: '크림 색상', subOptions: [] },
        { id: 8, name: '데코 종류', subOptions: [] },
        { id: 9, name: '데코 색상', subOptions: [] },
    ]);

    const [expandedOptions, setExpandedOptions] = useState({});

    const addSubOption = (optionId, subOption) => {
        setOptions(options.map(option =>
            option.id === optionId ? { ...option, subOptions: [...option.subOptions, subOption] } : option
        ));
    };

    const removeSubOption = (optionId, subOptionIndex) => {
        setOptions(options.map(option =>
            option.id === optionId ? {
                ...option,
                subOptions: option.subOptions.filter((_, index) => index !== subOptionIndex)
            } : option
        ));
    };

    const toggleOption = (optionId) => {
        setExpandedOptions(prevState => ({
            ...prevState,
            [optionId]: !prevState[optionId]
        }));
    };

    return (
        <div className="vender-container">
            <div class="vender-content-wrapper">
                <VenderSidebar />
                <div className="vender-content">
                    <div className="option-main-content">
                        <ul className="option-list">
                            {options.map(option => (
                                <Option
                                    key={option.id}
                                    option={option}
                                    addSubOption={addSubOption}
                                    removeSubOption={removeSubOption}
                                    isExpanded={!!expandedOptions[option.id]}
                                    toggleOption={() => toggleOption(option.id)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Option({ option, addSubOption, removeSubOption, isExpanded, toggleOption }) {
    const [subOptionName, setSubOptionName] = useState("");
    const [subOptionFile, setSubOptionFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleAddSubOption = () => {
        if (!subOptionName.trim() || !subOptionFile) {
            alert("옵션 이름과 이미지를 모두 입력해주세요.");
            return;
        }

        const newSubOption = {
            name: subOptionName,
            imageUrl: URL.createObjectURL(subOptionFile),
        };

        addSubOption(option.id, newSubOption);
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
                <span className="option-name">{option.name}</span>
                <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
            </div>
            {isExpanded && (
                <div className="option-details">
                    {option.subOptions.map((subOption, index) => (
                        <SubOption
                            key={index}
                            subOption={subOption}
                            removeSubOption={() => removeSubOption(option.id, index)}
                        />
                    ))}
                    <div className="add-sub-option">
                        <div className="input-group">
                            <label className="upload-label" htmlFor="file-input">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="미리보기" className="preview-image" />
                                ) : (
                                    <span className="upload-placeholder">이미지 선택</span>
                                )}
                            </label>
                            <input
                                type="file"
                                id="file-input"
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

function SubOption({ subOption, removeSubOption }) {
    return (
        <div className="option-sub-item">
            {subOption.imageUrl && (
                <img src={subOption.imageUrl || 'https://via.placeholder.com/150'} alt="옵션 이미지" className="sub-option-image" />
            )}
            <span className="sub-option-name">{subOption.name}</span>
            <button className="delete-button" onClick={removeSubOption}>
                &times;
            </button>
        </div>
    );
}

export default VenderOption;
