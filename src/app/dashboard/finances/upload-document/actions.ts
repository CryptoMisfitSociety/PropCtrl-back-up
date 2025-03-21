"use server";

import { createClient } from "../../../../../supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadFinancialDocument(
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, message: "Not authenticated" };
    }

    const file = formData.get("file") as File;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!file || !description || !category) {
      return { success: false, message: "Missing required fields" };
    }

    // Upload file to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data: fileData, error: uploadError } = await supabase.storage
      .from("financial_documents")
      .upload(`${user.id}/${fileName}`, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { success: false, message: "Error uploading file" };
    }

    // Get the public URL
    const { data: urlData } = await supabase.storage
      .from("financial_documents")
      .getPublicUrl(`${user.id}/${fileName}`);

    // Save document metadata to database
    const { error: dbError } = await supabase
      .from("financial_documents")
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_path: fileData?.path,
        file_url: urlData?.publicUrl,
        description,
        category,
        file_size: file.size,
        file_type: file.type,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return { success: false, message: "Error saving document metadata" };
    }

    revalidatePath("/dashboard/finances");
    return { success: true, message: "Document uploaded successfully" };
  } catch (error) {
    console.error("Upload document error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
