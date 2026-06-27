"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendWhatsAppMessage(chatId: string, phone_number: string, content: string) {
  const supabase = await createClient();

  // 1. Call Meta WhatsApp API
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error("WhatsApp credentials not configured.");
  }

  const res = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone_number.replace("+", ""), // ensure no plus sign
      type: "text",
      text: {
        preview_url: false,
        body: content
      }
    })
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Meta API Error:", data);
    throw new Error(data.error?.message || "Failed to send message via WhatsApp");
  }

  // 2. Save message to our DB
  const { error } = await supabase
    .from("whatsapp_messages")
    .insert({
      chat_id: chatId,
      sender_type: "admin",
      content,
      meta_message_id: data.messages?.[0]?.id
    });

  if (error) {
    throw new Error("Failed to save message to database: " + error.message);
  }

  revalidatePath("/admin/inbox");
  return { success: true };
}
