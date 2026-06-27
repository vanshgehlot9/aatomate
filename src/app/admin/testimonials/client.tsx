"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import clsx from "clsx";
import { Database } from "@/lib/types/supabase";
import Image from "next/image";
import Link from "next/link";

type Testimonial = Database['public']['Tables']['testimonials']['Row']

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const columns: Column<Testimonial>[] = [
    {
      header: "Author",
      accessorKey: "author_name",
      cell: (testimonial) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 dark:bg-[#1A1A1A] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            {testimonial.avatar_url ? (
              <Image src={testimonial.avatar_url} alt={testimonial.author_name} width={32} height={32} className="object-cover" />
            ) : (
              <span className="text-xs text-gray-500">{testimonial.author_name.charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white leading-tight">{testimonial.author_name}</span>
            <span className="text-xs text-gray-500 truncate max-w-[200px]">{testimonial.author_title} {testimonial.company ? `at ${testimonial.company}` : ''}</span>
          </div>
        </div>
      )
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (testimonial) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{testimonial.rating}</span>
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        </div>
      )
    },
    {
      header: "Featured",
      accessorKey: "is_featured",
      cell: (testimonial) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          testimonial.is_featured 
            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
            : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
        )}>
          {testimonial.is_featured ? "Featured" : "Standard"}
        </span>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      sortable: false,
      cell: (testimonial) => (
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
            Testimonials
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage client reviews and homepage features.
          </p>
        </div>
        <Link 
          href="/admin/testimonials/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      <DataTable
        data={initialTestimonials}
        columns={columns}
        searchPlaceholder="Search author or company..."
      />
    </div>
  );
}
