import { useState, useEffect, useCallback } from "react";
// 引入需要的圖標
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// =========================================================
// 圖片載入模式配置
// =========================================================
const USE_HARDCODED_IMAGES = true;

const HARDCODED_IMAGE_PATHS = [
    '/images/test.jpg',
    '/images/test_2.jpg',
    '/images/test_3.jpg',
];

const REMOTE_API_BASE_URL = 'http://localhost:8080';
const REMOTE_API_ENDPOINT = `${REMOTE_API_BASE_URL}/api/hero-images`;
const SLIDE_INTERVAL = 8000;

const FALLBACK_IMAGES = [
    "https://via.placeholder.com/1920x1080/f8f8f8/c0c0c0?text=Loading+Image+1",
    "https://via.placeholder.com/1920x1080/e0e0e0/c0c0c0?text=Loading+Image+2",
];

function Hero() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const activeImages = images.length > 0 ? images : FALLBACK_IMAGES;
    const imagesCount = activeImages.length;

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = query.trim();
        if (keyword) {
            navigate(`/events?keyword=${encodeURIComponent(keyword)}`);
        } else {
            navigate('/events');
        }
    };

    useEffect(() => {
        if (USE_HARDCODED_IMAGES) {
            setImages(HARDCODED_IMAGE_PATHS);
            return;
        }

        const fetchImages = async () => {
            try {
                const response = await fetch(REMOTE_API_ENDPOINT);
                const data = await response.json();
                const urlsWithBase = data.map(relativeUrl => REMOTE_API_BASE_URL + relativeUrl);
                if (urlsWithBase.length > 0) setImages(urlsWithBase);
            } catch (error) {
                console.error("無法載入輪播圖片，使用 fallback 圖片。", error);
            }
        };
        fetchImages();
    }, []);

    const goToSlide = useCallback((index) => {
        let newIndex = index;
        if (newIndex >= imagesCount) newIndex = 0;
        else if (newIndex < 0) newIndex = imagesCount - 1;
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
    }, [imagesCount, SLIDE_INTERVAL]);

    // 箭頭按鈕樣式
    const arrowButtonClass = `
        absolute top-1/2 transform -translate-y-1/2 
        bg-gray-500 bg-opacity-40 hover:bg-opacity-60 
        text-white rounded-full z-30 transition cursor-pointer 
        flex items-center justify-center
        w-8 h-8 p-1.5 md:w-12 md:h-12 md:p-3
    `;

    return (
        <section className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-black">
            
            {/* 容器：控制高度
               Mobile: aspect-[16/9] (確保寬螢幕比例，不切圖)
               Desktop: h-screen (全螢幕)
            */}
            <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-[75vh] lg:h-screen">
                
                {/* 背景圖片層 */}
                <div className="absolute inset-0 z-0 w-full h-full">
                    {activeImages.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="w-full h-full absolute top-0 left-0"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                transition: 'opacity 1s ease-in-out',
                                opacity: index === currentImageIndex ? 1 : 0,
                            }}
                        />
                    ))}
                </div>

                {/* 左右箭頭 */}
                {imagesCount > 1 && (
                    <>
                        <div className={`${arrowButtonClass} left-2 md:left-4`} onClick={goToPrev}>
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className={`${arrowButtonClass} right-2 md:right-4`} onClick={goToNext}>
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </>
                )}

                {/* 內容層：搜尋框 
                   使用 pointer-events-none 讓這個滿版圖層不擋住箭頭點擊
                   內部實際內容再開 pointer-events-auto
                */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 md:justify-center md:pb-0 items-center w-full pointer-events-none">
                    
                    {/* 搜尋框外層容器 (白色膠囊)
                        這裡設定了寬度：手機 80%，桌機 600px
                        這裡設定了高度：手機 3rem (h-12)，桌機 4rem (h-16)
                    */}
                    <div className="pointer-events-auto relative bg-white rounded-full shadow-xl w-[80%] md:w-[600px] h-12 md:h-16 transition-all duration-300">
                        <form
                            onSubmit={handleSearch}
                            className="w-full h-full relative flex items-center"
                        >
                            {/* 輸入框：背景透明，這樣才看得到外層的圓角白色 */}
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-full bg-transparent outline-none text-gray-800 placeholder-gray-400 rounded-full
                                    pl-5 pr-14              /* 右邊 padding 留給按鈕 */
                                    text-base md:text-xl    /* 字體大小響應式 */
                                "
                                placeholder="搜尋活動"
                            />
                            
                            {/* 搜尋按鈕：使用 absolute 定位固定在右邊，確保不跑版 */}
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 
                                    bg-orange-500 hover:bg-orange-600 text-white rounded-full 
                                    flex items-center justify-center shadow-md transition duration-200
                                    w-9 h-9 md:w-14 md:h-14  /* 按鈕大小響應式 */
                                "
                            >
                                <Search className="w-5 h-5 md:w-7 md:h-7" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;