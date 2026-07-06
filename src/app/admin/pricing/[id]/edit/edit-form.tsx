"use client";

import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { updatePricingPlan } from "../../actions";
import { Database } from "@/lib/types/supabase";

type Plan = Database["public"]["Tables"]["pricing_plans"]["Row"];
type Feature = Database["public"]["Tables"]["pricing_features"]["Row"];

export default function EditForm({ plan, features }: { plan: Plan; features: Feature[] }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await updatePricingPlan(plan.id, formData);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const featuresText = features.map(f => f.feature_text).join("\n");

  return (
    <form action={handleSubmit} className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-gray-50/80 dark:bg-[#050505]/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/pricing" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A1A1A]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Pricing Plan</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update subscription tier details</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-70">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-[#1F1F1F] shadow-sm p-6 md:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Plan Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={plan.plan_name}
            placeholder="e.g. Starter, Growth, Enterprise"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Tagline)</label>
          <input
            type="text"
            name="description"
            defaultValue={plan.description || ""}
            placeholder="e.g. Perfect for businesses looking to scale."
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Price (₹)</label>
            <input
              type="number"
              name="monthly_price"
              defaultValue={plan.monthly_price || ""}
              placeholder="Leave blank for Custom pricing"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Setup Fee</label>
            <input
              type="text"
              name="setup_fee"
              defaultValue={plan.setup_fee || ""}
              placeholder="e.g. ₹50k one-time"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CTA Text</label>
            <input
              type="text"
              name="cta_text"
              placeholder="e.g. Get Started, Book Demo"
              defaultValue={plan.cta_text || "Get Started"}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 w-1/2 pt-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
          <input
            type="number"
            name="display_order"
            defaultValue={plan.display_order ?? 0}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="popular"
              id="popular"
              defaultChecked={plan.popular || false}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="popular" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mark as Popular Plan
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Badge Text (if popular)</label>
            <input
              type="text"
              name="badge_text"
              placeholder="e.g. MOST POPULAR"
              defaultValue={plan.badge_text || "MOST POPULAR"}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-[#1F1F1F]">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Features List (One feature per line)</label>
          <textarea
            name="features"
            rows={5}
            defaultValue={featuresText}
            placeholder="e.g.&#10;5 User Accounts&#10;100GB Storage&#10;Priority Support"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-y"
          />
        </div>

      </div>
    </form>
  );
}
