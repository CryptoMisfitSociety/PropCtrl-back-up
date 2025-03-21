"use server";

import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function generateFinancialReport(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const reportName = formData.get("report-name") as string;
  const reportType = formData.get("report-type") as string;
  const startDate = formData.get("start-date") as string;
  const endDate = formData.get("end-date") as string;
  const format = formData.get("format") as string;

  // Handle property selection
  const propertySelection = formData.get("property-selection") as string;
  let properties: string[] = [];

  if (propertySelection === "all") {
    // Get all property IDs for this user
    const { data: allProperties } = await supabase
      .from("properties")
      .select("id")
      .eq("user_id", user.id);

    if (allProperties) {
      properties = allProperties.map((p) => p.id);
    }
  } else if (propertySelection === "select") {
    properties = formData.getAll("selected-properties") as string[];
  }

  // Validate required fields
  if (
    !reportName ||
    !reportType ||
    !startDate ||
    !endDate ||
    !format ||
    properties.length === 0
  ) {
    return { error: "Missing required fields" };
  }

  // In a real application, you would generate the actual report here
  // For now, we'll just create a record in the database

  // Generate a mock report URL
  const reportUrl = `/reports/${reportType.toLowerCase().replace(/ /g, "-")}-${new Date().getTime()}.${format.toLowerCase()}`;

  // Insert report record into database
  const { data, error } = await supabase
    .from("financial_reports")
    .insert({
      user_id: user.id,
      report_name: reportName,
      report_type: reportType,
      start_date: startDate,
      end_date: endDate,
      properties: properties,
      format: format,
      report_url: reportUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard/finances/reports");
}
