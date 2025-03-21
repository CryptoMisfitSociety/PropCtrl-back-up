"use server";

import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";

export async function uploadPropertyDocument(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
  const propertyId = formData.get("property-id") as string;
  const documentName = formData.get("document-name") as string;
  const documentType = formData.get("document-type") as string;
  const notes = (formData.get("notes") as string) || null;

  // Validate required fields
  if (!propertyId || !documentName || !documentType) {
    return { error: "Missing required fields" };
  }

  // Create document record in database
  const { data, error } = await supabase
    .from("property_documents")
    .insert({
      user_id: user.id,
      property_id: propertyId,
      document_name: documentName,
      document_type: documentType,
      notes,
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  // Handle document file upload
  const documentFile = formData.get("document-file") as File;
  if (documentFile && documentFile.size > 0) {
    const fileExt = documentFile.name.split(".").pop();
    const fileName = `${user.id}/${propertyId}/${data[0].id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("property-documents")
      .upload(fileName, documentFile);

    if (!uploadError) {
      // Update document with file URL
      const { data: publicUrlData } = supabase.storage
        .from("property-documents")
        .getPublicUrl(fileName);

      await supabase
        .from("property_documents")
        .update({ document_url: publicUrlData.publicUrl })
        .eq("id", data[0].id);
    } else {
      return { error: uploadError.message };
    }
  }

  redirect(`/dashboard/properties/${propertyId}`);
}
