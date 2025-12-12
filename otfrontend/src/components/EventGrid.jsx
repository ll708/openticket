import React from "react";
import EventCard from "./EventCard";

export default function EventGrid({ events, onEventClick }) {
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500 py-12">
        目前無符合搜尋關鍵字之活動
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
}
