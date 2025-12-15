import React from "react";

export default function EventHero({ image, title }) {
  return (
    <div className="w-full relative overflow-hidden pb-3" style={{ minHeight: '320px' }}>
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <img
          src={image}
          alt="背景模糊"
          className="w-full h-full object-cover blur-lg scale-100"
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center z-20 w-full">
        {/* 主圖外框：2.3:1 比例，object-cover，與活動卡片一致 */}
        <div className="relative w-full aspect-[85/37] max-w-4xl mx-auto mt-4 rounded shadow-lg bg-[#222] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white text-center mt-4 mb-2 drop-shadow-lg">
          {title}
        </div>
      </div>
    </div>
  );
}
