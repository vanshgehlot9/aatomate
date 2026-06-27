"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Download, Filter } from "lucide-react";
import clsx from "clsx";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  searchPlaceholder = "Search...",
  actions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Very basic sorting and filtering for demo purposes
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    return Object.values(item).some((val) => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#111] transition-colors">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-[#1F1F1F]">
              {columns.map((col) => (
                <th
                  key={String(col.accessorKey)}
                  className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  <div
                    className={clsx(
                      "flex items-center gap-2",
                      col.sortable !== false && "cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 select-none"
                    )}
                    onClick={() => col.sortable !== false && handleSort(String(col.accessorKey))}
                  >
                    {col.header}
                    {col.sortable !== false && sortConfig?.key === String(col.accessorKey) && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={clsx(
                    "group transition-colors",
                    onRowClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#151515]" : ""
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.accessorKey)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {col.cell ? col.cell(row) : (row as any)[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#111] flex items-center justify-between transition-colors">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(sortedData.length, 10)}</span> of <span className="font-medium text-gray-900 dark:text-white">{sortedData.length}</span> results
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#1A1A1A] transition-colors" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#1A1A1A] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
