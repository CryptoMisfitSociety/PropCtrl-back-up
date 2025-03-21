import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Upload, User } from "lucide-react";
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
import { addTenant } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function AddTenantPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch properties for the dropdown
  const { data: properties, error } = await supabase
    .from("properties")
    .select("id, name")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching properties:", error);
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
                <Link href="/dashboard/tenants" className="mr-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Add New Tenant
                  </h1>
                  <p className="text-gray-600">
                    Create a new tenant record for your property
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard/tenants">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form action={addTenant} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-8">
                {/* Tenant Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tenant Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          name="first-name"
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          name="last-name"
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Property & Lease Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property & Lease Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                        <Label htmlFor="unit-number">Unit Number</Label>
                        <Input
                          id="unit-number"
                          name="unit-number"
                          placeholder="Enter unit number"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lease-start">Lease Start Date</Label>
                        <Input
                          id="lease-start"
                          name="lease-start"
                          type="date"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lease-end">Lease End Date</Label>
                        <Input
                          id="lease-end"
                          name="lease-end"
                          type="date"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rent-amount">Monthly Rent</Label>
                        <Input
                          id="rent-amount"
                          name="rent-amount"
                          type="number"
                          placeholder="Enter monthly rent amount"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="security-deposit">
                          Security Deposit
                        </Label>
                        <Input
                          id="security-deposit"
                          name="security-deposit"
                          type="number"
                          placeholder="Enter security deposit amount"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Enter any additional notes about the tenant"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Lease Document */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lease Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center">
                        <User className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload Lease Document
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Upload a signed lease agreement (PDF format
                          recommended)
                        </p>
                        <Input
                          id="lease-document"
                          name="lease-document"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                        <label
                          htmlFor="lease-document"
                          className="cursor-pointer"
                        >
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
                  <Link href="/dashboard/tenants">
                    <Button variant="outline" size="lg" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <SubmitButton size="lg">Save Tenant</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
