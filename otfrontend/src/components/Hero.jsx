import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim();
    if (keyword) {
      navigate(`/events?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate('/events');
    }
  };

  return (
    <section className="bg-accent text-center text-accent py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-bg mb-2">Let there be live</h2>
      <p className="text-bg">Your next best-night-ever is waiting</p>
      <form
        onSubmit={handleSearch}
        className="relative w-11/12 sm:w-3/4 md:w-1/2 flex items-center bg-bg rounded-full overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isComposing) {
              handleSearch(e);
            }
          }}
          className="flex-grow px-4 py-3 text-text outline-none"
          aria-label="搜尋活動"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary text-bg px-4 py-3 flex items-center justify-center"
        >
          <Search className="w-6 h-6" />
        </button>
      </form>
    </section>
  );
}

export default Hero;