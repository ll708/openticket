// src/pages/Events.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import EventTabs from "../components/EventTabs";
import EventGrid from "../components/EventGrid";
import Top from "../components/ui/Top";

export default function Events() {
    // 分頁狀態與活動資料
    const [tab, setTab] = useState("all");
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null); // 新增錯誤狀態
    const [loading, setLoading] = useState(true); // 新增載入狀態
    const navigate = useNavigate();
    const location = useLocation();

    // 取得 URL 上的 keyword 參數
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword")?.trim() || "";

    // 取得活動資料並格式化日期
    const fetchEvents = () => {
        setLoading(true);
        setError(null);
        fetch("/api/events")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const fixed = Array.isArray(data)
                    ? data.map(event => ({
                        ...event,
                        eventStart: formatDate(event.eventStart)
                    }))
                    : [];
                setEvents(fixed);
            })
            .catch((error) => {
                console.error("取得活動資料失敗", error);
                setError("無法載入活動資料，請稍後再試。");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // 依分頁與關鍵字過濾活動
    let filteredEvents = Array.isArray(events) ? events : [];
    if (tab === "upcoming") {
        filteredEvents = [...filteredEvents].sort((a, b) => {
            const parseDate = (str) => new Date(str);
            return parseDate(a.eventStart) - parseDate(b.eventStart);
        });
    }
    if (keyword) {
        const lower = keyword.toLowerCase();
        filteredEvents = filteredEvents.filter(
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
                <EventTabs tab={tab} onTabChange={setTab} />

                {/* 錯誤提示與載入狀態 */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white shadow-lg rounded-xl overflow-hidden">
                                <div className="w-full aspect-[85/37] skeleton" />
                                <div className="p-4">
                                    <div className="skeleton skeleton-text w-1/3 mb-2" />
                                    <div className="skeleton skeleton-text w-full mb-2" />
                                    <div className="skeleton skeleton-text w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
                        <strong className="font-bold">錯誤！</strong>
                        <span className="block sm:inline"> {error}</span>
                        <button
                            onClick={fetchEvents}
                            className="ml-4 underline hover:text-red-900 font-semibold"
                        >
                            重試
                        </button>
                    </div>
                )}

                {/* 活動卡片區塊 */}
                {!loading && !error && (
                    <EventGrid
                        events={filteredEvents}
                        onEventClick={event => navigate(`/events/detail/${event.id}`)}
                    />
                )}
            </main>
            <Footer />
            <Top />
        </div>
    );
}

// 日期格式化工具
function formatDate(dateStr) {
    if (!dateStr) return "未定";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "未定";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}/${m}/${day}`;
}
