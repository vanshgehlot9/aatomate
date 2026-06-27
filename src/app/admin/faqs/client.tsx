"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Database } from "@/lib/types/supabase";
import Link from "next/link";

type FAQ = Database['public']['Tables']['faqs']['Row']

export default function FAQsClient({ initialFAQs }: { initialFAQs: FAQ[] }) {
  const columns: Column<FAQ>[] = [
    {
      header: "Question",
      accessorKey: "question",
      cell: (faq) => (
        <span className="font-medium text-gray-900 dark:text-white leading-snug">{faq.question}</span>
      )
    },
    {
      header: "Answer",
      accessorKey: "answer",
      cell: (faq) => (
        <span className="text-gray-500 text-sm truncate max-w-[400px] block">{faq.answer}</span>
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
      cell: (faq) => (
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
            FAQs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your Frequently Asked Questions.
          </p>
        </div>
        <Link 
          href="/admin/faqs/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </Link>
      </div>

      <DataTable
        data={initialFAQs}
        columns={columns}
        searchPlaceholder="Search questions..."
      />
    </div>
  );
}
