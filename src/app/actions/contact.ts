"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return { error: "Please fill in all required fields." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from('leads').insert([{
      name: data.name,
      email: data.email,
      company_name: data.company,
      service_interested: data.service,
      notes: data.message,
      status: 'New'
    }]);

    if (error) {
      console.error("Supabase Error:", error);
      return { error: "Something went wrong saving your lead." };
    }

    console.log("✅ NEW LEAD SAVED TO SUPABASE:", data);

    return { success: true };
  } catch (error) {
    console.error("Error processing form:", error);
    return { error: "Something went wrong processing your request." };
  }
}
