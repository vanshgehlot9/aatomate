"use client";

import KPICard from "@/components/admin/KPICard";
import {
  Users,
  UserPlus,
  CalendarDays,
  Target,
  Briefcase,
  DollarSign,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Database } from "@/lib/types/supabase";

type DemoBooking = Database['public']['Tables']['demo_bookings']['Row']

export default function DashboardClient({ 
  kpis, 
  revenueData, 
  upcomingDemos 
}: { 
  kpis: any; 
  revenueData: any[]; 
  upcomingDemos: DemoBooking[] 
}) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="pt-2">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-xl leading-relaxed">
          Welcome back. Here's a real-time overview of your business performance.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Leads"
          value={kpis.totalLeads.toString()}
          trend="0%"
          trendUp={true}
          icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-500/10"
        />
        <KPICard
          title="New Leads Today"
          value={kpis.newLeadsToday.toString()}
          trend="0%"
          trendUp={true}
          icon={UserPlus}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-500/10"
        />
        <KPICard
          title="Scheduled Demos"
          value={kpis.scheduledDemos.toString()}
          trend="0%"
          trendUp={true}
          icon={CalendarDays}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-500/10"
        />
        <KPICard
          title="Demo Conv. Rate"
          value={`${kpis.conversionRate}%`}
          trend="0%"
          trendUp={true}
          icon={Target}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-500/10"
        />
        <KPICard
          title="Active Clients"
          value={kpis.activeClients.toString()}
          trend="0%"
          trendUp={true}
          icon={Briefcase}
          iconColor="text-orange-600 dark:text-orange-400"
          iconBg="bg-orange-50 dark:bg-orange-500/10"
        />
        <KPICard
          title="Monthly Revenue"
          value={`₹${kpis.monthlyRevenue.toLocaleString('en-IN')}`}
          trend="0%"
          trendUp={true}
          icon={DollarSign}
          iconColor="text-green-600 dark:text-green-400"
          iconBg="bg-green-50 dark:bg-green-500/10"
        />
        <KPICard
          title="Pending Payments"
          value={`₹${kpis.pendingPayments.toLocaleString('en-IN')}`}
          trend="0%"
          trendUp={false}
          icon={CreditCard}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-500/10"
        />
        <KPICard
          title="Closed Deals"
          value={kpis.closedDeals.toString()}
          trend="0%"
          trendUp={true}
          icon={CheckCircle2}
          iconColor="text-cyan-600 dark:text-cyan-400"
          iconBg="bg-cyan-50 dark:bg-cyan-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
            <select className="bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#1F1F1F] text-gray-700 dark:text-gray-300 rounded-lg text-sm px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${value}`, "Revenue"]}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Next Demos */}
        <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Demos</h2>
            <Link href="/admin/demos" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {upcomingDemos.length === 0 ? (
               <p className="text-sm text-gray-500">No upcoming demos.</p>
            ) : upcomingDemos.map((demo, i) => (
              <div key={demo.id} className="flex gap-4 items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#151515] transition-colors border border-transparent dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">
                  {demo.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {demo.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {demo.company || demo.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-medium bg-gray-100 dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md">
                      {new Date(demo.booking_date).toLocaleDateString()}, {demo.booking_time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
