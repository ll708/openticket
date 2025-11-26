// src/pages/Events.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import EventCard from "../components/EventCard";

export default function Events() {
    const [tab, setTab] = useState("all");
    const [events, setEvents] = useState([]); // 假設活動資料會從 API 獲取並存入此狀態
    const navigate = useNavigate();
    const location = useLocation();

    // 取得 URL 上的 keyword 參數
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword")?.trim() || "";

    // 模擬從 API 獲取活動資料
    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => {
                const fixed = Array.isArray(data)
                    ? data.map(event => ({
                        ...event,
                        eventStart: formatDate(event.eventStart)
                    }))
                    : [];
                setEvents(fixed);
            })
            .catch((error) => console.error("取得活動資料失敗", error));
    }, []);
  
  // 日期格式化函式
  function formatDate(dateStr) {
      if (!dateStr) return "未定";
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "未定";
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}/${m}/${day}`;
  }

    // 根據選擇的分頁篩選活動
    let displayEvents = Array.isArray(events) ? events : [];
    if (tab === "upcoming"){
        displayEvents = [...displayEvents].sort((a, b) => {
            const parseDate = (str) => new Date(str);
            return parseDate(a.eventStart) - parseDate(b.eventStart);
        });
    }

    // 關鍵字過濾（title、address 皆可搜尋）
    if (keyword) {
        const lower = keyword.toLowerCase();
        displayEvents = displayEvents.filter(
            (event) =>
                event.title?.toLowerCase().includes(lower) ||
                event.address?.toLowerCase().includes(lower)
        );
    }

    return (
        <div className="font-sans min-h-screen flex flex-col">
            <Header showSearchBar={true} />
            <main className="flex-1 bg-bg px-6 py-8 max-w-7xl mx-auto w-full">
                {/* 麵包屑 */}
                <Breadcrumb
                    items={[
                        { label: "首頁", to: "/" },
                        { label: "活動資訊" }
                    ]}
                    className="mb-6 text-gray-500"
                />

                {/* 分頁按鈕 */}
                <div className="w-full md:w-1/3 flex mb-8 bg-white rounded-lg shadow-sm border overflow-hidden">
                    <Button
                        className={`flex-1 rounded-none py-3 text-base font-medium transition-colors duration-150 ${tab === "all" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => setTab("all")}
                        tabIndex={0}
                        aria-selected={tab === "all"}
                    >全部活動</Button>
                    <Button
                        className={`flex-1 rounded-none py-3 text-base font-medium transition-colors duration-150 border-l ${tab === "upcoming" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                        style={{ boxShadow: "none", border: "none" }}
                        onClick={() => setTab("upcoming")}
                        tabIndex={0}
                        aria-selected={tab === "upcoming"}
                    >近期活動</Button>
                </div>

                {/* 卡片區塊 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {displayEvents.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-12">
                            目前無符合搜尋關鍵字之活動
                        </div>
                    ) : (
                        displayEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => navigate(`/events/detail/${event.id}`)}
                            />
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
