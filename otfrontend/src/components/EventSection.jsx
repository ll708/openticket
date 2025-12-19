import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react"; 

// 顯示卡片數量常量
const CARDS_PER_PAGE = 4;
// 總共顯示的活動數量 
const MAX_EVENTS_DISPLAY = 8;

// =================================================================
// 日期格式化函式 (不變)
// =================================================================
function formatDate(dateStr) {
  if (!dateStr) return "未定";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "未定";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
}

// =================================================================
// Detailed Event Card Component (樣式調整為適用於 4 欄格線 - 不變)
// =================================================================
function DetailedEventCard({ event, onClick }) {
  // 渲染向下箭頭的 SVG 路徑
  const ArrowIcon = (
    <svg className="absolute bottom-2 right-2 text-gray-400" viewBox="0 0 24 24" width="1.5em" height="1.5em" aria-hidden="true" focusable="false">
      <path d="M6.99 9.16a.6.6 0 00-.4-.16.6.6 0 00-.42.16.5.5 0 00-.17.37c0 .14.07.28.17.37l5.45 4.92c.04.06.09.1.15.15.14.05.3.05.44 0a.6.6 0 00.18-.11l5.45-4.92a.5.5 0 00.16-.37.5.5 0 00-.16-.37.6.6 0 00-.41-.16.6.6 0 00-.41.16l-5.03 4.46-5-4.5z"></path>
    </svg>
  );

  return (
    <Card
      key={event.id}
      className="bg-white shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 p-0 overflow-hidden rounded-xl"
      onClick={onClick}
    >
      {/* 與活動卡片一致的圖片外框與樣式 */}
      <div className="relative w-full aspect-[85/37] bg-gray-100">
        <img
          src={event.image || "https://placehold.co/600x400/eeeeee/333333?text=No+Image"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
          onError={e => (e.target.src = "/images/no-image1.png")}
        />
        {ArrowIcon}
      </div>
      <div className="data p-4">
        <div className="date text-gray-500 text-sm mb-1 h-5">{event.eventStart || "日期未定"}</div>
        <div className="font-bold text-xl text-gray-900 leading-snug line-clamp-2 h-14">
          {event.title}
        </div>
      </div>
    </Card>
  );
}

// =================================================================
// 自訂箭頭組件 - 不變 (無限迴圈時，箭頭將永遠不會被禁用)
// =================================================================
const CustomArrowIcon = ({ direction, onClick }) => {
  // 移除 disabled 屬性，因為無限循環時按鈕不會被禁用
  const IconComponent = direction === 'left' 
    ? <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-2 stroke-white"><path d="M15 18l-6-6 6-6"/></svg> // 簡化左箭頭 SVG
    : <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-2 stroke-white"><path d="M9 18l6-6-6-6"/></svg>; // 簡化右箭頭 SVG

  return (
    <button
      onClick={onClick}
      className={`
        absolute z-20 top-1/2 transform -translate-y-1/2 
        p-2 rounded-full bg-gray-500 bg-opacity-70 text-white 
        shadow-lg transition duration-200 
        hover:bg-opacity-90 // 無限循環，永遠可點擊
        ${direction === 'left' ? 'left-0 ml-4' : 'right-0 mr-4'}
      `}
      aria-label={direction === 'left' ? "上一頁" : "下一頁"}
    >
      {IconComponent}
    </button>
  );
};


// =================================================================
// EventSection 主組件 (使用無限迴圈分頁邏輯)
// =================================================================
function EventSection() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  // 追蹤當前頁面索引，從 0 開始
  const [currentPage, setCurrentPage] = useState(0);
  // 追蹤滑動方向
  const [slideDirection, setSlideDirection] = useState('right'); 

  // 取得活動資料 (邏輯不變)
  useEffect(() => {
    setLoading(true);
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        const fixed = Array.isArray(data)
          ? data.map(event => ({
             ...event,
             eventStart: formatDate(event.eventStart) 
           }))
          : [];
        // 只保留最多 MAX_EVENTS_DISPLAY 個活動
        setEvents(fixed.slice(0, MAX_EVENTS_DISPLAY));
      })
      .catch((error) => console.error("取得活動資料失敗", error))
      .finally(() => setLoading(false));
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(events.length / CARDS_PER_PAGE);

  // === 無限迴圈邏輯修改 START ===

  // 切換到下一頁 (無限迴圈)
  const nextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  // 切換到上一頁 (無限迴圈)
  const prevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  
  // === 無限迴圈邏輯修改 END ===

  // 計算當前頁面應該顯示的活動
  const startIndex = currentPage * CARDS_PER_PAGE;
  const currentEvents = events.slice(startIndex, startIndex + CARDS_PER_PAGE);
  
  // 當前沒有活動時的狀態
  const noEvents = events.length === 0;
  
  // 只有在有活動且多於一頁時才顯示導航按鈕
  const showNavigation = !noEvents && totalPages > 1;

  return (
    <section className="py-12 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">熱門活動</h2>
      
      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* 1. 左右切換按鈕 */}
        {showNavigation && (
          <>
            {/* 左箭頭 */}
            <CustomArrowIcon 
              direction="left"
              onClick={prevPage}
              // 無限迴圈時，按鈕永遠不會被禁用
            />

            {/* 右箭頭 */}
            <CustomArrowIcon 
              direction="right"
              onClick={nextPage}
              // 無限迴圈時，按鈕永遠不會被禁用
            />
          </>
        )}
        
        {/* 2. 活動卡片顯示區域 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <div className="w-full aspect-[85/37] skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-1/3 skeleton rounded" />
                  <div className="h-6 w-full skeleton rounded" />
                  <div className="h-6 w-2/3 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : noEvents ? (
          <p className="text-gray-400 mt-8">目前沒有熱門活動資訊。</p>
        ) : (
          <div className="overflow-visible py-4">
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500 ease-in-out ${
                slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right'
              }`}
            >
              {currentEvents.map((event) => (
                <DetailedEventCard
                  key={event.id}
                  event={event}
                  onClick={() => {
                    navigate(`/events/detail/${event.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
      
      <Button className="mt-8 bg-white text-gray-900 hover:bg-gray-200 font-semibold transition duration-200">
        <Link to="/Events">更多活動</Link>
      </Button>
    </section>
  );
}

// 導出 EventSection
export default EventSection;