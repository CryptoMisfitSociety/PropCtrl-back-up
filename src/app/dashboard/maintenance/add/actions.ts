"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addMaintenanceRequest(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const propertyId = formData.get("property-id") as string;
  const unitNumber = formData.get("unit-number") as string;
  const tenantId = formData.get("tenant-id") as string;
  const issue = formData.get("issue") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const assignedTo = formData.get("assigned-to") as string;
  const estimatedCost =
    parseInt(formData.get("estimated-cost") as string) || null;
  const scheduledDate = (formData.get("scheduled-date") as string) || null;

  // Validate required fields
  if (!propertyId || !unitNumber || !issue || !priority) {
    return { error: "Missing required fields" };
  }

  // Insert maintenance request into database
  const { data, error } = await supabase
    .from("maintenance_requests")
    .insert({
      user_id: user.id,
      property_id: propertyId,
      unit_number: unitNumber,
      tenant_id: tenantId || null,
      issue,
      description,
      priority,
      status: "Pending", // Default status
      assigned_to: assignedTo || null,
      estimated_cost: estimatedCost,
      reported_date: new Date().toISOString(),
      scheduled_date: scheduledDate,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // Handle photo uploads if provided
  const photos = formData.getAll("photos") as File[];
  if (photos && photos.length > 0 && photos[0].size > 0) {
    for (const photo of photos) {
      const fileExt = photo.name.split(".").pop();
      const fileName = `${user.id}/${data[0].id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("maintenance-photos")
        .upload(fileName, photo);

      if (!uploadError) {
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("maintenance-photos")
          .getPublicUrl(fileName);

        // Add photo reference to maintenance_photos table
        await supabase.from("maintenance_photos").insert({
          maintenance_request_id: data[0].id,
          photo_url: publicUrlData.publicUrl,
          created_at: new Date().toISOString(),
        });
      }
    }
  }

  redirect("/dashboard/maintenance");
}
