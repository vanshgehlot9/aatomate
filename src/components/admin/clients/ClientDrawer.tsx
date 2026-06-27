"use client";

import { X, Mail, Phone, Building, Calendar, FileText, Download, Briefcase, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ClientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export default function ClientDrawer({ isOpen, onClose, client }: ClientDrawerProps) {
  if (!client) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0A0A0A] border-l border-gray-200 dark:border-[#1F1F1F] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#1F1F1F]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Client Details</h2>
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
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] flex items-center justify-center font-bold text-2xl text-gray-900 dark:text-white flex-shrink-0">
                  {client.company.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{client.company}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Contact: {client.contact}</p>
                </div>
              </div>

              {/* Status & Revenue */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Plan</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
                    {client.plan}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> MRR</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">₹{client.mrr?.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${client.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{client.service}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Contract Date: {new Date(client.contract_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Documents</h4>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Upload
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Signed_Contract.pdf</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1F1F1F] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Onboarding_Brief.docx</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
