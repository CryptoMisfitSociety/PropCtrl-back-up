import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Upload, Wrench } from "lucide-react";
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
import { addMaintenanceRequest } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function AddMaintenanceRequestPage() {
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

  // Fetch tenants for the dropdown
  const { data: tenants, error: tenantsError } = await supabase
    .from("tenants")
    .select("id, first_name, last_name, property_id, unit_number")
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
                <Link href="/dashboard/maintenance" className="mr-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    New Maintenance Request
                  </h1>
                  <p className="text-gray-600">
                    Create a new maintenance request for your property
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard/maintenance">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form action={addMaintenanceRequest} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-8">
                {/* Request Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Request Information</CardTitle>
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

                    <div className="space-y-2">
                      <Label htmlFor="tenant-id">Tenant (Optional)</Label>
                      <Select name="tenant-id">
                        <SelectTrigger>
                          <SelectValue placeholder="Select tenant (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {tenants && tenants.length > 0 ? (
                            tenants.map((tenant) => (
                              <SelectItem key={tenant.id} value={tenant.id}>
                                {tenant.first_name} {tenant.last_name} - Unit{" "}
                                {tenant.unit_number}
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
                      <Label htmlFor="issue">Issue</Label>
                      <Input
                        id="issue"
                        name="issue"
                        placeholder="Brief description of the issue"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide detailed information about the maintenance issue"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select name="priority" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assignment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Information (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assigned-to">Assign To</Label>
                        <Input
                          id="assigned-to"
                          name="assigned-to"
                          placeholder="Name of contractor or maintenance person"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estimated-cost">Estimated Cost</Label>
                        <Input
                          id="estimated-cost"
                          name="estimated-cost"
                          type="number"
                          placeholder="Estimated cost of repairs"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduled-date">
                        Scheduled Date (Optional)
                      </Label>
                      <Input
                        id="scheduled-date"
                        name="scheduled-date"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photos">Photos (Optional)</Label>
                      <Input
                        id="photos"
                        name="photos"
                        type="file"
                        multiple
                        accept="image/*"
                      />
                    </div>
                    <div className="flex justify-end mt-6">
                      <SubmitButton>Create Maintenance Request</SubmitButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
