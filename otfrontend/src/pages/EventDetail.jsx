import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import Breadcrumb from "../components/Breadcrumb";
import EventHero from "../components/EventHero";
import EventShareActions from "../components/EventShareActions";
import EventIntro from "../components/EventIntro";
import EventNote from "../components/EventNote";
import { useAuth } from "../hooks/useAuth";


export default function EventDetail() {
  const { isLoggedIn } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 每次進入詳情頁時，呼叫 API 累加每日與總瀏覽量
  useEffect(() => {
    if (id) {
      // 累加每日瀏覽量
      fetch(`/api/events/${id}/daily-stats/view`, { method: 'POST' });
      // 累加總瀏覽量
      fetch(`/api/events/${id}/stats/view`, { method: 'POST' });
    }
  }, [id]);
  
  // 獲取會員 ID
  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8080/member/profile', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setMemberId(data.id))
      .catch(err => console.error('獲取會員資料失敗:', err));
    }
  }, [isLoggedIn]);
  
  // 獲取活動資料
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/events")
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  // 檢查收藏狀態
  useEffect(() => {
    if (isLoggedIn && memberId && id) {
      fetch(`http://localhost:8080/wishList/get?userId=${memberId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(wishList => {
          const isInWishList = wishList.some(item => String(item.eventId) === String(id));
          setIsFavorited(isInWishList);
        })
        .catch(err => console.error('檢查收藏狀態失敗:', err));
    }
  }, [isLoggedIn, memberId, id]);

  const event = events.find(e => String(e.id) === String(id));

  // 若從登入頁帶著 goTicket=1 返回且已登入，直接導向購票
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (isLoggedIn && params.get('goTicket') === '1' && event) {
      navigate(`/Ticket?eventId=${event.id}`, { replace: true });
    }
  }, [isLoggedIn, location.search, event, navigate]);

  if (loading) {
    return <div className="text-center py-12">載入中...</div>;
  }
  if (!event) {
    navigate("/events", { replace: true });
    return null;
  }

  const handlePurchase = () => {
    if (!isLoggedIn) {
      alert('請先登入再購票');
      navigate('/login', { state: { redirect: `/events/detail/${event.id}?goTicket=1` } });
      return;
    }
    navigate(`/Ticket?eventId=${event.id}`);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header showSearchBar={true} />
      {/* 麵包屑 */}
      <div className="max-w-7xl mx-auto w-full px-0 py-0">
        <Breadcrumb
          items={[
            { label: "首頁", to: "/" },
            { label: "活動資訊", to: "/events" },
            { label: event.title }
          ]}
        />
      </div>
      {/* 主視覺 */}
      <EventHero image={event.image} title={event.title} />
      <main className="flex-1 bg-bg px-0 py-0 max-w-7xl mx-auto w-full">
        {/* 立即購票按鈕 */}
        <div className="flex justify-center gap-4 mt-4 px-4">
          <Button
            className="bg-blue-600 text-white px-8 py-3 text-lg"
            onClick={handlePurchase}
          >
            立即購票
          </Button>
        </div>
        {/* 收藏與分享按鈕 */}
        <EventShareActions
          isFavorited={isFavorited}
          isLoggedIn={isLoggedIn}
          memberId={memberId}
          eventId={id}
          onFavoriteChange={setIsFavorited}
        />
        {/* 活動說明 */}
        <EventDetailTabs eventId={event.id} />
      </main>
      <Footer />
    </div>
  );
}

// 分頁切換元件
function EventDetailTabs({ eventId }) {
  const [tab, setTab] = React.useState('intro');
  return (
    <div className="bg-white mt-0 px-4 md:px-12 py-8">
      <div className="sticky top-0 bg-white z-10 flex border-b border-gray-300 mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 text-lg font-bold border-b-2 transition-colors duration-150 whitespace-nowrap ${tab === 'intro' ? 'text-blue-800 border-blue-700' : 'text-gray-500 border-transparent hover:text-blue-700'}`}
          onClick={() => setTab('intro')}
          aria-selected={tab === 'intro'}
          aria-controls="intro"
          id="tab-intro"
          type="button"
        >
          活動介紹
        </button>
        <button
          className={`px-4 py-2 text-lg font-bold border-b-2 transition-colors duration-150 whitespace-nowrap ${tab === 'note' ? 'text-blue-800 border-blue-700' : 'text-gray-500 border-transparent hover:text-blue-700'}`}
          onClick={() => setTab('note')}
          aria-selected={tab === 'note'}
          aria-controls="note"
          id="tab-note"
          type="button"
        >
          注意事項
        </button>
      </div>
      <div id="intro" hidden={tab !== 'intro'}>
        <EventIntro eventId={eventId} />
      </div>
      <div id="note" hidden={tab !== 'note'}>
        <EventNote eventId={eventId} />
      </div>
    </div>
  );
}
