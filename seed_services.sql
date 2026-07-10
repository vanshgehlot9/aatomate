-- 1. Ensure the new columns exist in the services table
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS problem TEXT,
ADD COLUMN IF NOT EXISTS solution TEXT,
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS process JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;

-- 2. Remove existing services if you want to cleanly seed this list
-- DELETE FROM public.services;

INSERT INTO public.services (title, slug, description, icon_name, display_order, problem, solution, benefits, process, faq)
VALUES 
(
  'AI Consulting',
  'ai-consulting',
  'Strategic guidance to integrate AI into your business model.',
  'BrainCircuit',
  1,
  'Businesses struggle to identify where AI can generate the most ROI and often waste time on the wrong technologies.',
  'Our AI Consulting maps out a clear, actionable strategy tailored to your industry, finding quick wins and long-term scalable solutions.',
  '["Clear AI Roadmap", "ROI Analysis", "Risk Mitigation", "Technology Stack Selection"]'::jsonb,
  '["1. Discovery Call", "2. Workflow Audit", "3. Strategy & Blueprint Delivery", "4. Pilot Implementation"]'::jsonb,
  '[{"question": "How long does a consulting engagement take?", "answer": "Typically 2 to 4 weeks depending on the scope of the business."}]'::jsonb
),
(
  'Business Process Automation',
  'business-process-automation',
  'End-to-end automation of your core business operations.',
  'Workflow',
  2,
  'Repetitive manual tasks slow down operations, increase human error, and drain employee morale.',
  'We implement smart automation that connects your existing tools, allowing data to flow seamlessly without human intervention.',
  '["90% Reduction in Manual Tasks", "Zero Human Error", "24/7 Operation", "Instant Data Syncing"]'::jsonb,
  '["1. Process Mapping", "2. Integration Setup", "3. Testing & QA", "4. Deployment & Monitoring"]'::jsonb,
  '[{"question": "Will this replace my current software?", "answer": "No, we build automations that connect and enhance the tools you already use (like CRM, ERP, and Slack)."}]'::jsonb
),
(
  'HR AI Solutions',
  'hr-ai-solutions',
  'Automate recruitment, onboarding, and employee queries.',
  'Users',
  3,
  'HR teams are overwhelmed by sorting through resumes, answering repetitive employee questions, and managing tedious onboarding paperwork.',
  'Our HR AI agents screen candidates, answer employee FAQs instantly, and automate the entire onboarding documentation flow.',
  '["70% Faster Hiring Cycle", "Automated Policy Answers", "Seamless Onboarding", "Unbiased Resume Screening"]'::jsonb,
  '["1. ATS Integration", "2. Knowledge Base Ingestion", "3. Bot Configuration", "4. Launch & Train"]'::jsonb,
  '[{"question": "Is the AI biased in hiring?", "answer": "We strictly calibrate our AI models to focus only on skills and experience, reducing unconscious human bias."}]'::jsonb
),
(
  'Custom AI Chatbots',
  'custom-ai-chatbots',
  'Intelligent conversational agents for sales and support.',
  'MessageSquare',
  4,
  'Customers expect instant responses 24/7, but maintaining a round-the-clock human support team is too expensive.',
  'We build custom AI chatbots that understand context, resolve issues, qualify leads, and escalate to humans only when necessary.',
  '["24/7 Customer Support", "Instant Lead Qualification", "Multi-language Support", "Reduced Support Ticket Volume"]'::jsonb,
  '["1. Data Ingestion (Website/Docs)", "2. Persona Design", "3. System Integration", "4. Deployment & Refinement"]'::jsonb,
  '[{"question": "Can the chatbot book appointments?", "answer": "Yes, our bots integrate directly with Calendly, Google Calendar, and other scheduling tools."}]'::jsonb
),
(
  'Document Automation',
  'document-automation',
  'Extract, process, and generate documents instantly.',
  'FileText',
  5,
  'Manual data entry from invoices, contracts, and forms is slow, expensive, and prone to costly mistakes.',
  'Our OCR and AI models automatically read, extract, and categorize data from any document format directly into your database.',
  '["100x Faster Processing", "High Accuracy Extraction", "Supports PDF/Images/Word", "Automated Compliance Checks"]'::jsonb,
  '["1. Document Sample Collection", "2. AI Model Training", "3. Pipeline Creation", "4. Live Processing"]'::jsonb,
  '[{"question": "Can it read handwritten notes?", "answer": "Yes, our advanced OCR models can read and transcribe clear handwriting with high accuracy."}]'::jsonb
),
(
  'Workflow Automation',
  'workflow-automation',
  'Streamline team collaboration and task management.',
  'GitMerge',
  6,
  'Projects get delayed due to bottlenecks, missed approvals, and scattered communication across different apps.',
  'We build automated workflows that trigger notifications, assign tasks, and push approvals automatically across Slack, Teams, and email.',
  '["Faster Project Delivery", "No Missed Deadlines", "Clear Accountability", "Centralized Notifications"]'::jsonb,
  '["1. Bottleneck Identification", "2. Trigger & Action Setup", "3. Testing", "4. Team Onboarding"]'::jsonb,
  '[{"question": "Do we need to learn a new tool?", "answer": "No, the automations happen in the background of the tools your team already uses."}]'::jsonb
),
(
  'AI Training',
  'ai-training',
  'Upskill your team with practical AI knowledge and tools.',
  'GraduationCap',
  7,
  'Employees are intimidated by AI or do not know how to leverage tools like ChatGPT to improve their daily productivity.',
  'We provide hands-on, role-specific AI training sessions that turn your employees into super-users of modern AI tools.',
  '["Increased Employee Output", "Better Prompt Engineering", "AI Security Awareness", "Role-Specific Playbooks"]'::jsonb,
  '["1. Skill Gap Assessment", "2. Curriculum Customization", "3. Live Workshops", "4. Ongoing Support"]'::jsonb,
  '[{"question": "Is the training technical?", "answer": "We offer both non-technical tracks for daily operations and technical tracks for developers."}]'::jsonb
),
(
  'Data Analytics',
  'data-analytics',
  'Turn raw data into predictive, actionable business insights.',
  'BarChart3',
  8,
  'Businesses collect massive amounts of data but lack the tools to interpret it, leading to missed opportunities and reactive decisions.',
  'Our AI-driven analytics dashboards clean your data, identify hidden trends, and provide predictive forecasting for future growth.',
  '["Predictive Insights", "Real-time Dashboards", "Automated Reporting", "Customer Behavior Modeling"]'::jsonb,
  '["1. Data Source Connection", "2. Cleaning & Structuring", "3. Dashboard Build", "4. Insight Generation"]'::jsonb,
  '[{"question": "Is our data safe?", "answer": "Absolutely. We adhere to strict data privacy protocols and do not use your proprietary data to train public models."}]'::jsonb
),
(
  'Enterprise AI Integration',
  'enterprise-ai-integration',
  'Secure, scalable, and custom LLM deployments for enterprises.',
  'Building2',
  9,
  'Large organizations need AI power but cannot risk uploading sensitive company data to public platforms like ChatGPT.',
  'We deploy secure, private, and locally-hosted AI models tailored specifically to your enterprise architecture and security requirements.',
  '["Total Data Privacy", "Custom LLM Fine-Tuning", "Scalable Infrastructure", "SOC2/GDPR Compliance"]'::jsonb,
  '["1. Security Audit", "2. Infrastructure Setup", "3. Model Deployment", "4. Enterprise Rollout"]'::jsonb,
  '[{"question": "Can this run on our own servers?", "answer": "Yes, we specialize in on-premise and private cloud AI deployments."}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  benefits = EXCLUDED.benefits,
  process = EXCLUDED.process,
  faq = EXCLUDED.faq,
  display_order = EXCLUDED.display_order;
