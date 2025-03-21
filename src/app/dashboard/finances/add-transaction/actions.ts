"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addTransaction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const date = formData.get("transaction-date") as string;
  const description = formData.get("description") as string;
  const propertyId = formData.get("property-id") as string;
  const unitNumber = (formData.get("unit-number") as string) || null;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const type = formData.get("transaction-type") as string;
  const category = formData.get("category") as string;
  const paymentMethod = (formData.get("payment-method") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  // Validate required fields
  if (!date || !description || !propertyId || !amount || !type || !category) {
    return { error: "Missing required fields" };
  }

  // Insert transaction into database
  const { data, error } = await supabase
    .from("financial_transactions")
    .insert({
      user_id: user.id,
      property_id: propertyId,
      unit_number: unitNumber,
      date,
      description,
      amount,
      type,
      category,
      payment_method: paymentMethod,
      notes,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
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

  // If this is a rent payment, update tenant's payment status and last payment date
  if (type === "income" && category === "Rent" && unitNumber) {
    // Find tenant by property and unit
    const { data: tenantData } = await supabase
      .from("tenants")
      .select("id")
      .eq("property_id", propertyId)
      .eq("unit_number", unitNumber)
      .single();

    if (tenantData) {
      await supabase
        .from("tenants")
        .update({
          payment_status: "Paid",
          last_payment_date: date,
        })
        .eq("id", tenantData.id);
    }
  }

  redirect("/dashboard/finances");
}
