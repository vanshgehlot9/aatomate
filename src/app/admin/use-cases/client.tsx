"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Database } from "@/lib/types/supabase";
import Link from "next/link";
import clsx from "clsx";

type UseCase = Database['public']['Tables']['use_cases']['Row']

export default function UseCasesClient({ initialUseCases }: { initialUseCases: UseCase[] }) {
  const columns: Column<UseCase>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (useCase) => (
        <span className="font-medium text-gray-900 dark:text-white">{useCase.title}</span>
      )
    },
    {
      header: "Status",
      accessorKey: "is_published",
      cell: (useCase) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          useCase.is_published 
            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
            : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
        )}>
          {useCase.is_published ? "Published" : "Draft"}
        </span>
      )
    },
    {
      header: "Order",
      accessorKey: "display_order",
    },
    {
      header: "Actions",
      accessorKey: "id",
      sortable: false,
      cell: (useCase) => (
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
            Use Cases
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your AI deployment use cases.
          </p>
        </div>
        <Link 
          href="/admin/use-cases/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Use Case
        </Link>
      </div>

      <DataTable
        data={initialUseCases}
        columns={columns}
        searchPlaceholder="Search use cases..."
      />
    </div>
  );
}
