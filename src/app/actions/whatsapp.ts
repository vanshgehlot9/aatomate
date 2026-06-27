"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitWhatsAppMessage(phone: string, message: string) {
  const supabase = await createClient();

  // Call the secure RPC function to handle the lead and chat creation bypassing RLS
  const { data: chatId, error } = await supabase
    .rpc('handle_incoming_whatsapp', {
      p_phone: phone,
      p_message: message
    });

  if (error) {
    console.error("RPC Error:", error);
    throw new Error("Failed to process message: " + error.message);
  }

  return { success: true, chatId };
}
