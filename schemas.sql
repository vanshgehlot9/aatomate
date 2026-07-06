-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_interested TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: demo_bookings
CREATE TABLE IF NOT EXISTS public.demo_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: clients
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    contact TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    plan TEXT NOT NULL,
    mrr NUMERIC NOT NULL DEFAULT 0,
    contract_date TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: payments
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    payment_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: case_studies
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    industry TEXT,
    problem TEXT,
    solution TEXT,
    results JSONB,
    featured_image TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: pricing_plans
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_name TEXT NOT NULL,
    description TEXT,
    badge_text TEXT,
    monthly_price NUMERIC,
    yearly_price NUMERIC,
    setup_fee TEXT,
    cta_text TEXT,
    popular BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: pricing_features
CREATE TABLE IF NOT EXISTS public.pricing_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES public.pricing_plans(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    is_included BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: services
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: use_cases
CREATE TABLE IF NOT EXISTS public.use_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    bg_color TEXT,
    visual_color TEXT,
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    author_title TEXT,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: faqs
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: whatsapp_chats
CREATE TABLE IF NOT EXISTS public.whatsapp_chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    phone_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: whatsapp_messages
CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES public.whatsapp_chats(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL,
    content TEXT NOT NULL,
    meta_message_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (Row Level Security) for all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Setup baseline policies

-- 1. Full access for authenticated users (Admin Panel)
CREATE POLICY "Enable all for authenticated users" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.demo_bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.payments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.pricing_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.use_cases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.whatsapp_chats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all for authenticated users" ON public.whatsapp_messages FOR ALL USING (auth.role() = 'authenticated');

-- 2. Public Read Access for website content
CREATE POLICY "Enable select for anon users" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.pricing_features FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.use_cases FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Enable select for anon users" ON public.faqs FOR SELECT USING (true);

-- 3. Public Insert Access for forms
CREATE POLICY "Enable insert for anon users" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for anon users" ON public.demo_bookings FOR INSERT WITH CHECK (true);

-- Table: payments
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razorpay_order_id TEXT NOT NULL UNIQUE,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    plan_id UUID REFERENCES public.pricing_plans(id),
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'created',
    receipt TEXT,
    hospital_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON public.payments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for anon users" ON public.payments FOR INSERT WITH CHECK (true);
