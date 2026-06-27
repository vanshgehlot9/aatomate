import UseCasesClient from "./client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function UseCasesPage() {
  const supabase = await createClient();

  const { data: useCases } = await supabase
    .from('use_cases')
    .select('*')
    .order('display_order', { ascending: true });

  return <UseCasesClient initialUseCases={useCases || []} />;
}
