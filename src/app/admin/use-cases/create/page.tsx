"use client";

import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createUseCase } from "../actions";

export default function CreateUseCasePage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createUseCase(formData);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-gray-50/80 dark:bg-[#050505]/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/use-cases" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A1A1A]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">New Use Case</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add a new industry application</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-70">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Use Case
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm p-6 md:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Real Estate Follow-ups"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL Slug</label>
          <input
            type="text"
            name="slug"
            required
            placeholder="e.g. real-estate"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Describe how the automation is used in this industry..."
            className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Background Color</label>
            <input
              type="text"
              name="bg_color"
              placeholder="e.g. bg-blue-50"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Visual Component Color</label>
            <input
              type="text"
              name="visual_color"
              placeholder="e.g. text-blue-600 bg-blue-100"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
          <input
            type="number"
            name="display_order"
            defaultValue="0"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

      </div>
    </form>
  );
}
