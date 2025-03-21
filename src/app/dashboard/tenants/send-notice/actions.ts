"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function sendTenantNotice(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const noticeType = formData.get("notice-type") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const recipients = formData.get("recipients") as string;

  // Get specific tenant IDs if individual tenants were selected
  let sentTo: string[] = [];

  if (recipients === "select-tenants") {
    const selectedTenants = formData.getAll("selected-tenants") as string[];
    sentTo = selectedTenants;
  } else {
    // For other recipient types, we'll need to query the database to get the tenant IDs
    let query = supabase.from("tenants").select("id").eq("user_id", user.id);

    if (recipients === "late-payments") {
      query = query.eq("payment_status", "Late");
    } else if (recipients === "upcoming-renewals") {
      // Get tenants with leases ending in the next 60 days
      const sixtyDaysFromNow = new Date();
      sixtyDaysFromNow.setDate(sixtyDaysFromNow.getDate() + 60);
      const today = new Date().toISOString().split("T")[0];
      const futureDate = sixtyDaysFromNow.toISOString().split("T")[0];

      query = query.gte("lease_end", today).lte("lease_end", futureDate);
    }

    const { data: tenants, error: tenantsError } = await query;

    if (tenantsError) {
      return { error: tenantsError.message };
    }

    if (tenants) {
      sentTo = tenants.map((tenant) => tenant.id);
    }
  }

  // Validate required fields
  if (
    !noticeType ||
    !subject ||
    !message ||
    !recipients ||
    sentTo.length === 0
  ) {
    return { error: "Missing required fields or no recipients selected" };
  }

  // Insert notice into database
  const { data, error } = await supabase
    .from("tenant_notices")
    .insert({
      user_id: user.id,
      notice_type: noticeType,
      subject: subject,
      message: message,
      recipients: recipients,
      sent_to: sentTo,
      sent_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // In a real application, you would send emails to tenants here
  // For now, we'll just redirect back to the tenants page

  redirect("/dashboard/tenants");
}
