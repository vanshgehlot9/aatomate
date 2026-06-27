"use client";

import { Bell, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-[#1F1F1F] bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20 transition-colors duration-300 sticky top-0">
      
      {/* Left side empty or could have breadcrumbs later */}
      <div className="flex-1 hidden md:block"></div>

      <div className="flex-1 flex justify-center md:justify-end md:mr-6">
        <div className="relative w-full max-w-[320px] lg:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, clients, demos..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-[#151515] border border-transparent focus:bg-white dark:focus:bg-[#1A1A1A] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-lg text-sm text-gray-900 dark:text-gray-100 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0A0A]" />
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-[#1F1F1F]" />

        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm border border-black/10 dark:border-white/10" />
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-900 dark:text-white leading-none mb-1">
              Admin User
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
              admin@aatomate.com
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
