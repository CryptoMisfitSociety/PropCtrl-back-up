import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadButton } from "@/components/file-upload-button";
import { SubmitButton } from "@/components/submit-button";
import { uploadFinancialDocument } from "./actions";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function UploadFinancialDocument() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Upload Financial Document
                </h1>
                <p className="text-gray-600">
                  Upload receipts, invoices, tax documents, and other financial
                  records
                </p>
              </div>
              <div>
                <Link href="/dashboard/finances">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Finances
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upload Financial Document</CardTitle>
                <CardDescription>
                  Upload financial documents for your records and tax purposes
                </CardDescription>
              </CardHeader>
              <form action={uploadFinancialDocument}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="file">Document File</Label>
                    <div className="flex items-center gap-4">
                      <FileUploadButton inputId="file" />
                      <span className="text-sm text-gray-500">
                        PDF, JPG, PNG or Excel files up to 10MB
                      </span>
                    </div>
                    <Input
                      type="file"
                      id="file"
                      name="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.csv"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Document Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Receipt">Receipt</option>
                      <option value="Invoice">Invoice</option>
                      <option value="Tax Document">Tax Document</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Utility Bill">Utility Bill</option>
                      <option value="Maintenance Receipt">
                        Maintenance Receipt
                      </option>
                      <option value="Property Tax">Property Tax</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter a description for this document"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton className="w-full">
                    Upload Document
                  </SubmitButton>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
