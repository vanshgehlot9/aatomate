import { Database, Headphones, BarChart, Users, Zap, FileText } from "lucide-react";
import React from "react";

export const caseStudies = [
  {
    slug: "whatsapp-patient-bookings",
    title: "AUTOMATE PATIENT BOOKINGS WITH WHATSAPP AI.",
    description: "Named the top strategic tech trend, our WhatsApp AI handles 80% of patient appointment bookings automatically, freeing your staff to focus on care.",
    industry: "Healthcare",
    solution: "WhatsApp AI",
    color: "bg-[#fbff00]", 
    icon: <Database className="w-8 h-8 text-black" />,
    date: "Sep 23, 2025",
    metrics: {
      headline: "80%",
      subtext: "Reduction in manual booking tasks & phone calls"
    },
    problems: [
      {
        title: "High Call Volume",
        description: "Front desk staff overwhelmed with appointment scheduling calls, causing long hold times."
      },
      {
        title: "No-Show Rates",
        description: "Lack of immediate confirmation and reminders led to a 20% patient no-show rate."
      },
      {
        title: "After-Hours Dropoff",
        description: "Patients trying to book outside of clinic hours had no way to instantly secure a slot."
      }
    ],
    executiveSummary: "With the lack of a consistent, repeatable, and automated process; front-desk staff were overwhelmed with phone calls and manual data entry. The use of disconnected scheduling software and manual phone systems meant there was little insight into where delays were occurring, leading to decreases in patient satisfaction and high no-show rates.",
    solutionHeading: "A 24/7 WHATSAPP SCHEDULING AGENT",
    solutionText: "By deploying Aatomate's WhatsApp AI, patients can now seamlessly book, reschedule, or cancel appointments through conversational text. The AI integrates natively with your existing EHR system, instantly updating calendars without human intervention. Automated reminders drastically reduce no-shows, while staff are freed to focus entirely on in-person patient care."
  },
  {
    slug: "voice-ai-lead-qualification",
    title: "QUALIFY LEADS INSTANTLY WITH VOICE AGENTS.",
    description: "Voice AI agents call and qualify leads the moment they enter your system. Increase revenue by 40% with high-intent conversations.",
    industry: "Real Estate",
    solution: "Voice Agents",
    color: "bg-[#25D366]", 
    icon: <Headphones className="w-8 h-8 text-black" />,
    date: "Oct 12, 2025",
    metrics: {
      headline: "40%",
      subtext: "Increase in overall sales revenue from faster contact rates"
    },
    problems: [
      {
        title: "Delayed Follow-ups",
        description: "Sales agents took hours to call internet leads, resulting in a massive drop in conversion probability."
      },
      {
        title: "Wasted Sales Time",
        description: "Top closers spent 60% of their day dialing unverified or low-intent prospects."
      },
      {
        title: "Inconsistent Scripting",
        description: "Human agents deviated from proven qualification scripts, missing key discovery questions."
      }
    ],
    executiveSummary: "Speed to lead is critical in real estate, yet the team relied on manual dialing processes that delayed response times by hours. The use of disconnected CRMs and manual outbound efforts meant there was little insight into lead quality before a senior agent took the call. This required repeated manual interventions to fix pipelines, leading to decreases in sales productivity and missed revenue goals.",
    solutionHeading: "INSTANT INBOUND & OUTBOUND VOICE AI",
    solutionText: "Aatomate deployed human-like Voice AI agents that instantly call new leads within 5 seconds of submission. The AI asks predefined qualifying questions, assesses intent, and automatically routes hot leads directly to senior closers via live-transfer. If a lead isn't ready, the AI enrolls them in a long-term text nurture campaign."
  },
  {
    slug: "agentic-workflows-operations",
    title: "STREAMLINE MANUAL PROCESSES WITH AGENTIC WORKFLOWS.",
    description: "Deploy AI quickly with our use case library. Connect your tools, trigger automatic reports, and notify the right people with zero manual effort.",
    industry: "Operations",
    solution: "Workflows",
    color: "bg-[#3b82f6]", 
    icon: <BarChart className="w-8 h-8 text-black" />,
    date: "Nov 05, 2025",
    metrics: {
      headline: "15hrs",
      subtext: "Saved per employee every single week on data entry"
    },
    problems: [
      {
        title: "Data Silos",
        description: "Crucial operational data lived in fragmented software stacks that didn't communicate."
      },
      {
        title: "Manual Reporting",
        description: "Managers spent entire Fridays manually pulling CSVs and building spreadsheet reports."
      },
      {
        title: "Error-Prone Handoffs",
        description: "Information passed between departments via Slack resulted in lost requests and errors."
      }
    ],
    executiveSummary: "With the lack of a consistent, repeatable, and automated process; operational tasks were not completed for weeks. The use of multiple disconnected systems and manual processes meant there was little insight into where bottlenecks were occurring. This required repeated manual interventions to fix problems, leading to decreases in employee productivity and missed delivery goals.",
    solutionHeading: "END-TO-END SYSTEM ORCHESTRATION",
    solutionText: "We implemented custom Agentic Workflows that act as a central nervous system for your operations. By directly integrating APIs across your ERP, CRM, and communication tools, Aatomate triggers automated sequences the moment a specific condition is met—instantly generating reports, alerting stakeholders, and updating records across the board."
  },
  {
    slug: "ecommerce-support-automation",
    title: "PROVIDE 24/7 CUSTOMER SUPPORT AUTOMATION.",
    description: "Instant responses to FAQs, order tracking, and smart escalation to human agents. Zero wait time for your customers.",
    industry: "E-commerce",
    solution: "Customer Support",
    color: "bg-[#b87af5]", 
    icon: <Users className="w-8 h-8 text-black" />,
    date: "Dec 18, 2025",
    metrics: {
      headline: "99%",
      subtext: "Resolution rate for Tier-1 support tickets instantly"
    },
    problems: [
      {
        title: "High Ticket Volume",
        description: "Customer support inbox flooded with repetitive questions about shipping and returns."
      },
      {
        title: "Slow Resolution Times",
        description: "Customers waited 24-48 hours for simple answers, damaging brand trust and reviews."
      },
      {
        title: "Scaling Costs",
        description: "Seasonal spikes required hiring expensive temporary support staff."
      }
    ],
    executiveSummary: "Customer expectations demand instant answers, but relying on a manual support team led to overwhelming backlogs. The use of disconnected ticketing systems and manual triaging meant there was little insight into urgent requests versus simple FAQs. This resulted in frustrated customers abandoning their carts and returning products.",
    solutionHeading: "OMNICHANNEL AI SUPPORT ASSISTANTS",
    solutionText: "Aatomate introduced a self-learning AI assistant connected directly to the brand's knowledge base and Shopify backend. It instantly resolves 99% of Tier 1 queries—such as \"Where is my order?\" or \"What is your return policy?\"—across Live Chat, Email, and Instagram DMs, ensuring customers get immediate help 24/7 while seamlessly routing complex issues to human agents."
  }
];
