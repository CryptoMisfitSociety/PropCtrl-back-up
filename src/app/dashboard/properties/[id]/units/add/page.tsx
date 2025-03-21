import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { addPropertyUnit } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function AddPropertyUnitPage({
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
                    Add New Unit to {property.name}
                  </h1>
                  <p className="text-gray-600">
                    Create a new unit for this property
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href={`/dashboard/properties/${propertyId}`}>
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form action={addPropertyUnit}>
              <div className="grid grid-cols-1 gap-8">
                <input type="hidden" name="property-id" value={propertyId} />

                {/* Unit Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Unit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unit-number">Unit Number</Label>
                        <Input
                          id="unit-number"
                          name="unit-number"
                          placeholder="Enter unit number"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit-type">Unit Type</Label>
                        <Select name="unit-type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Studio">Studio</SelectItem>
                            <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                            <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                            <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
                            <SelectItem value="4+ Bedroom">
                              4+ Bedroom
                            </SelectItem>
                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                            <SelectItem value="Loft">Loft</SelectItem>
                            <SelectItem value="Duplex">Duplex</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="square-feet">Square Feet</Label>
                        <Input
                          id="square-feet"
                          name="square-feet"
                          type="number"
                          placeholder="Enter square footage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          name="bedrooms"
                          type="number"
                          placeholder="Number of bedrooms"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          name="bathrooms"
                          type="number"
                          step="0.5"
                          placeholder="Number of bathrooms"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthly-rent">Monthly Rent</Label>
                        <Input
                          id="monthly-rent"
                          name="monthly-rent"
                          type="number"
                          step="0.01"
                          placeholder="Enter monthly rent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Vacant">Vacant</SelectItem>
                            <SelectItem value="Occupied">Occupied</SelectItem>
                            <SelectItem value="Maintenance">
                              Under Maintenance
                            </SelectItem>
                            <SelectItem value="Reserved">Reserved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="is-furnished" name="is-furnished" />
                      <Label
                        htmlFor="is-furnished"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This unit is furnished
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter unit description"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Link href={`/dashboard/properties/${propertyId}`}>
                    <Button variant="outline" size="lg" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <SubmitButton size="lg">Save Unit</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
