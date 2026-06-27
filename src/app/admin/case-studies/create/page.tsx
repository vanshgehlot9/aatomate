"use client";

import { useState } from "react";
import { ArrowLeft, Save, Eye, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { createCaseStudy } from "../actions";

export default function CreateCaseStudyPage() {
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await createCaseStudy(formData);
    // On success it redirects, on error we might want to handle it
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-gray-50/80 dark:bg-[#050505]/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/case-studies" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A1A1A]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">New Case Study</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unsaved changes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-70">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-[#1F1F1F]">
        {[
          { id: "content", label: "Content" },
          { id: "seo", label: "SEO & Meta" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={clsx(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm p-6 md:p-8">
        
        <div className={activeTab === "content" ? "block space-y-8" : "hidden"}>
          <div>
            <input
              type="text"
              name="title"
              required
              placeholder="Case Study Title"
              className="w-full text-4xl font-display font-bold bg-transparent border-none placeholder-gray-300 dark:placeholder-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-0 p-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry</label>
              <select name="industry" className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors">
                <option value="">Select Industry...</option>
                <option value="SaaS">SaaS</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>
            {/* Kept out for now as Category isn't in DB Schema natively without a tag array. */}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-[#2A2A2A] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#151515] transition-colors relative group">
              <input type="file" name="featuredImage" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform pointer-events-none">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white pointer-events-none">Click or drag image to upload</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#1F1F1F] pb-2">The Challenge</h3>
            <textarea
              name="problem"
              rows={4}
              placeholder="Describe the problem the client was facing..."
              className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#1F1F1F] pb-2">The Solution</h3>
            <textarea
              name="solution"
              rows={4}
              placeholder="Describe how Aatomate solved the problem..."
              className="w-full p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#1F1F1F] pb-2">The Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg space-y-3">
                  <input type="text" name="metricName" placeholder="Metric Name (e.g., Conversion)" className="w-full bg-transparent border-b border-gray-300 dark:border-[#333] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 pb-1" />
                  <input type="text" name="metricValue" placeholder="Value (e.g., +45%)" className="w-full bg-transparent border-b border-gray-300 dark:border-[#333] text-lg font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 pb-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={activeTab === "seo" ? "block space-y-6" : "hidden"}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL Slug</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A] text-gray-500 dark:text-gray-400 text-sm">
                aatomate.com/case-studies/
              </span>
              <input
                type="text"
                name="slug"
                required
                placeholder="techflow-ai-support"
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-r-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className={activeTab === "settings" ? "block space-y-6" : "hidden"}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Publish Status</label>
            <select name="status" className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        </div>

      </div>
    </form>
  );
}
