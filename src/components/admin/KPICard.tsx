"use client";

import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function KPICard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  iconBg = "bg-blue-50 dark:bg-blue-500/10",
}: KPICardProps) {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-white/0 to-gray-50 dark:to-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="space-y-1">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
            {title}
          </h3>
          <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {value}
          </div>
        </div>
        <div className={clsx("p-3 rounded-xl", iconBg, iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10">
        <span
          className={clsx(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            trendUp
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          )}
        >
          {trendUp ? "+" : ""}{trend}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          from last month
        </span>
      </div>
    </div>
  );
}
