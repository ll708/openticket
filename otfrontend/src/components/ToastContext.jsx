// src/contexts/ToastContext.jsx (假設路徑)
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // 顯示提示訊息的函式
    const showToast = useCallback((msg) => {
        setMessage(msg);
        setIsVisible(true);
        // 5 秒後自動消失
        const timer = setTimeout(() => {
            setIsVisible(false);
            // 延遲清除 message 讓淡出效果完成
            setTimeout(() => setMessage(null), 300); 
        }, 3000);
        
        return () => clearTimeout(timer); // 清除定時器
    }, []);

    // Toast 訊息的 UI (這裡只是簡單的結構，樣式可以自行調整)
    const Toast = () => (
    <div className={`fixed top-12 right-4 z-[100] transition-all duration-300
        top-4 right-4
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        
        // --- 替換的通用樣式 (模擬您的 .message 基礎外觀) ---
        py-3 px-4 rounded-lg text-sm text-center shadow-lg 
        
        // --- 成功/錯誤的條件顏色 ---
        ${message?.includes('成功') 
            ? 'bg-blue-100 text-blue-800' // 成功：淺綠色背景，深綠色文字
            : 'bg-red-100 text-red-800'     // 錯誤：淺紅色背景，深紅色文字
        }
    `}
    >
        {message}
    </div>
);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {message && <Toast />}
        </ToastContext.Provider>
    );
};