"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface Demo {
  id: string;
  clientName: string;
  time: string;
  date: number; // Day of the month for simplicity
  status: "Scheduled" | "Completed" | "Rescheduled" | "Cancelled";
}

interface CalendarViewProps {
  demos: Demo[];
}

export default function CalendarView({ demos }: CalendarViewProps) {
  // Mock calendar for current month (Oct 2023 for example purposes)
  const daysInMonth = 31;
  const firstDayOfMonth = 0; // Sunday

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F1F] flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">October 2023</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 dark:border-[#2A2A2A] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors">
            Today
          </button>
          <button className="p-2 border border-gray-200 dark:border-[#2A2A2A] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#111]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-[120px] bg-gray-200 dark:bg-[#1F1F1F] gap-px">
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="bg-white dark:bg-[#0A0A0A]" />
        ))}
        {days.map((day) => {
          const dayDemos = demos.filter(d => d.date === day);
          const isToday = day === 24; // Mock today

          return (
            <div key={day} className={clsx(
              "bg-white dark:bg-[#0A0A0A] p-2 transition-colors hover:bg-gray-50 dark:hover:bg-[#0F0F0F]",
              isToday && "bg-blue-50/30 dark:bg-blue-900/10"
            )}>
              <div className="flex justify-between items-start mb-2">
                <span className={clsx(
                  "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                  isToday ? "bg-blue-600 text-white font-bold" : "text-gray-700 dark:text-gray-300 font-medium"
                )}>
                  {day}
                </span>
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[70px] custom-scrollbar">
                {dayDemos.map((demo) => (
                  <div
                    key={demo.id}
                    className={clsx(
                      "px-2 py-1 text-[11px] rounded truncate cursor-pointer transition-colors border border-transparent",
                      demo.status === "Scheduled" && "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/10 hover:bg-blue-200 dark:hover:bg-blue-500/30",
                      demo.status === "Completed" && "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/10 hover:bg-green-200 dark:hover:bg-green-500/30",
                      demo.status === "Rescheduled" && "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/10 hover:bg-orange-200 dark:hover:bg-orange-500/30",
                      demo.status === "Cancelled" && "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/10 hover:bg-gray-200 dark:hover:bg-gray-500/30"
                    )}
                  >
                    <span className="font-semibold">{demo.time}</span> {demo.clientName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
