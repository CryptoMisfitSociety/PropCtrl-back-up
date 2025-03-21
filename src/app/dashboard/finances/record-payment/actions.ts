"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function recordRentPayment(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const tenantId = formData.get("tenant-id") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const paymentDate = formData.get("payment-date") as string;
  const paymentMethod = formData.get("payment-method") as string;
  const notes = (formData.get("notes") as string) || null;

  // Validate required fields
  if (!tenantId || !amount || !paymentDate || !paymentMethod) {
    return { error: "Missing required fields" };
  }

  // Get tenant and property information
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("*, properties(id, name)")
    .eq("id", tenantId)
    .single();

  if (tenantError || !tenant) {
    return { error: "Tenant not found" };
  }

  // Create transaction description
  const description = `Rent Payment - ${tenant.first_name} ${tenant.last_name}`;

  // Insert transaction into database
  const { data, error } = await supabase
    .from("financial_transactions")
    .insert({
      user_id: user.id,
      property_id: tenant.property_id,
      unit_number: tenant.unit_number,
      date: paymentDate,
      description: description,
      amount: amount,
      type: "income",
      category: "Rent",
      payment_method: paymentMethod,
      notes: notes,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // Update tenant's payment status and last payment date
  const { error: updateError } = await supabase
    .from("tenants")
    .update({
      payment_status: "Paid",
      last_payment_date: paymentDate,
    })
    .eq("id", tenantId);

  if (updateError) {
    return { error: updateError.message };
  }

  // Handle receipt upload if provided
  const receiptFile = formData.get("receipt") as File;
  if (receiptFile && receiptFile.size > 0) {
    const fileExt = receiptFile.name.split(".").pop();
    const fileName = `${user.id}/${data[0].id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("financial-receipts")
      .upload(fileName, receiptFile);

    if (!uploadError) {
      // Update transaction with receipt URL
      const { data: publicUrlData } = supabase.storage
        .from("financial-receipts")
        .getPublicUrl(fileName);

      await supabase
        .from("financial_transactions")
        .update({ receipt_url: publicUrlData.publicUrl })
        .eq("id", data[0].id);
    }
  }

  redirect("/dashboard/finances");
}
