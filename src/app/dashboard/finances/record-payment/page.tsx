import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, DollarSign } from "lucide-react";
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
import { recordRentPayment } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { FileUploadButton } from "@/components/file-upload-button";

export default async function RecordPaymentPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch tenants for the dropdown
  const { data: tenants, error: tenantsError } = await supabase
    .from("tenants")
    .select(
      "id, first_name, last_name, property_id, unit_number, rent_amount, properties(name)",
    )
    .eq("user_id", user.id);

  if (tenantsError) {
    console.error("Error fetching tenants:", tenantsError);
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
                <Link href="/dashboard/finances" className="mr-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Record Rent Payment
                  </h1>
                  <p className="text-gray-600">
                    Record a tenant's rent payment
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard/finances">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form action={recordRentPayment} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-8">
                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenant-id">Select Tenant</Label>
                      <Select name="tenant-id" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tenant" />
                        </SelectTrigger>
                        <SelectContent>
                          {tenants && tenants.length > 0 ? (
                            tenants.map((tenant) => (
                              <SelectItem key={tenant.id} value={tenant.id}>
                                {tenant.first_name} {tenant.last_name} -{" "}
                                {tenant.properties?.name} #{tenant.unit_number}{" "}
                                (${tenant.rent_amount}/month)
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              No tenants available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Payment Amount</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter payment amount"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-date">Payment Date</Label>
                      <Input
                        id="payment-date"
                        name="payment-date"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select name="payment-method" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bank Transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Credit Card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="Debit Card">Debit Card</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                          <SelectItem value="Venmo">Venmo</SelectItem>
                          <SelectItem value="Zelle">Zelle</SelectItem>
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
                  </CardContent>
                </Card>

                {/* Receipt Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Receipt (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center">
                        <DollarSign className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload Receipt
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Upload a receipt or proof of payment (optional)
                        </p>
                        <Input
                          id="receipt"
                          name="receipt"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                        />
                        <label htmlFor="receipt">
                          <FileUploadButton inputId="receipt" />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Link href="/dashboard/finances">
                    <Button variant="outline" size="lg" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <SubmitButton size="lg">Record Payment</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
