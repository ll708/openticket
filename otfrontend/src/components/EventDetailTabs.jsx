import React from "react";
import EventIntro from "./EventIntro";
import EventNote from "./EventNote";

export default function EventDetailTabs({ eventId }) {
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
