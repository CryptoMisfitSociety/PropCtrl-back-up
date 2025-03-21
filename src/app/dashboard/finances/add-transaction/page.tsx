import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Upload, DollarSign } from "lucide-react";
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
import { addTransaction } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function AddTransactionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch properties for the dropdown
  const { data: properties, error: propertiesError } = await supabase
    .from("properties")
    .select("id, name")
    .eq("user_id", user.id);

  if (propertiesError) {
    console.error("Error fetching properties:", propertiesError);
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
                    Add New Transaction
                  </h1>
                  <p className="text-gray-600">
                    Record a new financial transaction
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
            <form action={addTransaction} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-8">
                {/* Transaction Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transaction-date">Date</Label>
                        <Input
                          id="transaction-date"
                          name="transaction-date"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-type">
                          Transaction Type
                        </Label>
                        <Select name="transaction-type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Enter transaction description"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          step="0.01"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rent">Rent</SelectItem>
                            <SelectItem value="Maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="Utilities">Utilities</SelectItem>
                            <SelectItem value="Insurance">Insurance</SelectItem>
                            <SelectItem value="Taxes">Taxes</SelectItem>
                            <SelectItem value="Management">
                              Property Management
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="property-id">Property</Label>
                        <Select name="property-id" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties && properties.length > 0 ? (
                              properties.map((property) => (
                                <SelectItem
                                  key={property.id}
                                  value={property.id}
                                >
                                  {property.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                No properties available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit-number">
                          Unit Number (Optional)
                        </Label>
                        <Input
                          id="unit-number"
                          name="unit-number"
                          placeholder="Enter unit number if applicable"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select name="payment-method">
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Credit Card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="Bank Transfer">
                            Bank Transfer
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
                          Upload a receipt or invoice for this transaction
                        </p>
                        <Input
                          id="receipt"
                          name="receipt"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                        />
                        <label htmlFor="receipt" className="cursor-pointer">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <Upload className="h-4 w-4" />
                            Browse Files
                          </Button>
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
                  <SubmitButton size="lg">Save Transaction</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
