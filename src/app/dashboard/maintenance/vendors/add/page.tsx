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
import { addVendor } from "./actions";

export default async function AddVendor() {
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
                  Add Maintenance Vendor
                </h1>
                <p className="text-gray-600">
                  Add a new contractor or service provider for maintenance
                </p>
              </div>
              <div>
                <Link href="/dashboard/maintenance?tab=vendors">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
              <CardDescription>
                Enter the details of the maintenance vendor or contractor
              </CardDescription>
            </CardHeader>
            <form action={addVendor}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Vendor Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Company or individual name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    placeholder="e.g. Plumbing, HVAC, Electrical"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="contact@vendor.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Business address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional information about this vendor"
                    rows={3}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Link href="/dashboard/maintenance?tab=vendors">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <SubmitButton>Add Vendor</SubmitButton>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
