import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We must use a Service Role key here because webhooks don't have a user session
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // For production, you should use SERVICE_ROLE_KEY to bypass RLS, or ensure public inserts are allowed
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        const from = body.entry[0].changes[0].value.messages[0].from; // sender's phone number
        const msg_body = body.entry[0].changes[0].value.messages[0].text.body;
        const meta_message_id = body.entry[0].changes[0].value.messages[0].id;

        // Check if we are listening to the correct phone number ID
        if (phone_number_id === process.env.WHATSAPP_PHONE_NUMBER_ID) {
          
          // 1. Find the active chat for this phone number
          const { data: chat } = await supabase
            .from("whatsapp_chats")
            .select("id")
            .eq("phone_number", `+${from}`) // WhatsApp API usually sends without '+', our DB might have it
            .or(`phone_number.eq.${from}`)
            .eq("status", "active")
            .single();

          if (chat) {
            // 2. Save the incoming message
            await supabase
              .from("whatsapp_messages")
              .insert({
                chat_id: chat.id,
                sender_type: "user",
                content: msg_body,
                meta_message_id
              });
          } else {
            // If no active chat, we could create a new lead and chat here automatically!
            // But for now we just skip or log.
            console.log("Received message from unknown/inactive chat:", from);
          }
        }
      }
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
