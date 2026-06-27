"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import KPICard from "@/components/admin/KPICard";
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Download } from "lucide-react";
import clsx from "clsx";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Database } from "@/lib/types/supabase";

type Payment = Database['public']['Tables']['payments']['Row']

export default function PaymentsClient({
  payments,
  stats,
  revenueData,
  serviceRevenueData
}: {
  payments: Payment[];
  stats: { month: number; quarter: number; outstanding: number; paidCount: number };
  revenueData: any[];
  serviceRevenueData: any[];
}) {
  const columns: Column<Payment>[] = [
    {
      header: "Invoice",
      accessorKey: "id",
      cell: (payment) => <span className="font-mono text-xs">{payment.id.split('-')[0]}</span> // Just showing first part of UUID as invoice
    },
    {
      header: "Client",
      accessorKey: "client_name",
      cell: (payment) => <span className="font-medium text-gray-900 dark:text-white">{payment.client_name}</span>
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (payment) => <span className="font-bold text-gray-900 dark:text-white">₹{payment.amount.toLocaleString('en-IN')}</span>
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: (payment) => new Date(payment.due_date).toLocaleDateString()
    },
    {
      header: "Method",
      accessorKey: "method",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (payment) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          payment.status === "Paid" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
          payment.status === "Pending" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
          payment.status === "Overdue" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
          payment.status === "Cancelled" && "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
        )}>
          {payment.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      sortable: false,
      cell: () => (
        <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Download className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
          Payments & Revenue
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Track invoices, revenue growth, and outstanding payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Revenue This Month"
          value={`₹${stats.month.toLocaleString('en-IN')}`}
          trend="0%"
          trendUp={true}
          icon={DollarSign}
          iconColor="text-green-600 dark:text-green-400"
          iconBg="bg-green-50 dark:bg-green-500/10"
        />
        <KPICard
          title="Revenue This Quarter"
          value={`₹${stats.quarter.toLocaleString('en-IN')}`}
          trend="0%"
          trendUp={true}
          icon={ArrowUpRight}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-500/10"
        />
        <KPICard
          title="Outstanding Payments"
          value={`₹${stats.outstanding.toLocaleString('en-IN')}`}
          trend="0%"
          trendUp={false}
          icon={ArrowDownRight}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-500/10"
        />
        <KPICard
          title="Paid Invoices"
          value={stats.paidCount.toString()}
          trend="0%"
          trendUp={true}
          icon={CreditCard}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Growth</h2>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${value}`, "Revenue"]}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue by Service</h2>
          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={serviceRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" opacity={0.1} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} width={80} />
                <Tooltip
                  formatter={(value: any) => [`₹${value}`, "Revenue"]}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', borderRadius: '8px', color: '#f3f4f6' }}
                  itemStyle={{ color: '#818cf8' }}
                  cursor={{ fill: '#374151', opacity: 0.1 }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-8">Recent Invoices</h2>
        <DataTable
          data={payments}
          columns={columns}
          searchPlaceholder="Search invoices by client..."
        />
      </div>
    </div>
  );
}
