"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import ClientDrawer from "@/components/admin/clients/ClientDrawer";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { Database } from "@/lib/types/supabase";

type Client = Database['public']['Tables']['clients']['Row']

export default function ClientsClient({ initialClients }: { initialClients: Client[] }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const columns: Column<Client>[] = [
    {
      header: "Company",
      accessorKey: "company",
      cell: (client) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            {client.company.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{client.company}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{client.contact}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Service & Plan",
      accessorKey: "service",
      cell: (client) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">{client.service}</div>
          <span className={clsx(
            "inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium border",
            client.plan === "Enterprise" && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
            client.plan === "Pro" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
            client.plan === "Starter" && "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
          )}>
            {client.plan}
          </span>
        </div>
      ),
    },
    {
      header: "MRR",
      accessorKey: "mrr",
      cell: (client) => <span className="font-bold text-gray-900 dark:text-white">₹{client.mrr.toLocaleString('en-IN')}</span>
    },
    {
      header: "Contract Date",
      accessorKey: "contract_date",
      cell: (client) => new Date(client.contract_date).toLocaleDateString()
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Client Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your active clients, contracts, and monthly recurring revenue.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <DataTable
        data={initialClients}
        columns={columns}
        onRowClick={(client) => setSelectedClient(client)}
        searchPlaceholder="Search clients by company or contact name..."
      />

      <ClientDrawer
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
      />
    </div>
  );
}
