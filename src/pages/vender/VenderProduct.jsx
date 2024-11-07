import React, { useState } from 'react';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/product.css'; // 상품 등록 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';

function VenderProduct() {
    const [options, setOptions] = useState([
        {
            id: 1, name: '상품종류', subOptions: [
                { name: '일반케이크', imageUrl: 'https://via.placeholder.com/150' },
                { name: '비건케이크', imageUrl: 'https://via.placeholder.com/150' }
            ]
        },
        { id: 2, name: '케이크 사이즈', subOptions: [] },
        { id: 3, name: '맛-시트', subOptions: [] },
        { id: 4, name: '맛-크림', subOptions: [] },
        { id: 5, name: '케이크 배경 색상', subOptions: [] },
        { id: 6, name: '크림 위치', subOptions: [] },
        { id: 7, name: '크림 색상', subOptions: [] },
        { id: 8, name: '데코 종류', subOptions: [] },
        { id: 9, name: '데코 색상', subOptions: [] },
    ]);

    const colors = [
        { name: '빨강', hex: '#FF0000' },
        { name: '파랑', hex: '#0000FF' },
        { name: '초록', hex: '#00FF00' },
        { name: '노랑', hex: '#FFFF00' },
        { name: '보라', hex: '#800080' },
    ];

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

    return (
        <div className="vender-container">
            {/* 사이드바 영역 */}
            <VenderSidebar />
            <div className="vender-content">
                <div className="main-content">
                    <h1 className="product-list-title">옵션 관리 페이지</h1>
                    <ul className="option-list">
                        {options.map(option => (
                            <Option
                                key={option.id}
                                option={option}
                                addSubOption={addSubOption}
                                removeSubOption={removeSubOption}
                                colors={option.name.includes('색상') ? colors : null}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Option({ option, addSubOption, removeSubOption, colors }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [subOptionName, setSubOptionName] = useState("");
    const [subOptionFile, setSubOptionFile] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors ? colors[0].hex : null);

    const handleAddSubOption = () => {
        let newSubOption;
        if (colors) {
            newSubOption = {
                name: '',
                imageUrl: '',
                color: selectedColor
            };
        } else {
            if (!subOptionName.trim() || !subOptionFile) {
                alert("옵션 이름과 이미지를 모두 입력해주세요.");
                return;
            }
            newSubOption = {
                name: subOptionName,
                imageUrl: URL.createObjectURL(subOptionFile),
                color: null
            };
        }
        addSubOption(option.id, newSubOption);
        setSubOptionName("");
        setSubOptionFile(null);
        if (colors) setSelectedColor(colors[0].hex);
    };

    return (
        <li className="option-item">
            <div className="option-header" onClick={() => setIsExpanded(!isExpanded)}>
                <span className="option-name">{option.name}</span>
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
                        {!colors && (
                            <>
                                <input
                                    type="text"
                                    className="input-text"
                                    placeholder="옵션 이름"
                                    value={subOptionName}
                                    onChange={(e) => setSubOptionName(e.target.value)}
                                />
                                <input
                                    type="file"
                                    className="input-file"
                                    accept="image/*"
                                    onChange={(e) => setSubOptionFile(e.target.files[0])}
                                />
                            </>
                        )}
                        {colors && (
                            <div className="color-selection">
                                <select
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="color-dropdown"
                                >
                                    {colors.map((color, index) => (
                                        <option key={index} value={color.hex}>{color.name}</option>
                                    ))}
                                </select>
                                <div className="color-preview" style={{ backgroundColor: selectedColor }}></div>
                            </div>
                        )}
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
            <span className="sub-option-name">{subOption.name || '색상 옵션'}</span>
            {subOption.color && (
                <div className="color-preview" style={{ backgroundColor: subOption.color }}></div>
            )}
            <button className="delete-button" onClick={removeSubOption}>
                &times;
            </button>
        </div>
    );
}

export default VenderProduct;
