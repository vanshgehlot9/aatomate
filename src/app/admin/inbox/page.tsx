import { createClient } from "@/lib/supabase/server";
import InboxClient from "./client";

export default async function InboxPage() {
  const supabase = await createClient();

  const { data: chats, error } = await supabase
    .from("whatsapp_chats")
    .select(`
      id,
      phone_number,
      status,
      created_at,
      whatsapp_messages(id, sender_type, content, created_at)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching chats:", error);
  }

  return <InboxClient initialChats={chats || []} />;
}
