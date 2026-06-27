"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import LeadDrawer from "@/components/admin/leads/LeadDrawer";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { Database } from "@/lib/types/supabase";

type Lead = Database['public']['Tables']['leads']['Row']

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const columns: Column<Lead>[] = [
    {
      header: "Lead",
      accessorKey: "name",
      cell: (lead) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
            {lead.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{lead.company_name}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      cell: (lead) => (
        <div className="text-sm">
          <div className="text-gray-900 dark:text-gray-200">{lead.email}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">{lead.phone}</div>
        </div>
      ),
    },
    {
      header: "Source",
      accessorKey: "service_interested", // Just mapping service_interested here or add source to DB
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (lead) => (
        <span className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          lead.status === 'New' && "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400",
          lead.status === 'Contacted' && "bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400",
          lead.status === 'Demo Scheduled' && "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-400",
          lead.status === 'Proposal Sent' && "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400",
          lead.status === 'Won' && "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400",
          lead.status === 'Lost' && "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400"
        )}>
          {lead.status}
        </span>
      ),
    },
    {
      header: "Date Added",
      accessorKey: "created_at",
      cell: (lead) => new Date(lead.created_at).toLocaleDateString()
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Lead Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Track and manage all your incoming leads across different channels.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <DataTable
        data={initialLeads}
        columns={columns}
        onRowClick={(lead) => setSelectedLead(lead)}
        searchPlaceholder="Search leads by name, email, or company..."
      />

      <LeadDrawer
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
}
