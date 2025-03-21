import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Building2, Upload } from "lucide-react";
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
import { addProperty } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { FileUploadButton } from "@/components/file-upload-button";

export default async function AddPropertyPage() {
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
              <div className="flex items-center">
                <Link href="/dashboard/properties" className="mr-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Add New Property
                  </h1>
                  <p className="text-gray-600">
                    Create a new property in your portfolio
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard/properties">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form action={addProperty} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="property-name">Property Name</Label>
                        <Input
                          id="property-name"
                          name="property-name"
                          placeholder="Enter property name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select name="property-type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">
                              Apartment Complex
                            </SelectItem>
                            <SelectItem value="townhome">Townhomes</SelectItem>
                            <SelectItem value="condo">Condominiums</SelectItem>
                            <SelectItem value="single-family">
                              Single Family Homes
                            </SelectItem>
                            <SelectItem value="mixed-use">Mixed Use</SelectItem>
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="property-address">Address</Label>
                      <Input
                        id="property-address"
                        name="property-address"
                        placeholder="Street address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="property-city">City</Label>
                        <Input
                          id="property-city"
                          name="property-city"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="property-state">State</Label>
                        <Input
                          id="property-state"
                          name="property-state"
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="property-zip">ZIP Code</Label>
                        <Input
                          id="property-zip"
                          name="property-zip"
                          placeholder="ZIP Code"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="property-description">Description</Label>
                      <Textarea
                        id="property-description"
                        name="property-description"
                        placeholder="Enter property description"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Property Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year-built">Year Built</Label>
                        <Input
                          id="year-built"
                          name="year-built"
                          type="number"
                          placeholder="Year built"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-renovation">Last Renovation</Label>
                        <Input
                          id="last-renovation"
                          name="last-renovation"
                          type="number"
                          placeholder="Year of last renovation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total-units">Total Units</Label>
                        <Input
                          id="total-units"
                          name="total-units"
                          type="number"
                          placeholder="Number of units"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="total-area">Total Area (sq ft)</Label>
                        <Input
                          id="total-area"
                          name="total-area"
                          type="number"
                          placeholder="Total area in square feet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lot-size">Lot Size (acres)</Label>
                        <Input
                          id="lot-size"
                          name="lot-size"
                          type="number"
                          step="0.01"
                          placeholder="Lot size in acres"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="purchase-price">Purchase Price</Label>
                        <Input
                          id="purchase-price"
                          name="purchase-price"
                          type="number"
                          placeholder="Purchase price"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchase-date">Purchase Date</Label>
                        <Input
                          id="purchase-date"
                          name="purchase-date"
                          type="date"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-value">Current Value</Label>
                        <Input
                          id="current-value"
                          name="current-value"
                          type="number"
                          placeholder="Current property value"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthly-expenses">
                          Monthly Expenses
                        </Label>
                        <Input
                          id="monthly-expenses"
                          name="monthly-expenses"
                          type="number"
                          placeholder="Estimated monthly expenses"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center">
                        <Building2 className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload Property Images
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Drag and drop images here, or click to browse
                        </p>
                        <Input
                          id="property-image"
                          name="property-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                        <label htmlFor="property-image">
                          <FileUploadButton inputId="property-image" />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Link href="/dashboard/properties">
                    <Button variant="outline" size="lg" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <SubmitButton size="lg">Save Property</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
