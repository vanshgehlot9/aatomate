"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Database } from "@/lib/types/supabase";

type PricingPlan = Database['public']['Tables']['pricing_plans']['Row'] & {
  features: Database['public']['Tables']['pricing_features']['Row'][]
}

export default function PricingClient({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const columns: Column<PricingPlan>[] = [
    {
      header: "Plan Name",
      accessorKey: "name",
      cell: (plan) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span>
          {plan.popular && (
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">
              POPULAR
            </span>
          )}
        </div>
      )
    },
    {
      header: "Monthly",
      accessorKey: "monthly_price",
      cell: (plan) => plan.monthly_price ? `₹${plan.monthly_price.toLocaleString('en-IN')}` : "Custom"
    },
    {
      header: "Yearly",
      accessorKey: "yearly_price",
      cell: (plan) => plan.yearly_price ? `₹${plan.yearly_price.toLocaleString('en-IN')}` : "Custom"
    },
    {
      header: "Features",
      accessorKey: "features",
      cell: (plan) => <span className="text-gray-500">{plan.features.length} features</span>
    },
    {
      header: "Actions",
      accessorKey: "actions",
      sortable: false,
      cell: (plan) => (
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
            Pricing Plans
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage subscription tiers and included features.
          </p>
        </div>
        <Link 
          href="/admin/pricing/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Plan
        </Link>
      </div>

      <DataTable
        data={initialPlans}
        columns={columns}
        searchPlaceholder="Search plans..."
      />
    </div>
  );
}
