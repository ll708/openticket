import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Top = () => {
  // 狀態：控制按鈕是否顯示
  const [isVisible, setIsVisible] = useState(false);

  // 滾動處理函數
  const toggleVisibility = () => {
    // 當垂直滾動超過 300px 時，顯示按鈕
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 點擊按鈕，平滑滾動到頁面頂端
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滾動效果
    });
  };

  // 監聽滾動事件
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // 清理函數：在元件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // 僅在元件首次載入時執行

  // 按鈕的樣式設計
  const buttonClasses = `
    fixed // 保持位置不動
    bottom-10 // 距離底部 
    right-6 // 距離右側 1.5rem
    p-3 // 填充
    rounded-full // 圓形
    bg-gray-600 // 灰色背景
    text-white // 白色圖標
    shadow-lg // 陰影
    cursor-pointer // 指針樣式
    transition-opacity // 啟用透明度過渡
    duration-300 // 過渡時間 300ms
    hover:bg-gray-700 // 懸停變深
    opacity-70 // 預設半透明
    hover:opacity-100 // 懸停時完全不透明
    z-50 // 確保它在最上層
  `;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={buttonClasses}
          aria-label="回到頂端"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Top;