import React from "react";
import { Button } from "@/components/ui/button";

export default function EventTabs({ tab, onTabChange }) {
  return (
    <div className="w-full md:w-1/3 flex mb-8 bg-white rounded-lg shadow-sm border overflow-hidden">
      <Button
        className={`flex-1 rounded-none py-3 text-base font-medium transition-colors duration-150 ${tab === "all" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
        onClick={() => onTabChange("all")}
        tabIndex={0}
        aria-selected={tab === "all"}
      >全部活動</Button>
      <Button
        className={`flex-1 rounded-none py-3 text-base font-medium transition-colors duration-150 border-l ${tab === "upcoming" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
        style={{ boxShadow: "none", border: "none" }}
        onClick={() => onTabChange("upcoming")}
        tabIndex={0}
        aria-selected={tab === "upcoming"}
      >近期活動</Button>
    </div>
  );
}
