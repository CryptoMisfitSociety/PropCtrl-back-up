"use server";

import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addMaintenanceSchedule(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const propertyId = (formData.get("property-id") as string) || null;
  const scheduledDate = formData.get("scheduled-date") as string;
  const frequency = formData.get("frequency") as string;
  const priority = formData.get("priority") as string;
  const estimatedCost =
    parseFloat(formData.get("estimated-cost") as string) || 0;
  const vendorId = (formData.get("vendor-id") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  // Validate required fields
  if (!title || !description || !scheduledDate || !frequency || !priority) {
    return { error: "Missing required fields" };
  }

  // Insert maintenance schedule into database
  const { data, error } = await supabase
    .from("maintenance_schedules")
    .insert({
      user_id: user.id,
      title,
      description,
      property_id: propertyId,
      scheduled_date: scheduledDate,
      frequency,
      priority,
      estimated_cost: estimatedCost,
      vendor_id: vendorId,
      notes,
      status: "Scheduled",
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard/maintenance?tab=preventive");
}
