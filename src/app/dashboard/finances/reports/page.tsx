import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  ArrowLeft,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateFinancialReport } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function FinancialReportsPage() {
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

  // Fetch existing reports
  const { data: reports, error: reportsError } = await supabase
    .from("financial_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (reportsError) {
    console.error("Error fetching reports:", reportsError);
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
                    Financial Reports
                  </h1>
                  <p className="text-gray-600">
                    Generate and manage financial reports for your properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate Report</TabsTrigger>
              <TabsTrigger value="history">Report History</TabsTrigger>
            </TabsList>

            {/* Generate Report Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <form action={generateFinancialReport}>
                  <div className="grid grid-cols-1 gap-8">
                    {/* Report Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Report Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="report-name">Report Name</Label>
                          <Input
                            id="report-name"
                            name="report-name"
                            placeholder="Enter a name for this report"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="report-type">Report Type</Label>
                          <Select name="report-type" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Income Statement">
                                Income Statement
                              </SelectItem>
                              <SelectItem value="Cash Flow">
                                Cash Flow Analysis
                              </SelectItem>
                              <SelectItem value="Balance Sheet">
                                Balance Sheet
                              </SelectItem>
                              <SelectItem value="Tax Summary">
                                Tax Summary
                              </SelectItem>
                              <SelectItem value="Expense Report">
                                Expense Report
                              </SelectItem>
                              <SelectItem value="Rent Roll">
                                Rent Roll
                              </SelectItem>
                              <SelectItem value="Profit and Loss">
                                Profit and Loss
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <Input
                              id="end-date"
                              name="end-date"
                              type="date"
                              required
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Property Selection */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Selection</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Properties</Label>
                          <RadioGroup
                            defaultValue="all"
                            name="property-selection"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="all-properties" />
                              <Label htmlFor="all-properties">
                                All Properties
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="select"
                                id="select-properties"
                              />
                              <Label htmlFor="select-properties">
                                Select Specific Properties
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {properties && properties.length > 0 && (
                          <div className="space-y-2 border rounded-md p-4">
                            <Label className="mb-2 block">
                              Select Properties
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                              {properties.map((property) => (
                                <div
                                  key={property.id}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`property-${property.id}`}
                                    name="selected-properties"
                                    value={property.id}
                                  />
                                  <Label
                                    htmlFor={`property-${property.id}`}
                                    className="text-sm"
                                  >
                                    {property.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Report Format */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Report Format</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          defaultValue="PDF"
                          name="format"
                          className="grid grid-cols-3 gap-4"
                        >
                          <div className="flex flex-col items-center space-y-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                            <RadioGroupItem
                              value="PDF"
                              id="pdf-format"
                              className="sr-only"
                            />
                            <FileText className="h-8 w-8 text-red-500" />
                            <Label
                              htmlFor="pdf-format"
                              className="cursor-pointer"
                            >
                              PDF
                            </Label>
                          </div>
                          <div className="flex flex-col items-center space-y-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                            <RadioGroupItem
                              value="Excel"
                              id="excel-format"
                              className="sr-only"
                            />
                            <FileText className="h-8 w-8 text-green-500" />
                            <Label
                              htmlFor="excel-format"
                              className="cursor-pointer"
                            >
                              Excel
                            </Label>
                          </div>
                          <div className="flex flex-col items-center space-y-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                            <RadioGroupItem
                              value="CSV"
                              id="csv-format"
                              className="sr-only"
                            />
                            <FileText className="h-8 w-8 text-blue-500" />
                            <Label
                              htmlFor="csv-format"
                              className="cursor-pointer"
                            >
                              CSV
                            </Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <SubmitButton size="lg">Generate Report</SubmitButton>
                    </div>
                  </div>
                </form>
              </div>
            </TabsContent>

            {/* Report History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Generated Reports</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              {reports && reports.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Report Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Format
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">
                                {report.report_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {report.report_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {new Date(report.start_date).toLocaleDateString()}{" "}
                              - {new Date(report.end_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {report.format}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {new Date(report.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Reports Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    You haven't generated any financial reports yet.
                  </p>
                  <Button
                    onClick={() =>
                      document.querySelector('[data-value="generate"]')?.click()
                    }
                  >
                    Generate Your First Report
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
