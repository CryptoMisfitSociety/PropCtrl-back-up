import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCheck } from "@/components/subscription-check";
import { ArrowLeft, Mail } from "lucide-react";
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
import { sendTenantNotice } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function SendTenantNoticePage() {
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
    .select("id, first_name, last_name, property_id, unit_number, email")
    .eq("user_id", user.id);

  if (tenantsError) {
    console.error("Error fetching tenants:", tenantsError);
  }

  // Fetch properties to display property names
  const { data: properties, error: propertiesError } = await supabase
    .from("properties")
    .select("id, name")
    .eq("user_id", user.id);

  if (propertiesError) {
    console.error("Error fetching properties:", propertiesError);
  }

  // Create a map of property IDs to names for easy lookup
  const propertyMap = properties
    ? properties.reduce(
        (map, property) => {
          map[property.id] = property.name;
          return map;
        },
        {} as Record<string, string>,
      )
    : {};

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
                    Send Tenant Notice
                  </h1>
                  <p className="text-gray-600">
                    Send a notice to one or multiple tenants
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
            <form action={sendTenantNotice}>
              <div className="grid grid-cols-1 gap-8">
                {/* Notice Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notice Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-type">Notice Type</Label>
                      <Select name="notice-type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notice type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rent Reminder">
                            Rent Reminder
                          </SelectItem>
                          <SelectItem value="Maintenance Notice">
                            Maintenance Notice
                          </SelectItem>
                          <SelectItem value="Lease Renewal">
                            Lease Renewal
                          </SelectItem>
                          <SelectItem value="Inspection Notice">
                            Inspection Notice
                          </SelectItem>
                          <SelectItem value="Policy Update">
                            Policy Update
                          </SelectItem>
                          <SelectItem value="Custom Message">
                            Custom Message
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Enter notice subject"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message here..."
                        rows={6}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Recipients */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recipients</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipients">Send To</Label>
                      <Select name="recipients" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipients" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-tenants">
                            All Tenants
                          </SelectItem>
                          <SelectItem value="late-payments">
                            Tenants with Late Payments
                          </SelectItem>
                          <SelectItem value="upcoming-renewals">
                            Tenants with Upcoming Lease Renewals
                          </SelectItem>
                          <SelectItem value="select-tenants">
                            Select Individual Tenants
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {tenants && tenants.length > 0 && (
                      <div className="space-y-2 border rounded-md p-4">
                        <Label className="mb-2 block">
                          Select Individual Tenants
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                          {tenants.map((tenant) => (
                            <div
                              key={tenant.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`tenant-${tenant.id}`}
                                name="selected-tenants"
                                value={tenant.id}
                              />
                              <Label
                                htmlFor={`tenant-${tenant.id}`}
                                className="text-sm"
                              >
                                {tenant.first_name} {tenant.last_name} -{" "}
                                {propertyMap[tenant.property_id] ||
                                  "Unknown Property"}{" "}
                                #{tenant.unit_number}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Link href="/dashboard/tenants">
                    <Button variant="outline" size="lg" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <SubmitButton size="lg">Send Notice</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
