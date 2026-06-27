-- Run this script in your Supabase SQL Editor to ensure ALL tables have the correct columns!

-- Services
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Pricing Plans
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS monthly_price numeric;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS yearly_price numeric;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS setup_fee text;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS cta_text text;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS popular boolean DEFAULT false;
ALTER TABLE public.pricing_plans ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Pricing Features
ALTER TABLE public.pricing_features ADD COLUMN IF NOT EXISTS plan_id uuid REFERENCES public.pricing_plans(id);
ALTER TABLE public.pricing_features ADD COLUMN IF NOT EXISTS feature_text text;
ALTER TABLE public.pricing_features ADD COLUMN IF NOT EXISTS is_included boolean DEFAULT true;
ALTER TABLE public.pricing_features ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Use Cases
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS bg_color text;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS visual_color text;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;
ALTER TABLE public.use_cases ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Testimonials
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS author_name text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS author_title text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS rating integer DEFAULT 5;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- FAQs
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS question text;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS answer text;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS service_interested text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes text;

-- Demo Bookings
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS booking_date date;
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS booking_time time;
ALTER TABLE public.demo_bookings ADD COLUMN IF NOT EXISTS status text DEFAULT 'scheduled';

-- Clients
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS contact text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS service text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS plan text;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS mrr numeric;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS contract_date date;

-- Payments
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS client_name text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS amount numeric;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payment_date date;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS method text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- Case Studies
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS problem text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS solution text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS results jsonb;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS featured_image text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';

-- Make sure RLS is enabled and public inserts are allowed for Leads and Demo Bookings (since they come from public forms)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable public inserts" ON public.leads;
CREATE POLICY "Enable public inserts" ON public.leads FOR INSERT WITH CHECK (true);

ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable public inserts" ON public.demo_bookings;
CREATE POLICY "Enable public inserts" ON public.demo_bookings FOR INSERT WITH CHECK (true);
