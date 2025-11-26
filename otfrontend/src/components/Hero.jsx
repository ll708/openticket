import { useState, useEffect, useCallback } from "react";
// 引入需要的圖標：搜尋、左箭頭、右箭頭
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

// 輪播間隔時間（1 秒）
const SLIDE_INTERVAL = 1000;

// 搜尋按鈕尺寸定義 (保持與之前一致)
const BUTTON_SIZE = '3.5rem'; 
const CONTAINER_HEIGHT = '4rem'; 
const PADDING_FOR_BUTTON = '4.0rem'; 

// 靜態 fallback 圖片 (如果 API 呼叫失敗或正在載入時使用)
// ⚠️ 注意：這些 URL 必須是公開可訪問的。
const FALLBACK_IMAGES = [
  "https://via.placeholder.com/1920x1080/f8f8f8/c0c0c0?text=Loading+Image+1",
  "https://via.placeholder.com/1920x1080/e0e0e0/c0c0c0?text=Loading+Image+2",
];

// ⚠️ 圖片基礎路徑：由於您的資料庫只存了 /uploads/...，
// 您需要將其與您的後端圖片服務器地址結合。
const BASE_IMAGE_URL = 'http://localhost:8080'; // 假設 Spring Boot 運行在 8080 port


function Hero() {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 判斷要使用的圖片列表：如果 images 狀態為空，則使用 fallback 圖片
  const activeImages = images.length > 0 ? images : FALLBACK_IMAGES;
  const imagesCount = activeImages.length;
  
  // const navigate = useNavigate(); // 假設已啟用 useNavigate

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim();
    if (keyword) {
      navigate(`/events?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate('/events');
    }
  };


  // 🎯 載入圖片資料的 useEffect (連接 Spring Boot API)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // 呼叫 Spring Boot Controller 定義的 API 接口
        const response = await fetch('http://localhost:8080/api/hero-images'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 將資料庫返回的相對路徑 (例如: /uploads/...) 加上基礎 URL
        const urlsWithBase = data.map(relativeUrl => BASE_IMAGE_URL + relativeUrl);
        
        if (urlsWithBase.length > 0) {
            setImages(urlsWithBase);
        }
      } catch (error) {
        console.error("無法載入輪播圖片，使用 fallback 圖片。", error);
      }
    };

    fetchImages();
  }, []); 

  // --- 輪播邏輯 (與上一版本相同，使用 imagesCount) ---
  const goToSlide = useCallback((index) => {
    let newIndex = index;
    if (newIndex >= imagesCount) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = imagesCount - 1;
    }
    setCurrentImageIndex(newIndex);
  }, [imagesCount]);

  const goToPrev = () => goToSlide(currentImageIndex - 1);
  const goToNext = () => goToSlide(currentImageIndex + 1);

  useEffect(() => {
    if (imagesCount > 1) { 
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesCount);
      }, SLIDE_INTERVAL); 
      return () => clearInterval(timer); 
    }
  }, [imagesCount]); 
  // --------------------------------------------------

  // 左右箭頭共用樣式
  const arrowButtonClass = "absolute top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full z-30 transition cursor-pointer w-12 h-12 flex items-center justify-center";

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      
      {/* 輪播背景圖片容器 */}
      <div className="absolute inset-0 z-0">
        {activeImages.map((imageUrl, index) => (
          <div 
            key={index} 
            style={{
              backgroundImage: `url(${imageUrl})`, // 使用完整的圖片 URL
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              transition: 'opacity 1s ease-in-out',
              opacity: index === currentImageIndex ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
            }}
          />
        ))}
      </div>

      {/* 左右箭頭導航 */}
      {imagesCount > 1 && (
        <>
          <div className={`${arrowButtonClass} left-4`} onClick={goToPrev}>
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div className={`${arrowButtonClass} right-4`} onClick={goToNext}>
            <ChevronRight className="w-6 h-6" />
          </div>
        </>
      )}

      {/* 內容區：置於背景圖片之上 */}
      <div className="relative z-20 text-center p-4">
        {/* 文字顏色 (深色背景參考圖中文字是白色，淺色背景參考圖中文字是淺灰，這裡使用淺灰) */}
        <h2 className="text-6xl font-extrabold mb-4" style={{ color: '#c0c0c0' }}>Let there be live</h2>
        <p className="text-xl mb-10 opacity-80" style={{ color: '#c0c0c0' }}>Your next best-night-ever is waiting</p>

        {/* 搜尋框部分 */}
        <div 
          className="relative w-full max-w-xl mx-auto rounded-full shadow-lg"
          style={{ height: CONTAINER_HEIGHT }} 
        >
          <form
            onSubmit={handleSearch}
            className="flex items-stretch h-full"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-8 text-lg text-gray-800 bg-white rounded-full outline-none placeholder-gray-400"
              placeholder="搜尋活動" 
              style={{ paddingRight: PADDING_FOR_BUTTON }}
            />
          </form>
          
          {/* 搜尋按鈕：圓形且位置優化 */}
          <button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transition duration-200"
            style={{
              borderRadius: '50%',
              width: BUTTON_SIZE, 
              height: BUTTON_SIZE,
              right: '0.4rem', 
            }}
            onClick={handleSearch}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;