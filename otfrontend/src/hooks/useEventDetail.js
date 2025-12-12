import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useEventDetail(eventId) {
  const { isLoggedIn } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(null);

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
    if (isLoggedIn && memberId && eventId) {
      fetch(`http://localhost:8080/wishList/get?userId=${memberId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(wishList => {
          const isInWishList = wishList.some(item => String(item.eventId) === String(eventId));
          setIsFavorited(isInWishList);
        })
        .catch(err => console.error('檢查收藏狀態失敗:', err));
    }
  }, [isLoggedIn, memberId, eventId]);

  // 累加瀏覽量
  useEffect(() => {
    if (eventId) {
      fetch(`/api/events/${eventId}/daily-stats/view`, { method: 'POST' });
      fetch(`/api/events/${eventId}/stats/view`, { method: 'POST' });
    }
  }, [eventId]);

  const event = events.find(e => String(e.id) === String(eventId));

  return {
    event,
    isFavorited,
    setIsFavorited,
    loading,
    memberId,
    isLoggedIn
  };
}
