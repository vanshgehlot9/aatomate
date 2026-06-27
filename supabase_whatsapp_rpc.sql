-- Run this in your Supabase SQL Editor to create a secure function for handling incoming WhatsApp messages

CREATE OR REPLACE FUNCTION handle_incoming_whatsapp(p_phone text, p_message text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS securely on the server
AS $$
DECLARE
    v_lead_id uuid;
    v_chat_id uuid;
BEGIN
    -- 1. Find or create lead
    SELECT id INTO v_lead_id FROM leads WHERE phone = p_phone LIMIT 1;
    IF v_lead_id IS NULL THEN
        INSERT INTO leads (name, phone, email, service_interested, status)
        VALUES ('WhatsApp Lead', p_phone, p_phone || '@whatsapp.local', 'WhatsApp Chat', 'new')
        RETURNING id INTO v_lead_id;
    END IF;

    -- 2. Find or create active chat
    SELECT id INTO v_chat_id FROM whatsapp_chats WHERE phone_number = p_phone AND status = 'active' LIMIT 1;
    IF v_chat_id IS NULL THEN
        INSERT INTO whatsapp_chats (lead_id, phone_number, status)
        VALUES (v_lead_id, p_phone, 'active')
        RETURNING id INTO v_chat_id;
    END IF;

    -- 3. Insert message
    INSERT INTO whatsapp_messages (chat_id, sender_type, content)
    VALUES (v_chat_id, 'user', p_message);

    RETURN v_chat_id;
END;
$$;
