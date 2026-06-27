"use client";

import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Users, Globe, MessageSquare, Cpu, Target, Calendar } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'];

const trafficData = [
  { name: 'Mon', visitors: 4000, sessions: 2400 },
  { name: 'Tue', visitors: 3000, sessions: 1398 },
  { name: 'Wed', visitors: 2000, sessions: 9800 },
  { name: 'Thu', visitors: 2780, sessions: 3908 },
  { name: 'Fri', visitors: 1890, sessions: 4800 },
  { name: 'Sat', visitors: 2390, sessions: 3800 },
  { name: 'Sun', visitors: 3490, sessions: 4300 },
];

export default function AnalyticsClient({ 
  leadSourceData, 
  funnelData, 
  stats 
}: { 
  leadSourceData: any[];
  funnelData: any[];
  stats: any;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
          Analytics Center
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Deep dive into your business metrics, conversion funnels, and agent performance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <Users className="w-8 h-8 mb-4 opacity-80" />
          <div className="text-sm font-medium opacity-80 mb-1">Total Leads</div>
          <div className="text-4xl font-bold">{stats.totalLeads}</div>
          <div className="mt-4 text-xs font-medium bg-white/20 inline-flex px-2 py-1 rounded">
            Overall
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <Globe className="w-8 h-8 mb-4 opacity-80" />
          <div className="text-sm font-medium opacity-80 mb-1">Website Visitors</div>
          <div className="text-4xl font-bold">45.2k</div>
          <div className="mt-4 text-xs font-medium bg-white/20 inline-flex px-2 py-1 rounded">
            +5.2% from last month
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <MessageSquare className="w-8 h-8 mb-4 opacity-80" />
          <div className="text-sm font-medium opacity-80 mb-1">Demos Scheduled</div>
          <div className="text-4xl font-bold">{stats.totalDemos}</div>
          <div className="mt-4 text-xs font-medium bg-white/20 inline-flex px-2 py-1 rounded">
            Overall
          </div>
        </div>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lead Sources */}
        <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Leads by Service</h2>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Funnel */}
        <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sales Funnel Conversion</h2>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" opacity={0.1} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} />
                <Tooltip
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Website Traffic */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Website Traffic (Last 7 Days)</h2>
          <div className="h-[350px] w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Bounce Rate", value: "42.3%", icon: Globe },
          { label: "Avg. Session", value: "2m 14s", icon: Calendar },
          { label: "Active Automations", value: "14", icon: Cpu },
          { label: "Workflow Success", value: "99.8%", icon: Target },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0A0A0A] p-5 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1A1A1A]">
              <stat.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
