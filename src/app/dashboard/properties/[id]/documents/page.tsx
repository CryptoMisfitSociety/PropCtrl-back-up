import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Upload, FileText, Download } from "lucide-react";
import { DeleteDocumentButton } from "@/components/delete-document-button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadPropertyDocument } from "./actions";
import SubmitButton from "@/components/submit-button";

export default async function PropertyDocumentsPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyId = params.id;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch property details
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .eq("user_id", user.id)
    .single();

  if (propertyError || !property) {
    return redirect("/dashboard/properties");
  }

  // Fetch property documents
  const { data: documents, error: documentsError } = await supabase
    .from("property_documents")
    .select("*")
    .eq("property_id", propertyId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (documentsError) {
    console.error("Error fetching documents:", documentsError);
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <div
        className="min-h-screen bg-gray-50 transition-all duration-300"
        style={{ marginLeft: "256px" }}
        id="dashboard-content"
      >
        {/* Dashboard Header */}
        <header className="bg-white border-b border-gray-200 py-6 mt-16 sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link
                  href={`/dashboard/properties/${propertyId}`}
                  className="mr-4"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {property.name} - Documents
                  </h1>
                  <p className="text-gray-600">
                    Manage documents for this property
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Document Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    action={uploadPropertyDocument}
                    encType="multipart/form-data"
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      name="property-id"
                      value={propertyId}
                    />

                    <div className="space-y-2">
                      <Label htmlFor="document-name">Document Name</Label>
                      <Input
                        id="document-name"
                        name="document-name"
                        placeholder="Enter document name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <Select name="document-type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lease">Lease Agreement</SelectItem>
                          <SelectItem value="Deed">Property Deed</SelectItem>
                          <SelectItem value="Insurance">
                            Insurance Policy
                          </SelectItem>
                          <SelectItem value="Tax">Tax Documents</SelectItem>
                          <SelectItem value="Inspection">
                            Inspection Reports
                          </SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance Records
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Enter any additional notes"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document-file">Document File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Input
                          id="document-file"
                          name="document-file"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="document-file"
                          className="cursor-pointer"
                        >
                          <div className="mx-auto flex flex-col items-center">
                            <FileText className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <SubmitButton className="w-full mt-4">
                      Upload Document
                    </SubmitButton>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Property Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents && documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-4">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {document.document_name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {document.document_type} •{" "}
                                {new Date(
                                  document.created_at,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {document.document_url && (
                              <a
                                href={document.document_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </a>
                            )}
                            <DeleteDocumentButton
                              documentId={document.id}
                              propertyId={propertyId}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Documents Found
                      </h3>
                      <p className="text-gray-500 mb-4 max-w-md mx-auto">
                        You haven't uploaded any documents for this property
                        yet. Use the form to upload your first document.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
