import { createClient } from "@/lib/supabase/server";
import AnalyticsClient from "./client";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const [leadsRes, demosRes] = await Promise.all([
    supabase.from('leads').select('*'),
    supabase.from('demo_bookings').select('*')
  ]);

  const leads = leadsRes.data || [];
  const demos = demosRes.data || [];

  // 1. Calculate Lead Sources (using service_interested as a proxy for now)
  const serviceCount: Record<string, number> = {};
  leads.forEach((l: any) => {
    const s = l.service_interested || 'Other';
    serviceCount[s] = (serviceCount[s] || 0) + 1;
  });
  
  const leadSourceData = Object.keys(serviceCount).map(key => ({
    name: key,
    value: serviceCount[key]
  }));

  // 2. Funnel Data
  const visitors = 45200; // Mock visitors
  const totalLeads = leads.length;
  const totalDemos = demos.length;
  const totalProposals = leads.filter((l: any) => l.status === 'Proposal Sent').length;
  const totalWon = leads.filter((l: any) => l.status === 'Won').length;

  const funnelData = [
    { name: 'Visitors', value: visitors },
    { name: 'Leads', value: totalLeads },
    { name: 'Demos', value: totalDemos },
    { name: 'Proposals', value: totalProposals },
    { name: 'Won', value: totalWon },
  ];

  const stats = {
    totalLeads,
    totalDemos
  };

  return (
    <AnalyticsClient 
      leadSourceData={leadSourceData} 
      funnelData={funnelData} 
      stats={stats} 
    />
  );
}
