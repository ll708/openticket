import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// 假設 event 物件包含 id, image, title, eventStart 屬性
// onClick 處理點擊導航的行為
export default function EventCard({ event, onClick }) {
    return (
        <Card
            key={event.id}
            className="bg-white shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 p-0 overflow-hidden rounded-xl"
            onClick={onClick}
        >
            {/* 維持寬高比例的圖片外框 */}
            <div className="relative w-full aspect-[85/37] bg-gray-100">
                <img
                    src={event.image || "https://placehold.co/600x400/eeeeee/333333?text=No+Image"}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                    onError={e => (e.target.src = "/images/no-image1.png")}
                />
            </div>
            <div className="data p-4">
                {/* 活動日期 (假設 eventStart 已經是格式化好的字串) */}
                <div className="date text-gray-500 text-sm mb-1 h-5">{event.eventStart || "日期未定"}</div>
                {/* 活動標題 - 固定兩行高度 */}
                <div className="font-bold text-xl text-gray-900 leading-snug line-clamp-2 h-14">
                    {event.title}
                </div>
            </div>
        </Card>
    );
}