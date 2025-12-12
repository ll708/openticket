import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [onToastClick, setOnToastClick] = useState(null);
    const [timerRef, setTimerRef] = useState(null);

    // 關閉 Toast 的函式
    const closeToast = useCallback(() => {
        if (timerRef) clearTimeout(timerRef);
        setIsVisible(false);
        setTimeout(() => setMessage(null), 300);
    }, [timerRef]);

    // 顯示提示訊息的函式
    const showToast = useCallback((msg, onClick = null) => {
        // 清除之前的定時器
        if (timerRef) clearTimeout(timerRef);
        
        setMessage(msg);
        setIsVisible(true);
        
        // 包裝 onClick 以在點擊時關閉 Toast
        const wrappedOnClick = onClick ? () => {
            closeToast();
            onClick();
        } : null;
        
        setOnToastClick(() => wrappedOnClick);
        
        // 3 秒後自動消失
        const timer = setTimeout(() => {
            setIsVisible(false);
            // 延遲清除 message 讓淡出效果完成
            setTimeout(() => setMessage(null), 300); 
        }, 3000);
        
        setTimerRef(timer);
        return () => clearTimeout(timer); // 清除定時器
    }, [timerRef, closeToast]);

    const handleToastClick = () => {
        if (onToastClick) {
            onToastClick();
        }
    };

    // Toast 訊息的 UI (這裡只是簡單的結構，樣式可以自行調整)
    const Toast = () => (
    <div className={`fixed top-14 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300
        
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        
        // --- 替換的通用樣式---
        py-3 px-4 rounded-lg text-sm text-center shadow-lg 
        ${onToastClick ? 'cursor-pointer hover:shadow-xl' : ''}
        
        // --- 成功/錯誤的條件顏色 ---
        ${message?.includes('成功') 
            ? 'bg-blue-100 text-blue-800' // 成功
            : 'bg-red-100 text-red-800'   // 錯誤
        }
    `}
    onClick={handleToastClick}
    >
        <div>{message}</div>
        {onToastClick && <div className="text-xs mt-1">按此手動跳轉</div>}
    </div>
);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {message && <Toast />}
        </ToastContext.Provider>
    );
};