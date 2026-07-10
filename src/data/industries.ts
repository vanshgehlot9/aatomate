import { Activity, Factory, ShoppingBag, Terminal, GraduationCap, Building2, Truck, Coffee, Landmark } from "lucide-react";

export const industriesData = [
  {
    slug: "healthcare",
    title: "AI for Healthcare",
    shortName: "Healthcare",
    iconName: "Activity",
    themeColor: "#25D366",
    hero: {
      title: "Automate Patient Care. Eradicate Admin.",
      subtitle: "Transform your clinic with HIPAA-compliant AI agents that handle bookings, answer FAQs, and triage patients 24/7."
    },
    problems: [
      { title: "High Missed Call Rates", description: "Clinics miss up to 30% of patient calls during peak hours, losing revenue." },
      { title: "Manual Scheduling Errors", description: "Front desk staff spend hours entering appointments, leading to double bookings." },
      { title: "Patient No-Shows", description: "Lack of conversational, automated reminders leads to empty slots." }
    ],
    solutions: [
      { title: "24/7 WhatsApp Booking", description: "Patients can securely book and reschedule appointments via natural language on WhatsApp.", icon: "Activity" },
      { title: "Automated Triage", description: "AI handles common medical FAQs, insurance queries, and clinic directions instantly.", icon: "Activity" },
      { title: "EHR Integration", description: "Syncs directly with Epic, Cerner, or local clinic software to update patient records automatically.", icon: "Activity" }
    ],
    results: ["72% reduction in manual admin work", "Zero missed appointment requests", "40% decrease in no-shows"]
  },
  {
    slug: "manufacturing",
    title: "AI for Manufacturing",
    shortName: "Manufacturing",
    iconName: "Factory",
    themeColor: "#f97316",
    hero: {
      title: "Intelligent Supply Chains & Operations.",
      subtitle: "Deploy agentic workflows to automate daily reporting, predict inventory shortages, and streamline procurement."
    },
    problems: [
      { title: "Siloed Legacy Data", description: "Reporting requires manually pulling data from 3+ different legacy software systems." },
      { title: "Supply Chain Delays", description: "Inability to predict part shortages leads to expensive production line halts." },
      { title: "Slow Procurement", description: "Vendor communication and PO approvals get stuck in email threads." }
    ],
    solutions: [
      { title: "Automated Daily Reports", description: "AI agents extract data from legacy systems overnight and generate actionable PDF reports.", icon: "Factory" },
      { title: "Predictive Maintenance", description: "Analyze IoT data to alert engineers before a machine breaks down.", icon: "Factory" },
      { title: "Smart Procurement", description: "Automated agents draft POs and negotiate initial terms with suppliers via email.", icon: "Factory" }
    ],
    results: ["15+ hours saved per week on reporting", "100% data extraction accuracy", "Near-zero unexpected downtime"]
  },
  {
    slug: "retail",
    title: "AI for Retail & E-commerce",
    shortName: "Retail",
    iconName: "ShoppingBag",
    themeColor: "#ec4899",
    hero: {
      title: "Scale Customer Support to Infinity.",
      subtitle: "Resolve 'Where is my order?' queries instantly and automate returns with intelligent chat and voice agents."
    },
    problems: [
      { title: "Holiday Support Spikes", description: "Support teams get overwhelmed during peak seasons, driving response times to 48+ hours." },
      { title: "WISMO Tickets", description: "Over 60% of incoming tickets are simple 'Where is my order?' inquiries." },
      { title: "High Return Friction", description: "Complex manual return processes frustrate customers and cost the brand loyalty." }
    ],
    solutions: [
      { title: "Instant WISMO Resolution", description: "AI instantly queries Shopify/Magento and responds with exact tracking details in 2 seconds.", icon: "ShoppingBag" },
      { title: "Automated Returns Flow", description: "Bot validates the order, generates a return label, and updates the CRM automatically.", icon: "ShoppingBag" },
      { title: "Proactive Upselling", description: "AI suggests complementary products during checkout or support interactions.", icon: "ShoppingBag" }
    ],
    results: ["85% of tier-1 support queries automated", "Response time cut from 2 days to 2 seconds", "12% increase in cross-sell revenue"]
  },
  {
    slug: "it",
    title: "AI for IT Services",
    shortName: "IT Support",
    iconName: "Terminal",
    themeColor: "#3b82f6",
    hero: {
      title: "Next-Gen L1 IT Helpdesk.",
      subtitle: "Automate password resets, software provisioning, and ticketing with AI agents that work inside Slack/Teams."
    },
    problems: [
      { title: "Repetitive Tickets", description: "Engineers waste hours on password resets and basic software access requests." },
      { title: "Slow Onboarding", description: "Setting up accounts for new hires takes days of back-and-forth communication." },
      { title: "Alert Fatigue", description: "IT teams are bombarded with low-level system alerts." }
    ],
    solutions: [
      { title: "Slack/Teams Helpdesk", description: "Employees ask for access or resets in chat, and the AI provisions it instantly via API.", icon: "Terminal" },
      { title: "Zero-Touch Onboarding", description: "AI automatically creates Google Workspace, Jira, and GitHub accounts based on role.", icon: "Terminal" },
      { title: "Alert Triage", description: "AI categorizes, prioritizes, and auto-resolves common network alerts.", icon: "Terminal" }
    ],
    results: ["60% reduction in L1 IT tickets", "New hire setup reduced from 2 days to 5 minutes", "Massive boost in employee satisfaction"]
  },
  {
    slug: "education",
    title: "AI for Education",
    shortName: "Education",
    iconName: "GraduationCap",
    themeColor: "#8b5cf6",
    hero: {
      title: "Automated Admissions & Student Success.",
      subtitle: "Deploy virtual counselors to qualify leads, answer curriculum questions, and guide students through enrollment."
    },
    problems: [
      { title: "Lead Leakage", description: "Universities lose prospective students due to slow responses to admission inquiries." },
      { title: "Overwhelmed Counselors", description: "Counselors answer the same curriculum and fee structure questions thousands of times." },
      { title: "Low Engagement", description: "Students miss critical deadlines for financial aid or course registration." }
    ],
    solutions: [
      { title: "24/7 Virtual Counselor", description: "AI answers detailed questions about courses, fees, and campus life on WhatsApp or web.", icon: "GraduationCap" },
      { title: "Automated Lead Qualification", description: "Voice agents call prospective students instantly to gauge intent and schedule counselor meetings.", icon: "GraduationCap" },
      { title: "Smart Nudges", description: "Automated WhatsApp flows remind students of upcoming submission deadlines.", icon: "GraduationCap" }
    ],
    results: ["40% increase in lead-to-enrollment conversion", "Saved thousands of counselor hours", "Instant responses to 90% of student queries"]
  },
  {
    slug: "finance",
    title: "AI for Finance & Accounting",
    shortName: "Finance",
    iconName: "Building2",
    themeColor: "#10b981",
    hero: {
      title: "Flawless Financial Workflows.",
      subtitle: "Automate invoice extraction, expense approvals, and KYC compliance with 99.9% accuracy."
    },
    problems: [
      { title: "Manual Data Entry", description: "Teams spend hundreds of hours manually typing invoice data into ERPs." },
      { title: "Compliance Risks", description: "Human errors in financial documents lead to severe compliance and audit risks." },
      { title: "Slow Approvals", description: "Expense reports get buried in managers' inboxes." }
    ],
    solutions: [
      { title: "AI Document Extraction", description: "Instantly pull key-value pairs from PDFs and receipts and push them to QuickBooks/SAP.", icon: "Building2" },
      { title: "Automated KYC", description: "AI verifies customer documents and checks them against global databases instantly.", icon: "Building2" },
      { title: "Smart Routing", description: "Invoices and expenses are automatically routed to the correct manager based on spending rules.", icon: "Building2" }
    ],
    results: ["99.9% data extraction accuracy", "Invoice processing time cut by 80%", "Zero compliance violations"]
  },
  {
    slug: "logistics",
    title: "AI for Logistics & Freight",
    shortName: "Logistics",
    iconName: "Truck",
    themeColor: "#eab308",
    hero: {
      title: "Real-time Supply Chain Visibility.",
      subtitle: "Automate quoting, track-and-trace, and driver communication via WhatsApp and SMS."
    },
    problems: [
      { title: "Where is my truck?", description: "Dispatchers spend all day calling drivers for location updates." },
      { title: "Manual Quoting", description: "Generating freight quotes takes hours of checking multiple rate sheets." },
      { title: "Document Chaos", description: "Proof of Delivery (POD) and Bill of Lading (BOL) documents get lost or delayed." }
    ],
    solutions: [
      { title: "Automated Track-and-Trace", description: "Customers can text the AI on WhatsApp to get real-time GPS locations of their freight.", icon: "Truck" },
      { title: "Instant Rate Quotes", description: "AI reads incoming email requests, calculates rates, and replies with a quote instantly.", icon: "Truck" },
      { title: "Automated Document Processing", description: "Drivers snap a photo of the POD on WhatsApp, and AI instantly updates the TMS.", icon: "Truck" }
    ],
    results: ["70% reduction in dispatcher call volume", "Quotes generated in seconds, not hours", "Instant invoicing upon delivery"]
  },
  {
    slug: "hospitality",
    title: "AI for Hospitality",
    shortName: "Hospitality",
    iconName: "Coffee",
    themeColor: "#fbff00",
    hero: {
      title: "The 5-Star Digital Concierge.",
      subtitle: "Turn WhatsApp into a booking engine. Handle reservations, room service, and guest inquiries instantly."
    },
    problems: [
      { title: "High OTA Commissions", description: "Hotels lose 15-30% of revenue to Online Travel Agencies (OTAs) for every booking." },
      { title: "Slow Guest Responses", description: "Guests get frustrated waiting on hold for the front desk to answer simple questions." },
      { title: "Lost Upsell Opportunities", description: "Lack of automated communication means missed chances to sell spa treatments or room upgrades." }
    ],
    solutions: [
      { title: "Direct Zero-Commission Bookings", description: "Process bookings and payments directly in WhatsApp, keeping 100% of the revenue.", icon: "Coffee" },
      { title: "Automated Room Service", description: "Guests can order food, request towels, or book spa appointments instantly.", icon: "Coffee" },
      { title: "Multilingual Support", description: "Communicate with international guests effortlessly in over 50 languages.", icon: "Coffee" }
    ],
    results: ["30% increase in direct bookings", "Zero missed guest requests", "Significant boost in CSAT scores"]
  },
  {
    slug: "government",
    title: "AI for Government & Public Sector",
    shortName: "Government",
    iconName: "Landmark",
    themeColor: "#64748b",
    hero: {
      title: "Citizen Services at Scale.",
      subtitle: "Modernize public administration with automated query resolution, document processing, and multilingual access."
    },
    problems: [
      { title: "Massive Backlogs", description: "Agencies struggle with massive backlogs of applications and citizen requests." },
      { title: "Accessibility Barriers", description: "Citizens struggle to navigate complex government websites to find simple answers." },
      { title: "High Call Center Costs", description: "Call centers are flooded with repetitive queries about tax deadlines or permit statuses." }
    ],
    solutions: [
      { title: "Multilingual Citizen Portal", description: "AI chatbots on official portals answer queries in regional languages instantly.", icon: "Landmark" },
      { title: "Automated Application Routing", description: "AI reads incoming applications, verifies completeness, and routes them to the right department.", icon: "Landmark" },
      { title: "Smart Scheduling", description: "Citizens can easily book appointments for ID renewals or licenses via conversational AI.", icon: "Landmark" }
    ],
    results: ["50% reduction in call center load", "Application processing time slashed by half", "Massive improvement in citizen accessibility"]
  }
];
