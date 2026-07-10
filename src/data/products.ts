import { Stethoscope, Building2, Utensils, Home, Calendar, Clock, Users, Shield, MessageSquare, CreditCard, FileText } from "lucide-react";

export const productsData = [
  {
    slug: "doctor-bot",
    themeColor: "#25D366", // WhatsApp Green
    icon: "Stethoscope",
    hero: {
      title: "The AI Receptionist for Modern Clinics.",
      subtitle: "Automate patient bookings, answer medical inquiries, and send smart reminders 24/7 directly on WhatsApp.",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(37, 211, 102, 0.05) 0%, transparent 50%)",
      floatingCards: ["Lead Qualified", "Calendar Synced", "Reminder Sent"]
    },
    problems: [
      {
        title: "Missed Calls",
        description: "Clinics miss up to 30% of patient calls during peak hours, losing revenue and trust."
      },
      {
        title: "Manual Booking Errors",
        description: "Front desk staff spend hours manually entering appointments, leading to double-bookings."
      },
      {
        title: "No-Show Rates",
        description: "Without automated, conversational reminders, patient no-show rates remain alarmingly high."
      }
    ],
    solutions: [
      {
        title: "Instant 24/7 Booking",
        description: "Patients can book, reschedule, or cancel appointments instantly via a natural WhatsApp conversation.",
        icon: "Calendar"
      },
      {
        title: "Smart Triage & FAQ",
        description: "The AI answers common questions about operating hours, insurance, and prep instructions.",
        icon: "MessageSquare"
      },
      {
        title: "Secure Patient Data",
        description: "Collect patient details securely before they even step into the clinic.",
        icon: "Shield"
      }
    ],
    chatDemo: [
      { sender: "bot", text: "Hello! Welcome to City Clinic 🏥. How can I help you today?", time: "10:00 AM" },
      { sender: "user", text: "I need to book an appointment with a cardiologist.", time: "10:01 AM" },
      { sender: "bot", text: "Dr. Sharma has openings tomorrow at 10:00 AM and 2:30 PM. Reply with the time you prefer!", time: "10:01 AM" },
      { sender: "user", text: "10:00 AM works.", time: "10:03 AM" },
      { sender: "bot", text: "✅ Appointment confirmed for tomorrow at 10:00 AM. We'll send you a reminder 2 hours before.", time: "10:03 AM" }
    ],
    workflow: [
      "Patient sends WhatsApp message",
      "AI identifies medical intent",
      "Checks doctor availability",
      "Books slot in calendar",
      "Sends confirmation & PDF"
    ],
    integrations: ["WhatsApp", "Custom CRMs", "Internal Databases", "Payment Gateways"],
    faqs: [
      { question: "Is patient data secure?", answer: "Yes, all conversations are end-to-end encrypted on WhatsApp, ensuring your clinic's and patients' data remains completely private and secure." },
      { question: "Can it integrate with our existing booking system?", answer: "Absolutely. We build custom integrations to sync the bot directly with your clinic's existing internal database or local CRM for real-time updates." }
    ]
  },
  {
    slug: "hotel-bot",
    themeColor: "#fbff00", // Hospitality Yellow/Gold
    icon: "Building2",
    hero: {
      title: "Your 5-Star Digital Concierge.",
      subtitle: "Turn WhatsApp into a high-converting booking engine. Handle reservations, room service, and guest inquiries instantly.",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(251, 255, 0, 0.05) 0%, transparent 50%)",
      floatingCards: ["Payment Received", "Room Upgraded", "Concierge Alert"]
    },
    problems: [
      {
        title: "High OTA Commissions",
        description: "Hotels lose 15-30% of revenue to Online Travel Agencies (OTAs) for every booking."
      },
      {
        title: "Slow Guest Responses",
        description: "Guests get frustrated waiting on hold for the front desk to answer simple questions."
      },
      {
        title: "Lost Upsell Opportunities",
        description: "Lack of automated communication means missed chances to sell spa treatments or room upgrades."
      }
    ],
    solutions: [
      {
        title: "Direct Zero-Commission Bookings",
        description: "Process bookings and payments directly in WhatsApp, keeping 100% of the revenue.",
        icon: "CreditCard"
      },
      {
        title: "Automated Room Service",
        description: "Guests can order food, request towels, or book spa appointments instantly.",
        icon: "Utensils"
      },
      {
        title: "Multilingual Support",
        description: "Communicate with international guests effortlessly in over 50 languages.",
        icon: "Users"
      }
    ],
    chatDemo: [
      { sender: "bot", text: "Welcome to Paradise Resort 🌴. Are you looking to book a stay?", time: "4:30 PM" },
      { sender: "user", text: "Yes, looking for a sea-view suite for this weekend (2 nights).", time: "4:31 PM" },
      { sender: "bot", text: "Great! We have 1 Ocean View Suite available for Friday - Sunday. The total is $450. Would you like to proceed?", time: "4:31 PM" },
      { sender: "user", text: "Yes, please book it.", time: "4:35 PM" },
      { sender: "bot", text: "✅ Perfect. Please complete your payment here to confirm: pay.stripe.com/abcxyz", time: "4:35 PM" }
    ],
    workflow: [
      "Guest inquires about dates",
      "AI checks PMS inventory",
      "Sends secure payment link",
      "Guest completes payment",
      "Sends digital room key/details"
    ],
    integrations: ["WhatsApp", "Stripe", "Hotel PMS", "Zendesk"],
    faqs: [
      { question: "Does it support multiple languages?", answer: "Yes, the bot automatically detects the guest's language and replies accordingly in over 50 languages." },
      { question: "How are payments handled?", answer: "We integrate directly with Stripe to send secure, encrypted payment links inside the chat." }
    ]
  },
  {
    slug: "provaluate",
    themeColor: "#3b82f6", // Tech Blue
    icon: "FileText",
    hero: {
      title: "ProValuate: AI Document Extraction",
      subtitle: "Automate invoice processing, contract analysis, and data entry with 99.9% accuracy.",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
      floatingCards: ["Data Extracted", "Exported to CSV", "Error Free"]
    },
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
    ],
    comparison: [
      { feature: "Processing Speed", aatomate: "2 seconds / doc", competitor: "3-5 mins / doc" },
      { feature: "Accuracy Rate", aatomate: "99.9%", competitor: "85%" },
      { feature: "Handwriting Recognition", aatomate: "Supported", competitor: "No" },
      { feature: "API Integration", aatomate: "1-Click Connect", competitor: "Requires Developer" }
    ],
    pricing: {
      monthly: "$299",
      yearly: "$2,990"
    },
    problems: [
      { title: "Manual Data Entry", description: "Teams spend hundreds of hours manually typing invoice data into ERPs." },
      { title: "Human Errors", description: "Typographical errors in financial documents lead to massive compliance risks." }
    ],
    solutions: [
      { title: "Instant Extraction", description: "AI instantly pulls key-value pairs, tables, and signatures from any PDF or Image.", icon: "Zap" },
      { title: "Direct ERP Sync", description: "Extracted data is automatically pushed to SAP, Oracle, or QuickBooks.", icon: "Database" }
    ],
    chatDemo: [], // Not applicable for this product
    workflow: [
      "Upload PDF/Image",
      "AI scans document",
      "Extracts key fields & tables",
      "Validates against rules",
      "Pushes to Database"
    ],
    integrations: ["SAP", "QuickBooks", "Xero", "Salesforce"],
    faqs: [
      { question: "Does it support handwritten notes?", answer: "Yes, our advanced OCR engine can read unstructured handwritten text accurately." }
    ]
  }
];
