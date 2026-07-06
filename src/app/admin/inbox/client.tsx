"use client";

import { useState, useEffect, Suspense } from "react";
import { Send, Loader2, Phone } from "lucide-react";
import { sendWhatsAppMessage } from "./actions";
import { useSearchParams, useRouter } from "next/navigation";

function InboxContent({ initialChats }: { initialChats: any[] }) {
  const searchParams = useSearchParams();
  const queryChatId = searchParams.get("chatId");
  const router = useRouter();

  const [activeChatId, setActiveChatId] = useState<string | null>(
    queryChatId || (initialChats.length > 0 ? initialChats[0].id : null)
  );

  useEffect(() => {
    if (queryChatId) {
      setActiveChatId(queryChatId);
      // clean up URL so refreshing doesn't stick to it
      router.replace('/admin/inbox');
    }
  }, [queryChatId, router]);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const activeChat = initialChats.find(c => c.id === activeChatId);
  const messages = activeChat?.whatsapp_messages?.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) || [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeChat) return;

    setIsSending(true);
    try {
      await sendWhatsAppMessage(activeChat.id, activeChat.phone_number, replyMessage);
      setReplyMessage("");
    } catch (err: any) {
      alert("Error sending message: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-[#1F1F1F] overflow-hidden shadow-sm">
      
      {/* Sidebar: Chat List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-[#1F1F1F] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#111]">
          <h2 className="font-semibold">WhatsApp Inbox</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {initialChats.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No chats found.</div>
          ) : (
            initialChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full text-left p-4 border-b border-gray-100 dark:border-[#1A1A1A] transition-colors ${
                  activeChatId === chat.id ? 'bg-gray-100 dark:bg-[#1A1A1A]' : 'hover:bg-gray-50 dark:hover:bg-[#111]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#25D366]" />
                    {chat.phone_number}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(chat.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {chat.whatsapp_messages?.[chat.whatsapp_messages.length - 1]?.content || "No messages yet"}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative">
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        {activeChat ? (
          <>
            <div className="bg-white/90 p-4 border-b border-gray-200 z-10">
              <h3 className="font-semibold flex items-center gap-2">
                {activeChat.phone_number}
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 flex flex-col">
              {messages.map((msg: any) => {
                const isUser = msg.sender_type === "user";
                return (
                  <div key={msg.id} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${
                      isUser 
                        ? "bg-white text-gray-900 rounded-tl-none" 
                        : "bg-[#d9fdd3] text-gray-900 rounded-tr-none"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-[#f0f2f5] p-4 z-10">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25D366] text-black"
                />
                <button 
                  type="submit"
                  disabled={isSending || !replyMessage.trim()}
                  className="bg-[#25D366] text-white p-3 rounded-xl hover:bg-[#20bd5a] transition-colors disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 z-10">
            Select a chat to view messages
          </div>
        )}
      </div>
    </div>
  );
}

export default function InboxClient({ initialChats }: { initialChats: any[] }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading inbox...</div>}>
      <InboxContent initialChats={initialChats} />
    </Suspense>
  );
}
