import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../supabase/server";
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
import { SubmitButton } from "@/components/submit-button";
import { SubscriptionCheck } from "@/components/subscription-check";
import Link from "next/link";
import { addMaintenanceSchedule } from "./actions";

export default async function AddMaintenanceSchedule() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch properties for dropdown
  const { data: properties } = await supabase
    .from("properties")
    .select("id, name")
    .eq("user_id", user.id);

  // Fetch vendors for dropdown
  const { data: vendors } = await supabase
    .from("maintenance_vendors")
    .select("id, name, specialty")
    .eq("user_id", user.id);

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
                  Add Preventive Maintenance Schedule
                </h1>
                <p className="text-gray-600">
                  Schedule regular maintenance tasks for your properties
                </p>
              </div>
              <div>
                <Link href="/dashboard/maintenance?tab=preventive">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Maintenance Schedule Details</CardTitle>
              <CardDescription>
                Set up a recurring maintenance task or inspection
              </CardDescription>
            </CardHeader>
            <form action={addMaintenanceSchedule}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Maintenance Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. HVAC Filter Replacement"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detailed description of the maintenance task"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-id">Property (Optional)</Label>
                  <select
                    id="property-id"
                    name="property-id"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">All Properties</option>
                    {properties?.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500">
                    Leave blank to apply to all properties
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-date">First Scheduled Date</Label>
                    <Input
                      id="scheduled-date"
                      name="scheduled-date"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <select
                      id="frequency"
                      name="frequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select frequency</option>
                      <option value="One-time">One-time</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Bi-annually">Bi-annually</option>
                      <option value="Annually">Annually</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <select
                      id="priority"
                      name="priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimated-cost">Estimated Cost ($)</Label>
                    <Input
                      id="estimated-cost"
                      name="estimated-cost"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendor-id">Assign Vendor (Optional)</Label>
                  <select
                    id="vendor-id"
                    name="vendor-id"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a vendor (optional)</option>
                    {vendors?.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name} - {vendor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional information or instructions"
                    rows={3}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Link href="/dashboard/maintenance?tab=preventive">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <SubmitButton>Create Schedule</SubmitButton>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
