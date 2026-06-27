"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Database } from "@/lib/types/supabase";

type CaseStudy = Database['public']['Tables']['case_studies']['Row']

export default function CaseStudiesClient({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const columns: Column<CaseStudy>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (study) => <span className="font-medium text-gray-900 dark:text-white">{study.title}</span>
    },
    {
      header: "Industry",
      accessorKey: "industry",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (study) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          study.status === "Published" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
          study.status === "Draft" && "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20",
          study.status === "Scheduled" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
        )}>
          {study.status}
        </span>
      ),
    },
    {
      header: "Added",
      accessorKey: "created_at",
      cell: (study) => new Date(study.created_at).toLocaleDateString()
    },
    {
      header: "Actions",
      accessorKey: "id",
      sortable: false,
      cell: (study) => (
        <div className="flex items-center gap-3">
          <Link href={`/case-studies/${study.slug}`} target="_blank" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
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
            Case Studies
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your success stories and use cases.
          </p>
        </div>
        <Link 
          href="/admin/case-studies/create" 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Case Study
        </Link>
      </div>

      <DataTable
        data={initialCaseStudies}
        columns={columns}
        searchPlaceholder="Search case studies by title or industry..."
      />
    </div>
  );
}
