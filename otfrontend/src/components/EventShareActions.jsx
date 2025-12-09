import React from "react";
import { useToast } from "./ToastContext";

export default function EventShareActions({ isFavorited, onFavoriteChange, isLoggedIn, memberId, eventId }) {
  const { showToast } = useToast();
  
  // 切換收藏狀態
  const handleFavorite = async () => {
    if (!isLoggedIn) {
      showToast('請先登入再收藏');
      return;
    }

    if (!memberId || !eventId) {
      showToast('資料載入中，請稍後再試');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/wishList/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberId: memberId,
          eventId: eventId
        })
      });

      const data = await response.json();

      if (data.success) {
        // 切換本地狀態
        onFavoriteChange(prev => !prev);
        showToast(data.message);
      } else {
        showToast(data.message || '操作失敗，請稍後再試');
      }
    } catch (error) {
      console.error('收藏操作失敗:', error);
      showToast('網路錯誤，請稍後再試');
    }
  };

  // 分享時呼叫 API
  const handleShare = () => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}/daily-stats/share`, { method: 'POST' });
    fetch(`/api/events/${eventId}/stats/share`, { method: 'POST' });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 px-4 items-center">
      {/* 收藏按鈕 */}
      <button
        className={`rounded-full border w-11 h-11 flex items-center justify-center transition ${isFavorited ? 'bg-red-100 border-red-400 text-red-500' : 'border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-red-500'}`}
        title={isFavorited ? "已收藏" : "收藏"}
        aria-label="收藏"
        type="button"
        onClick={handleFavorite}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path fill={isFavorited ? '#ef4444' : 'currentColor'} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      {/* FB 分享按鈕 */}
      <a
        className="rounded-full border border-gray-300 w-11 h-11 flex items-center justify-center hover:bg-[#0766ff] text-gray-500 hover:text-white transition"
        href={`https://www.facebook.com/dialog/feed?app_id=458584288257241&link=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook 分享"
        aria-label="Facebook 分享"
        onClick={handleShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"><path fillRule="evenodd" d="M13.619 21.666v-8.362h2.78l.415-3.26H13.62v-2.08c0-.944.26-1.587 1.6-1.587h1.708V3.46a23 23 0 0 0-2.49-.128c-2.464 0-4.15 1.519-4.15 4.308v2.404H7.5v3.259h2.787v8.362z" clipRule="evenodd"></path></svg>
      </a>
      {/* Line 分享按鈕 */}
      <a
        className="rounded-full border border-gray-300 w-11 h-11 flex items-center justify-center hover:bg-[#07be5b] text-gray-500 hover:text-white transition"
        href={`https://lineit.line.me/share/ui?url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Line 分享"
        aria-label="Line 分享"
        onClick={handleShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M19.511 5.407S14.304.661 7.014 4.497c-1.5.79-2.813 1.925-3.63 3.413-.883 1.605-1.422 3.918-.047 6.75 0 0 1.83 3.775 7.552 4.497 0 0 1.118 0 .978 1.213l.007 1.154a.522.522 0 0 0 .77.462c1.684-.894 5.807-3.354 8.826-7.378-.001-.007 3.32-4.865-1.959-9.2M9.021 13.46a.13.13 0 0 1-.13.129h-2.75a.13.13 0 0 1-.129-.129V9.29a.13.13 0 0 1 .129-.13h.77a.13.13 0 0 1 .128.13v3.143a.13.13 0 0 0 .13.13H8.89a.13.13 0 0 1 .13.128zm1.637-.009a.13.13 0 0 1-.129.129h-.77a.13.13 0 0 1-.129-.129V9.288a.13.13 0 0 1 .13-.128h.769a.13.13 0 0 1 .129.128zm4.632 0a.13.13 0 0 1-.129.129h-.933a.13.13 0 0 1-.107-.058l-1.532-2.31a.13.13 0 0 0-.21-.004.13.13 0 0 0-.027.076v2.164a.13.13 0 0 1-.037.09.13.13 0 0 1-.091.038h-.77a.13.13 0 0 1-.128-.128V9.288a.13.13 0 0 1 .128-.128h.931a.13.13 0 0 1 .108.057l1.533 2.31a.129.129 0 0 0 .236-.071V9.288a.13.13 0 0 1 .129-.128h.77a.13.13 0 0 1 .128.128zm3.506-3.435a.13.13 0 0 1-.13.128h-1.622a.13.13 0 0 0-.13.13v.479a.13.13 0 0 0 .13.129h1.623a.13.13 0 0 1 .13.128v.77a.13.13 0 0 1-.13.129h-1.753v.655h1.753a.13.13 0 0 1 .13.128v.77a.13.13 0 0 1-.13.128h-2.65a.13.13 0 0 1-.129-.128V9.246a.13.13 0 0 1 .129-.129h2.65a.13.13 0 0 1 .13.129z"></path></svg>
      </a>
      {/* 連結分享按鈕 */}
      <button
        className="rounded-full border border-gray-300 w-11 h-11 flex items-center justify-center hover:bg-gray-200 text-gray-500 hover:text-blue-600 transition"
        title="分享連結"
        aria-label="分享連結"
        type="button"
        onClick={() => {
          handleShare();
          const isWindows = navigator.userAgent.includes('Windows');
          if (navigator.share && !isWindows) {
            navigator.share({
              title: document.title,
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('連結已複製！');
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16.266 15.91a3.555 3.555 0 1 0 0-7.11h-2.682V7h2.682a5.356 5.356 0 0 1 0 10.71h-2.682v-1.8zM7.356 8.8a3.555 3.555 0 1 0 0 7.111h2.682v1.8H7.355a5.355 5.355 0 0 1 0-10.71h2.683v1.8zm-.9 2.656v1.8h10.71v-1.8z"></path></svg>
      </button>
    </div>
  );
}
