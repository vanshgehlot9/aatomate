"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import CalendarView from "@/components/admin/demos/CalendarView";
import { Plus, List, Calendar as CalendarIcon } from "lucide-react";
import clsx from "clsx";
import { Database } from "@/lib/types/supabase";

type DemoBooking = Database['public']['Tables']['demo_bookings']['Row']

export default function DemosClient({ initialDemos }: { initialDemos: DemoBooking[] }) {
  const [view, setView] = useState<"list" | "calendar">("calendar");

  const columns: Column<DemoBooking>[] = [
    {
      header: "Client",
      accessorKey: "name",
      cell: (demo) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{demo.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{demo.company || demo.email}</div>
        </div>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "booking_date",
      cell: (demo) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{new Date(demo.booking_date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{demo.booking_time}</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (demo) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          demo.status === "Scheduled" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
          demo.status === "Completed" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
          demo.status === "Rescheduled" && "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
          demo.status === "Cancelled" && "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
        )}>
          {demo.status || "Scheduled"}
        </span>
      ),
    },
  ];

  // Map to the format CalendarView expects temporarily
  const calendarEvents = initialDemos.map(demo => ({
    id: demo.id,
    clientName: demo.name,
    company: demo.company || "",
    time: demo.booking_time,
    date: parseInt(demo.booking_date.split('-')[2] || "0"),
    fullDate: new Date(demo.booking_date).toLocaleDateString(),
    link: "TBD",
    status: (demo.status as any) || "Scheduled"
  }));

  // Calculate stats
  const upcomingCount = initialDemos.filter(d => d.status === "Scheduled" || !d.status).length;
  const completedCount = initialDemos.filter(d => d.status === "Completed").length;
  const cancelledCount = initialDemos.filter(d => d.status === "Cancelled").length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Demo Scheduling
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your upcoming demos, history, and meeting links.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-[#111] p-1 rounded-lg flex items-center border border-gray-200 dark:border-[#1F1F1F]">
            <button
              onClick={() => setView("calendar")}
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                view === "calendar"
                  ? "bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView("list")}
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                view === "list"
                  ? "bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Demos", value: upcomingCount.toString(), color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20" },
          { label: "Today's Demos", value: "0", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20" },
          { label: "Completed Demos", value: completedCount.toString(), color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20" },
          { label: "Cancelled", value: cancelledCount.toString(), color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-50 dark:bg-gray-500/10 border-gray-100 dark:border-gray-500/20" },
        ].map((stat, i) => (
          <div key={i} className={clsx("p-4 rounded-xl border", stat.bg)}>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.label}</div>
            <div className={clsx("text-2xl font-bold", stat.color)}>{stat.value}</div>
          </div>
        ))}
      </div>

      {view === "calendar" ? (
        <CalendarView demos={calendarEvents} />
      ) : (
        <DataTable
          data={initialDemos}
          columns={columns}
          searchPlaceholder="Search demos by client or company..."
        />
      )}
    </div>
  );
}
