import { db } from "@/lib/firebase-admin";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, Building2, Briefcase, Calendar, MessageCircle, Bot } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LeadDetail({ params }: { params: { id: string } }) {
  let lead: any = null;
  let chats: any[] = [];

  try {
    const leadDoc = await db.collection("leads").doc(params.id).get();
    if (!leadDoc.exists) {
      return notFound();
    }
    
    lead = { id: leadDoc.id, ...leadDoc.data() };
    
    // Fetch chat sub-collection
    const chatsSnapshot = await db.collection("leads").doc(params.id).collection("chats").orderBy("timestamp", "asc").get();
    chatsSnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp?.toDate() || new Date() });
    });
  } catch (error) {
    console.error("Error fetching lead detail:", error);
  }

  if (!lead) return notFound();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      
      {/* Top Nav */}
      <div className="flex items-center gap-4">
        <Link href="/admin/leads" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
            {lead.name || lead.phone_number}
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              lead.score === 'Hot' ? 'bg-red-100 text-red-700' :
              lead.score === 'Warm' ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {lead.score || "Cold"}
            </span>
          </h1>
          <p className="text-gray-500 text-[14px] mt-0.5 font-medium">Lead captured via WhatsApp AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Lead Info & AI Summary */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* AI Summary Card */}
          <div className="bg-gradient-to-br from-midnight-ink to-[#1a1a1a] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbff00]/10 rounded-full blur-[40px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Bot className="w-5 h-5 text-[#fbff00]" />
              <h3 className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#fbff00]">AI Qualification Summary</h3>
            </div>
            
            <p className="text-[15px] leading-relaxed font-medium text-white/90 relative z-10">
              {lead.ai_summary || "The AI is currently gathering information. A summary will be generated once the conversation reaches a terminal state."}
            </p>
          </div>

          {/* CRM Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-[15px]">Contact Information</h3>
              <button className="text-[13px] font-bold text-blue-600 hover:underline">Edit</button>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</div>
                  <div className="text-[15px] font-medium text-gray-900">{lead.name || "—"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</div>
                  <div className="text-[15px] font-medium text-gray-900">{lead.phone_number || "—"}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</div>
                  <div className="text-[15px] font-medium text-gray-900">{lead.email || "—"}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Company & Industry</div>
                  <div className="text-[15px] font-medium text-gray-900">
                    {lead.company || "—"} {lead.industry ? `(${lead.industry})` : ""}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Service Interest</div>
                  <div className="text-[15px] font-medium text-gray-900">{lead.service_interested_in || "—"}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Col: WhatsApp Chat Log */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[800px]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50 rounded-t-2xl">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[15px]">WhatsApp Transcript</h3>
                <p className="text-[13px] font-medium text-gray-500">Live conversation log</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#E5E5E5]/30 space-y-4">
              {chats.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium text-[15px]">No messages yet.</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                      chat.role === 'user' 
                        ? 'bg-[#DCF8C6] text-[#075E54] rounded-tr-sm' 
                        : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                    }`}>
                      <div className="text-[15px] whitespace-pre-wrap">{chat.content}</div>
                      <div className={`text-[11px] font-medium mt-1.5 text-right ${
                        chat.role === 'user' ? 'text-[#075E54]/70' : 'text-gray-400'
                      }`}>
                        {format(chat.timestamp, "HH:mm a")}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Simulated Reply Box */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  disabled
                  placeholder="AI is handling this conversation... (Manual override disabled in demo)" 
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none cursor-not-allowed opacity-70"
                />
                <button disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded-xl text-[14px] font-bold cursor-not-allowed">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
