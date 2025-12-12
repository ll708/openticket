
import React, { useEffect, useState } from "react";

export default function EventIntro({ eventId }) {
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/events/intro/${eventId}`)
      .then(res => {
        if (!res.ok) throw new Error("活動介紹取得失敗");
        return res.text();
      })
      .then(data => {
        setIntro(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div className="text-center py-8">活動介紹載入中...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;

  return (
    <div className="pt-4">
      <div dangerouslySetInnerHTML={{ __html: intro.replace(/\n/g, '<br>') }} />
    </div>
  );
}
