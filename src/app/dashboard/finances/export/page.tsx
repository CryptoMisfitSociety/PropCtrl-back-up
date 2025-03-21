import DashboardNavbar from "@/components/dashboard-navbar";
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
import { SubmitButton } from "@/components/submit-button";
import { SubscriptionCheck } from "@/components/subscription-check";
import Link from "next/link";
import { exportFinancialData } from "./actions";

export default async function ExportFinancialData() {
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
                  Export Financial Data
                </h1>
                <p className="text-gray-600">
                  Generate and download financial reports
                </p>
              </div>
              <div>
                <Link href="/dashboard/finances">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Select the type of report and date range to export
              </CardDescription>
            </CardHeader>
            <form action={exportFinancialData}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <select
                    id="report-type"
                    name="report-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select report type</option>
                    <option value="Income Statement">Income Statement</option>
                    <option value="Cash Flow">Cash Flow</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Tax Summary">Tax Summary</option>
                    <option value="Expense Report">Expense Report</option>
                    <option value="Rent Roll">Rent Roll</option>
                    <option value="Transaction History">
                      Transaction History
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      name="start-date"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" name="end-date" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-id">Property</Label>
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
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="pdf"
                        name="format"
                        type="radio"
                        value="pdf"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="pdf"
                        className="ml-2 text-sm text-gray-700"
                      >
                        PDF
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="excel"
                        name="format"
                        type="radio"
                        value="excel"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="excel"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Excel
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="csv"
                        name="format"
                        type="radio"
                        value="csv"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="csv"
                        className="ml-2 text-sm text-gray-700"
                      >
                        CSV
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Link href="/dashboard/finances">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <SubmitButton>Generate Export</SubmitButton>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
