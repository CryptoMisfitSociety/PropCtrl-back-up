"use server";

import { createClient } from "../../../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function addPropertyUnit(formData: FormData) {
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
  const unitType = formData.get("unit-type") as string;
  const squareFeet = parseInt(formData.get("square-feet") as string) || null;
  const bedrooms = parseInt(formData.get("bedrooms") as string) || null;
  const bathrooms = parseFloat(formData.get("bathrooms") as string) || null;
  const monthlyRent =
    parseFloat(formData.get("monthly-rent") as string) || null;
  const status = formData.get("status") as string;
  const isFurnished = formData.get("is-furnished") === "on";
  const description = formData.get("description") as string;

  // Validate required fields
  if (!propertyId || !unitNumber || !unitType || !status) {
    return { error: "Missing required fields" };
  }

  // Insert unit into database
  const { data, error } = await supabase
    .from("property_units")
    .insert({
      property_id: propertyId,
      user_id: user.id,
      unit_number: unitNumber,
      unit_type: unitType,
      square_feet: squareFeet,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      monthly_rent: monthlyRent,
      status: status,
      is_furnished: isFurnished,
      description: description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  redirect(`/dashboard/properties/${propertyId}`);
}
