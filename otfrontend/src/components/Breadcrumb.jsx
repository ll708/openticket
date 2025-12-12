import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items, className = "" }) {
  const navigate = useNavigate();
  // 傳統 nav + span 實作（已註解）
  /*
  return (
    <nav className={`text-sm text-gray-700 mb-2 px-6 pt-4 ${className}`}>
      {items.map((item, idx) => (
        <span key={idx}>
          {item.to ? (
            <span
              className="hover:underline cursor-pointer"
              onClick={() => navigate(item.to)}
            >
              {item.label}
            </span>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
  */

  // 語意化 ol/li 麵包屑
  return (
    <nav aria-label="breadcrumb" className={`text-sm text-gray-700 mb-3 px-6 pt-3 ${className}`}>
      <ol className="breadcrumb flex flex-wrap list-none p-0 m-0 bg-transparent">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={
              `inline-flex items-center ${idx === items.length - 1 ? 'text-text font-semibold' : ''}`
            }
            {...(idx === items.length - 1 ? { 'aria-current': 'page' } : {})}
          >
            {item.to && idx !== items.length - 1 ? (
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate(item.to)}
              >
                {item.label}
              </span>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="mx-2 select-none">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
