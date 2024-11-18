import React, { createContext, useState, useContext } from 'react';

// VenderContext 생성
const VenderContext = createContext();

// VenderContext Provider 컴포넌트
    export const VenderProvider = ({ children }) => {
    const [venderData, setVenderData] = useState({
        venderName: '',
        content: '',
        logoPreview: null,
        bannerPreview: null,
    });

    const updateVenderData = (newData) => {
        setVenderData((prevData) => ({
        ...prevData,
        ...newData,
    }));
    };

    return (
        <VenderContext.Provider value={{ venderData, updateVenderData }}>
        {children}
        </VenderContext.Provider>
    );
    };

    // VenderContext를 사용하는 커스텀 훅
    export const useVenderContext = () => {
    return useContext(VenderContext);
    };