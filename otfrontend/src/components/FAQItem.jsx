import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'; // 假設您已安裝了 heroicons

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 切換展開/收合狀態
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      {/* 問題/標題區塊 */}
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-red-600 focus:outline-none transition duration-150 ease-in-out"
        onClick={toggleOpen}
        aria-expanded={isOpen} // 無障礙輔助
      >
        <span className="flex items-center">
          {/* 圖片中的紅色加號圖標，這裡用heroicons模擬 */}
          {isOpen ? (
            <MinusIcon className="w-5 h-5 text-red-500 mr-3" />
          ) : (
            <PlusIcon className="w-5 h-5 text-red-500 mr-3" />
          )}
          {question}
        </span>
        {/* 右側箭頭/指示器，如果需要 */}
        {/* <svg className={`w-5 h-5 text-gray-400 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> */}
      </button>

      {/* 答案區塊 - 使用條件渲染和 Tailwind 類別控制過渡動畫 */}
      {isOpen && (
        <div className="pt-3 pb-2 transition-all duration-300 ease-in-out">
          <p className="text-base text-gray-600 pl-8 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;