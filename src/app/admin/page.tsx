import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./client";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [leadsRes, demosRes, clientsRes, paymentsRes] = await Promise.all([
    supabase.from('leads').select('*'),
    supabase.from('demo_bookings').select('*'),
    supabase.from('clients').select('*'),
    supabase.from('payments').select('*'),
  ]);

  const leads = leadsRes.data || [];
  const demos = demosRes.data || [];
  const clients = clientsRes.data || [];
  const payments = paymentsRes.data || [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newLeadsToday = leads.filter((l: any) => new Date(l.created_at) >= today).length;
  const activeClients = clients.length;
  
  const upcomingDemos = demos.filter((d: any) => d.status === 'Scheduled' || !d.status).slice(0, 4);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let monthlyRevenue = 0;
  let pendingPayments = 0;
  let closedDeals = leads.filter((l: any) => l.status === 'Won').length;

  payments.forEach((p: any) => {
    if (p.status === 'Paid') {
      const pDate = new Date(p.payment_date);
      if (pDate.getFullYear() === currentYear && pDate.getMonth() === currentMonth) {
        monthlyRevenue += p.amount;
      }
    } else if (p.status === 'Pending' || p.status === 'Overdue') {
      pendingPayments += p.amount;
    }
  });

  const kpis = {
    totalLeads: leads.length,
    newLeadsToday,
    scheduledDemos: demos.filter((d: any) => d.status === 'Scheduled' || !d.status).length,
    conversionRate: leads.length > 0 ? Math.round((closedDeals / leads.length) * 100) : 0,
    activeClients,
    monthlyRevenue,
    pendingPayments,
    closedDeals
  };

  // Mock revenue chart for now (or could aggregate like in payments)
  const monthlyDataMap: Record<string, number> = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 5; i >= 0; i--) {
    let d = new Date();
    d.setMonth(d.getMonth() - i);
    monthlyDataMap[`${monthNames[d.getMonth()]}`] = 0;
  }

  payments.forEach((p: any) => {
    if (p.status === 'Paid') {
      const pDate = new Date(p.payment_date);
      const mName = monthNames[pDate.getMonth()];
      if (monthlyDataMap[mName] !== undefined) {
        monthlyDataMap[mName] += p.amount;
      }
    }
  });

  const revenueData = Object.keys(monthlyDataMap).map(key => ({
    name: key,
    revenue: monthlyDataMap[key]
  }));

  return (
    <DashboardClient 
      kpis={kpis}
      revenueData={revenueData}
      upcomingDemos={upcomingDemos}
    />
  );
}
