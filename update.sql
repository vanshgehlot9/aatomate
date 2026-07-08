-- 1. Add missing columns for WhatsApp Bot
ALTER TABLE public.whatsapp_chats ADD COLUMN IF NOT EXISTS bot_state JSONB DEFAULT '{}'::jsonb;

ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS business_size TEXT,
ADD COLUMN IF NOT EXISTS budget TEXT,
ADD COLUMN IF NOT EXISTS timeline TEXT,
ADD COLUMN IF NOT EXISTS requirements TEXT,
ADD COLUMN IF NOT EXISTS priority TEXT,
ADD COLUMN IF NOT EXISTS lead_score TEXT,
ADD COLUMN IF NOT EXISTS assigned_sales_executive TEXT,
ADD COLUMN IF NOT EXISTS source TEXT,
ADD COLUMN IF NOT EXISTS ai_summary TEXT;

-- 2. Fix Row-Level Security for the Backend API
-- The backend uses the 'anon' key in .env, so it needs permissions to select/insert/update chats and leads.
CREATE POLICY "Enable all for anon users" ON public.whatsapp_chats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for anon users" ON public.whatsapp_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable select for anon users" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Enable update for anon users" ON public.leads FOR UPDATE USING (true);
