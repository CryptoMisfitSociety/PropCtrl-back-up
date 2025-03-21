"use server";

import { createClient } from "../../../../../supabase/server";

export async function exportFinancialData(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const reportType = formData.get("report-type") as string;
  const startDate = formData.get("start-date") as string;
  const endDate = formData.get("end-date") as string;
  const propertyId = formData.get("property-id") as string;
  const format = formData.get("format") as string;

  // Validate required fields
  if (!reportType || !startDate || !endDate || !format) {
    return { error: "Missing required fields" };
  }

  // Create a record of the export in the database
  const { data, error } = await supabase
    .from("financial_exports")
    .insert({
      user_id: user.id,
      report_type: reportType,
      start_date: startDate,
      end_date: endDate,
      property_id: propertyId || null,
      format,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // In a real application, we would generate the actual export file here
  // and return a download URL or trigger a download

  // For this demo, we'll just return success
  return {
    success: true,
    message: `${reportType} report has been generated in ${format.toUpperCase()} format.`,
    downloadUrl: `/api/financial-exports/${data[0].id}`,
  };
}
