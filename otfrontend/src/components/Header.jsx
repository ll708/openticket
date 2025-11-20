import { Link } from 'react-router-dom'; 
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';



function Header({ showSearchBar = false }) {
  return (
    // 保持 header 的 flex 和 justify-between 樣式
    <header className="flex justify-between items-center px-6 py-2 bg-text text-bg">
      
      {/* 左側群組：Logo + 主要連結 */}
      <div className="flex items-center space-x-6">
        
        {/* Logo 連結到首頁 */}
        <Link to="/" className="text-2xl font-bold text-primary">OpenTicket</Link>
        
        <div className="flex-grow mx-12">
          {showSearchBar && (
            <div className="relative max-w-lg mx-auto">
              <input 
                type="text" 
                placeholder="搜尋活動"
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" 
              />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
                    )}
          </div>

        <Link to="/events" className="hover:underline">活動資訊</Link>
        
        <Link to="/news" className="hover:underline">最新消息</Link>
      </div>

      {/* 第二組：靠右的功能性連結/按鈕 */}
      <div className="flex items-center space-x-4">
        
        <Link to="/login" className="hover:underline">會員資訊</Link> 
        
        {/* Sign in 按鈕 (通常也連結到 /login) */}
        <Button variant="secondary" className="ml-2">
          <Link to="/login" className="text-text">登入/註冊</Link>
        </Button>
      </div>

    </header>
  );
}

export default Header;