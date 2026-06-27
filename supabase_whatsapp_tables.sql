-- WhatsApp Omnichannel Tables

CREATE TABLE IF NOT EXISTS public.whatsapp_chats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    phone_number text NOT NULL,
    status text DEFAULT 'active',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_id uuid REFERENCES public.whatsapp_chats(id) ON DELETE CASCADE,
    sender_type text NOT NULL CHECK (sender_type IN ('user', 'admin')),
    content text NOT NULL,
    meta_message_id text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.whatsapp_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow safe re-runs)
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.whatsapp_chats;
DROP POLICY IF EXISTS "Enable public inserts" ON public.whatsapp_chats;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.whatsapp_messages;
DROP POLICY IF EXISTS "Enable public inserts" ON public.whatsapp_messages;

-- RLS Policies for whatsapp_chats
CREATE POLICY "Enable full access for authenticated users" ON public.whatsapp_chats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable public inserts" ON public.whatsapp_chats FOR INSERT WITH CHECK (true);

-- RLS Policies for whatsapp_messages
CREATE POLICY "Enable full access for authenticated users" ON public.whatsapp_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable public inserts" ON public.whatsapp_messages FOR INSERT WITH CHECK (true);
