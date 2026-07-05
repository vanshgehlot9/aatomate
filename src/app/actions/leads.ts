"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitLead(formData: {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  city?: string;
  state?: string;
  terms_accepted?: boolean;
  service_interested: string;
}) {
  const supabase = await createClient();

  try {
    const notesStr = [
      formData.city ? `City: ${formData.city}` : '',
      formData.state ? `State: ${formData.state}` : '',
      `Terms Accepted: ${formData.terms_accepted ? 'Yes' : 'No'}`
    ].filter(Boolean).join(' | ');

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company_name: formData.company_name || null,
          service_interested: formData.service_interested,
          status: "New",
          notes: notesStr || null,
        },
      ]);

    if (error) {
      console.error("Error inserting lead:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server error submitting lead:", err);
    return { success: false, error: err.message || "Internal server error" };
  }
}
