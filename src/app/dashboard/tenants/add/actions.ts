"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addTenant(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const propertyId = formData.get("property-id") as string;
  const unitNumber = formData.get("unit-number") as string;
  const leaseStart = formData.get("lease-start") as string;
  const leaseEnd = formData.get("lease-end") as string;
  const rentAmount = parseInt(formData.get("rent-amount") as string) || 0;
  const securityDeposit =
    parseInt(formData.get("security-deposit") as string) || 0;
  const notes = formData.get("notes") as string;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !propertyId ||
    !unitNumber ||
    !leaseStart ||
    !leaseEnd ||
    !rentAmount
  ) {
    return { error: "Missing required fields" };
  }

  // Insert tenant into database
  const { data, error } = await supabase
    .from("tenants")
    .insert({
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      property_id: propertyId,
      unit_number: unitNumber,
      lease_start: leaseStart,
      lease_end: leaseEnd,
      rent_amount: rentAmount,
      security_deposit: securityDeposit,
      notes,
      payment_status: "Current", // Default status
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // Handle document upload if provided
  const leaseDocument = formData.get("lease-document") as File;
  if (leaseDocument && leaseDocument.size > 0) {
    const fileExt = leaseDocument.name.split(".").pop();
    const fileName = `${user.id}/${data[0].id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("tenant-documents")
      .upload(fileName, leaseDocument);

    if (!uploadError) {
      // Update tenant with document URL
      const { data: publicUrlData } = supabase.storage
        .from("tenant-documents")
        .getPublicUrl(fileName);

      await supabase
        .from("tenants")
        .update({ lease_document_url: publicUrlData.publicUrl })
        .eq("id", data[0].id);
    }
  }

  redirect("/dashboard/tenants");
}
