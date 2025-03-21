"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addProperty(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const name = formData.get("property-name") as string;
  const type = formData.get("property-type") as string;
  const address = formData.get("property-address") as string;
  const city = formData.get("property-city") as string;
  const state = formData.get("property-state") as string;
  const zip = formData.get("property-zip") as string;
  const description = formData.get("property-description") as string;
  const yearBuilt = parseInt(formData.get("year-built") as string) || null;
  const lastRenovation =
    parseInt(formData.get("last-renovation") as string) || null;
  const totalUnits = parseInt(formData.get("total-units") as string) || null;
  const totalArea = parseInt(formData.get("total-area") as string) || null;
  const lotSize = parseFloat(formData.get("lot-size") as string) || null;
  const purchasePrice =
    parseInt(formData.get("purchase-price") as string) || null;
  const purchaseDate = (formData.get("purchase-date") as string) || null;
  const currentValue =
    parseInt(formData.get("current-value") as string) || null;
  const monthlyExpenses =
    parseInt(formData.get("monthly-expenses") as string) || null;

  // Validate required fields
  if (!name || !type || !address || !city || !state || !zip) {
    return { error: "Missing required fields" };
  }

  // Insert property into database
  const { data, error } = await supabase
    .from("properties")
    .insert({
      user_id: user.id,
      name,
      property_type: type,
      address,
      city,
      state,
      zip,
      description,
      year_built: yearBuilt,
      last_renovation: lastRenovation,
      total_units: totalUnits,
      total_area: totalArea,
      lot_size: lotSize,
      purchase_price: purchasePrice,
      purchase_date: purchaseDate,
      current_value: currentValue,
      monthly_expenses: monthlyExpenses,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // Handle image upload if provided
  const imageFile = formData.get("property-image") as File;
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${user.id}/${data[0].id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, imageFile);

    if (!uploadError) {
      // Update property with image URL
      const { data: publicUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      await supabase
        .from("properties")
        .update({ image_url: publicUrlData.publicUrl })
        .eq("id", data[0].id);
    }
  }

  redirect("/dashboard/properties");
}
