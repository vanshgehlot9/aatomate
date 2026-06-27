-- Run this script in your Supabase SQL Editor to fix Row Level Security (RLS) policies!

-- 1. Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON public.services;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.services;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.services;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.services;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.services;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.pricing_plans;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.pricing_plans;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.use_cases;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.use_cases;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.testimonials;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.testimonials;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.faqs;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.faqs;

-- 3. Create new Policies for Services
CREATE POLICY "Enable read access for all users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Create new Policies for Pricing Plans
CREATE POLICY "Enable read access for all users" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users" ON public.pricing_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Create new Policies for Use Cases
CREATE POLICY "Enable read access for all users" ON public.use_cases FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users" ON public.use_cases FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Create new Policies for Testimonials
CREATE POLICY "Enable read access for all users" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Create new Policies for FAQs
CREATE POLICY "Enable read access for all users" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Enable full access for authenticated users" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
