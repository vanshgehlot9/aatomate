import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const caseStudies = [
  {
    title: 'Automating Patient Bookings for a Leading Clinic',
    slug: 'healthcare-patient-bookings',
    industry: 'Healthcare Company',
    problem: 'The clinic was overwhelmed with manual appointment scheduling via phone calls and emails, leading to a 40% missed call rate and overwhelmed reception staff.',
    solution: 'Deployed a HIPAA-compliant WhatsApp AI agent that handles patient booking requests, answers FAQs, and synchronizes directly with their internal CRM 24/7.',
    results: [
      "Reduced manual administrative work by 72%",
      "Saved ₹8 lakh annually in operational costs",
      "Processing time reduced from 3 days to 2 hours"
    ],
    featured_image: '/images/case-study-healthcare.png',
    status: 'Published'
  },
  {
    title: 'Streamlining Supply Chain Reporting',
    slug: 'manufacturing-supply-chain',
    industry: 'Manufacturing Company',
    problem: 'Generating daily inventory and supply chain reports required pulling data from three legacy systems, taking a dedicated team over 15 hours a week.',
    solution: 'Implemented an automated agentic workflow that extracts data from legacy systems overnight, synthesizes it, and sends a daily actionable PDF report via email.',
    results: [
      "Saved 60+ hours of manual data entry per month",
      "Achieved 100% reporting accuracy",
      "Enabled real-time decision making for procurement"
    ],
    featured_image: '/images/case-study-manufacturing.png',
    status: 'Published'
  },
  {
    title: 'Accelerating Candidate Screening',
    slug: 'recruitment-candidate-screening',
    industry: 'Recruitment Agency',
    problem: 'Recruiters spent 70% of their time manually reviewing resumes and conducting initial phone screens for hundreds of unqualified applicants.',
    solution: 'Built an AI-powered voice agent that calls applicants immediately upon submission, asks 5 qualifying questions, and scores their intent and fit automatically.',
    results: [
      "Qualified 4,000+ leads automatically in month one",
      "Reduced time-to-hire by 12 days",
      "Increased recruiter placement rate by 45%"
    ],
    featured_image: '/images/case-study-recruitment.png',
    status: 'Published'
  },
  {
    title: 'Scaling 24/7 Customer Support',
    slug: 'retail-customer-support',
    industry: 'Retail Business',
    problem: 'The brand experienced a massive spike in support tickets regarding order tracking during the holiday season, resulting in response times over 48 hours.',
    solution: 'Integrated a smart chatbot across their website and Instagram that resolves tracking queries instantly and escalates complex issues with full context.',
    results: [
      "Resolved 85% of tier-1 support queries instantly",
      "Cut response times from 48 hours to 2 seconds",
      "Saved ₹12 lakh during peak holiday season"
    ],
    featured_image: '/images/case-study-retail.png',
    status: 'Published'
  }
];

export async function GET() {
  const supabase = await createClient();
  
  // Clear existing
  await supabase.from('case_studies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  const { data, error } = await supabase.from('case_studies').insert(caseStudies).select();
  
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, count: data.length });
}
