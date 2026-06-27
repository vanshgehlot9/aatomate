import { createClient } from "@/lib/supabase/server";
import PaymentsClient from "./client";

export default async function PaymentsPage() {
  const supabase = await createClient();

  const { data: payments, error } = await supabase
    .from('payments')
    .select('*')
    .order('payment_date', { ascending: false });

  if (error) {
    console.error("Error fetching payments:", error);
  }

  const allPayments = payments || [];

  // Calculate KPIs
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.floor(currentMonth / 3);

  let monthRevenue = 0;
  let quarterRevenue = 0;
  let outstanding = 0;
  let paidCount = 0;

  allPayments.forEach((p: any) => {
    const pDate = new Date(p.payment_date);
    if (p.status === 'Paid') {
      paidCount++;
      if (pDate.getFullYear() === currentYear) {
        if (pDate.getMonth() === currentMonth) {
          monthRevenue += p.amount;
        }
        if (Math.floor(pDate.getMonth() / 3) === currentQuarter) {
          quarterRevenue += p.amount;
        }
      }
    } else if (p.status === 'Pending' || p.status === 'Overdue') {
      outstanding += p.amount;
    }
  });

  // Calculate monthly revenue data for chart
  const monthlyDataMap: Record<string, number> = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    let d = new Date();
    d.setMonth(d.getMonth() - i);
    monthlyDataMap[`${monthNames[d.getMonth()]}`] = 0;
  }

  allPayments.forEach((p: any) => {
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

  // Mock service revenue for now as it needs a join with clients or complex grouping
  const serviceRevenueData = [
    { name: "AI Support", value: 45000 },
    { name: "WhatsApp Bot", value: 32000 },
    { name: "Custom Dev", value: 28000 },
  ];

  return (
    <PaymentsClient 
      payments={allPayments} 
      stats={{ month: monthRevenue, quarter: quarterRevenue, outstanding, paidCount }}
      revenueData={revenueData}
      serviceRevenueData={serviceRevenueData}
    />
  );
}
