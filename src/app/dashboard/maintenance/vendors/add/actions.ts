"use server";

import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addVendor(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const name = formData.get("name") as string;
  const specialty = formData.get("specialty") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const address = (formData.get("address") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  // Validate required fields
  if (!name || !specialty || !phone || !email) {
    return { error: "Missing required fields" };
  }

  // Insert vendor into database
  const { data: vendorData, error } = await supabase
    .from("maintenance_vendors")
    .insert({
      user_id: user.id,
      name,
      specialty,
      phone,
      email,
      address,
      notes,
      rating: 0,
      jobs_completed: 0,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard/maintenance?tab=vendors");
}
