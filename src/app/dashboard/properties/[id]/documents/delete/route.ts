import { createClient } from "../../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get document ID from the URL
  const searchParams = request.nextUrl.searchParams;
  const documentId = searchParams.get("id");

  if (!documentId) {
    return NextResponse.json(
      { error: "Document ID is required" },
      { status: 400 },
    );
  }

  // Get the document to check ownership and get file path
  const { data: document, error: fetchError } = await supabase
    .from("property_documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !document) {
    return NextResponse.json(
      { error: "Document not found or you don't have permission to delete it" },
      { status: 404 },
    );
  }

  // Delete the document record from the database
  const { error: deleteError } = await supabase
    .from("property_documents")
    .delete()
    .eq("id", documentId);

  if (deleteError) {
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 },
    );
  }

  // If there's a document URL, extract the file path and delete from storage
  if (document.document_url) {
    try {
      // Extract the file path from the URL
      // This assumes the URL format from Supabase storage
      const url = new URL(document.document_url);
      const pathParts = url.pathname.split("/");
      const bucketName = "property-documents";

      // The path should be everything after the bucket name in the URL
      const bucketIndex = pathParts.findIndex((part) => part === bucketName);
      if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
        const filePath = pathParts.slice(bucketIndex + 1).join("/");

        // Delete the file from storage
        const { error: storageError } = await supabase.storage
          .from(bucketName)
          .remove([filePath]);

        if (storageError) {
          console.error("Error deleting file from storage:", storageError);
          // We'll continue even if file deletion fails
        }
      }
    } catch (error) {
      console.error("Error parsing document URL:", error);
      // Continue even if we can't delete the file
    }
  }

  return NextResponse.json({ success: true });
}
