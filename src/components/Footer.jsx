import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Search } from "lucide-react"; 


function Footer() {
  return (
    <footer className="bg-text text-bg text-sm p-4 flex items-center justify-between">
      {/* 1. 版權文字 (左側) */}
      <div className="flex items-center space-x-6">
        <RouterLink to="/" className="text-sm font-bold text-primary">OpenTicket</RouterLink>
        <p>© 2025 OpenTicket. All rights reserved.</p>
      </div>
      {/* 2. 連結群組 (右側) */}
      <div className="space-x-4">
        <a href="mailto:contact@openticket.com" className="hover:underline">聯絡信箱</a>
        <RouterLink to="/FAQList" className="hover:underline">常見問題</RouterLink>
        <RouterLink to="/Privacy" className="hover:underline">Privacy</RouterLink>
      </div>
    </footer>
  );
}

export default Footer;