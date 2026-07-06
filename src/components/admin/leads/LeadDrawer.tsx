"use client";

import { X, Mail, Phone, Building, Calendar, Edit3, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useState, useTransition, useEffect } from "react";
import { scheduleLeadDemo, getOrCreateWhatsAppChat } from "@/app/admin/leads/actions";
import { useRouter } from "next/navigation";

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}

export default function LeadDrawer({ isOpen, onClose, lead }: LeadDrawerProps) {
  const router = useRouter();
  const [isScheduling, setIsScheduling] = useState(false);
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) {
      setIsScheduling(false);
      setDemoDate("");
      setDemoTime("");
    }
  }, [isOpen]);

  const handleWhatsAppMessage = () => {
    if (!lead.phone) {
      alert("No phone number provided for this lead.");
      return;
    }

    startTransition(async () => {
      try {
        const chatId = await getOrCreateWhatsAppChat(lead.id, lead.phone);
        router.push(`/admin/inbox?chatId=${chatId}`);
        onClose();
      } catch (error) {
        console.error(error);
        alert("Failed to prepare WhatsApp chat.");
      }
    });
  };

  const handleScheduleConfirm = () => {
    if (!demoDate || !demoTime) {
      alert("Please select both date and time");
      return;
    }
    startTransition(async () => {
      try {
        await scheduleLeadDemo(lead.id, demoDate, demoTime);
        alert("Demo scheduled successfully!");
        onClose();
      } catch (error) {
        console.error(error);
        alert("Failed to schedule demo");
      }
    });
  };

  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0A0A0A] border-l border-gray-200 dark:border-[#1F1F1F] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#1F1F1F]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Lead Details</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold flex-shrink-0">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lead.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{lead.company_name}</p>
                </div>
              </div>

              {/* Status & Source */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
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
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Added On</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(lead.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${lead.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{lead.company_name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Added on {new Date(lead.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Interested Service */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Interested Service</h4>
                <div className="p-3 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-100 dark:border-[#1F1F1F] text-sm text-gray-700 dark:text-gray-300">
                  {lead.service_interested || 'Not specified'}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Notes</h4>
                  <button className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="p-4 bg-yellow-50/50 dark:bg-yellow-500/5 rounded-xl border border-yellow-100 dark:border-yellow-500/10 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                  {lead.notes || "No notes added yet."}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#0A0A0A]">
              {isScheduling ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Schedule Demo</h4>
                  <div className="flex gap-3">
                    <input 
                      type="date" 
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input 
                      type="time" 
                      value={demoTime}
                      onChange={(e) => setDemoTime(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setIsScheduling(false)}
                      disabled={isPending}
                      className="flex-1 px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleScheduleConfirm}
                      disabled={isPending}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isPending ? "Scheduling..." : "Confirm Demo"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={handleWhatsAppMessage}
                    className="flex-1 px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => setIsScheduling(true)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
                  >
                    Schedule Demo
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
