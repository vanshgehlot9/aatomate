"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Database } from "@/lib/types/supabase";
import Link from "next/link";

type Service = Database['public']['Tables']['services']['Row']

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const columns: Column<Service>[] = [
    {
      header: "Service Title",
      accessorKey: "title",
      cell: (service) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            {/* If there's an icon string we just display its name for now */}
            <span className="text-xs text-gray-500">{service.icon_name?.substring(0, 2) || "S"}</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{service.title}</span>
        </div>
      )
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (service) => <span className="text-gray-500 truncate max-w-[300px] block">{service.description}</span>
    },
    {
      header: "Order",
      accessorKey: "display_order",
    },
    {
      header: "Actions",
      accessorKey: "id",
      sortable: false,
      cell: (service) => (
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Services
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your service offerings and homepage display.
          </p>
        </div>
        <Link 
          href="/admin/services/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Service
        </Link>
      </div>

      <DataTable
        data={initialServices}
        columns={columns}
        searchPlaceholder="Search services..."
      />
    </div>
  );
}
