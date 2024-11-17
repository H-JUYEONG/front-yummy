import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('authUser')),
    });

    // 로그인 함수
    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        setAuth({ token, user });
    };

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setAuth({ token: null, user: null });
        window.location.href = '/user/login'; // 리다이렉트
    };

    // Debugging 용도로 auth 상태를 콘솔에 출력
    useEffect(() => {
        console.log('Auth 상태 변경:', auth);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
