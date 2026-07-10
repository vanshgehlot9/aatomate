-- Clean up existing case studies if any
DELETE FROM public.case_studies;

INSERT INTO public.case_studies (title, slug, industry, problem, solution, results, featured_image, status)
VALUES
(
    'Automating Patient Bookings for a Leading Clinic',
    'healthcare-patient-bookings',
    'Healthcare Company',
    'The clinic was overwhelmed with manual appointment scheduling via phone calls and emails, leading to a 40% missed call rate and overwhelmed reception staff.',
    'Deployed a HIPAA-compliant WhatsApp AI agent that handles patient booking requests, answers FAQs, and synchronizes directly with their internal CRM 24/7.',
    '["Reduced manual administrative work by 72%", "Saved ₹8 lakh annually in operational costs", "Processing time reduced from 3 days to 2 hours"]'::jsonb,
    '/images/case-study-healthcare.png',
    'Published'
),
(
    'Streamlining Supply Chain Reporting',
    'manufacturing-supply-chain',
    'Manufacturing Company',
    'Generating daily inventory and supply chain reports required pulling data from three legacy systems, taking a dedicated team over 15 hours a week.',
    'Implemented an automated agentic workflow that extracts data from legacy systems overnight, synthesizes it, and sends a daily actionable PDF report via email.',
    '["Saved 60+ hours of manual data entry per month", "Achieved 100% reporting accuracy", "Enabled real-time decision making for procurement"]'::jsonb,
    '/images/case-study-manufacturing.png',
    'Published'
),
(
    'Accelerating Candidate Screening',
    'recruitment-candidate-screening',
    'Recruitment Agency',
    'Recruiters spent 70% of their time manually reviewing resumes and conducting initial phone screens for hundreds of unqualified applicants.',
    'Built an AI-powered voice agent that calls applicants immediately upon submission, asks 5 qualifying questions, and scores their intent and fit automatically.',
    '["Qualified 4,000+ leads automatically in month one", "Reduced time-to-hire by 12 days", "Increased recruiter placement rate by 45%"]'::jsonb,
    '/images/case-study-recruitment.png',
    'Published'
),
(
    'Scaling 24/7 Customer Support',
    'retail-customer-support',
    'Retail Business',
    'The brand experienced a massive spike in support tickets regarding order tracking during the holiday season, resulting in response times over 48 hours.',
    'Integrated a smart chatbot across their website and Instagram that resolves tracking queries instantly and escalates complex issues with full context.',
    '["Resolved 85% of tier-1 support queries instantly", "Cut response times from 48 hours to 2 seconds", "Saved ₹12 lakh during peak holiday season"]'::jsonb,
    '/images/case-study-retail.png',
    'Published'
);
