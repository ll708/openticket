// src/pages/Events.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventTabs from "../components/EventTabs";
import EventGrid from "../components/EventGrid";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function Events() {
    // 分頁狀態與活動資料
    const [tab, setTab] = useState("all");
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // 取得 URL 上的 keyword 參數
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword")?.trim() || "";

    // 取得活動資料並格式化日期
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

                {/* 活動卡片區塊 */}
                <EventGrid
                  events={filteredEvents}
                  onEventClick={event => navigate(`/events/detail/${event.id}`)}
                />
            </main>
            <Footer />
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
