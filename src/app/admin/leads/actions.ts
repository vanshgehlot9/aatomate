"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendWhatsAppMessage } from "../inbox/actions";

export async function scheduleLeadDemo(leadId: string, date: string, time: string) {
  const supabase = await createClient();

  // 1. Get lead details
  const { data: lead, error: leadError } = await supabase.from("leads").select("*").eq("id", leadId).single();
  
  if (leadError || !lead) {
    console.error("Error fetching lead:", leadError);
    throw new Error("Failed to fetch lead details");
  }

  // 2. Insert into demo_bookings
  const { error: demoError } = await supabase.from("demo_bookings").insert({
    name: lead.name,
    email: lead.email,
    company: lead.company_name || "",
    booking_date: date,
    booking_time: time,
    status: "pending"
  });

  if (demoError) {
    console.error("Error creating demo booking:", demoError);
    throw new Error("Failed to schedule demo");
  }

  // 3. Update lead status
  const { error: updateError } = await supabase.from("leads").update({
    status: "Demo Scheduled"
  }).eq("id", leadId);

  if (updateError) {
    console.error("Error updating lead status:", updateError);
    throw new Error("Failed to update lead status");
  }

  // 4. Send automated WhatsApp message
  if (lead.phone) {
    try {
      const chatId = await getOrCreateWhatsAppChat(lead.id, lead.phone);
      const message = `Hi ${lead.name}, your demo with Aatomate is scheduled for ${date} at ${time}. Looking forward to it!`;
      await sendWhatsAppMessage(chatId, lead.phone.replace(/\D/g, ""), message);
    } catch (err) {
      console.error("Failed to send automated WhatsApp message:", err);
    }
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin/demos");
}

export async function getOrCreateWhatsAppChat(leadId: string, phone: string) {
  const supabase = await createClient();
  const formattedPhone = phone.replace(/\D/g, "");

  const { data: existingChat } = await supabase
    .from("whatsapp_chats")
    .select("id")
    .eq("phone_number", formattedPhone)
    .single();

  if (existingChat) {
    return existingChat.id;
  }

  const { data: newChat, error } = await supabase
    .from("whatsapp_chats")
    .insert({
      lead_id: leadId,
      phone_number: formattedPhone,
      status: "active"
    })
    .select("id")
    .single();

  if (error || !newChat) {
    console.error("Error creating WhatsApp chat:", error);
    throw new Error("Failed to create WhatsApp chat");
  }

  return newChat.id;
}
