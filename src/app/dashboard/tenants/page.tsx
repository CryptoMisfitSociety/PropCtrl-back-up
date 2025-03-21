import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  Filter,
} from "lucide-react";
import Link from "next/link";
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
import { Progress } from "@/components/ui/progress";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Tenants() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for tenants
  const tenants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments",
      unit: "101",
      leaseStart: "2023-01-15",
      leaseEnd: "2024-12-31",
      rent: 1200,
      paymentStatus: "Paid",
      lastPayment: "2023-11-01",
      notes: "Has a pet cat (approved)",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      property: "Oakwood Residences",
      unit: "202",
      leaseStart: "2023-03-01",
      leaseEnd: "2024-06-30",
      rent: 1450,
      paymentStatus: "Paid",
      lastPayment: "2023-11-02",
      notes: "Requested maintenance for kitchen sink",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "(555) 456-7890",
      property: "Riverfront Condos",
      unit: "303",
      leaseStart: "2022-09-15",
      leaseEnd: "2024-09-15",
      rent: 1650,
      paymentStatus: "Late",
      lastPayment: "2023-10-10",
      notes: "Payment typically 3-5 days late",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 234-5678",
      property: "Highland Townhomes",
      unit: "404",
      leaseStart: "2023-04-01",
      leaseEnd: "2024-03-31",
      rent: 1350,
      paymentStatus: "Paid",
      lastPayment: "2023-11-01",
      notes: "Interested in renewing lease",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "dwilson@example.com",
      phone: "(555) 876-5432",
      property: "Sunset Apartments",
      unit: "105",
      leaseStart: "2023-02-15",
      leaseEnd: "2024-02-15",
      rent: 1250,
      paymentStatus: "Paid",
      lastPayment: "2023-11-01",
      notes: "Works from home, prefers maintenance visits after 5pm",
    },
  ];

  // Stats for the overview cards
  const tenantStats = {
    totalTenants: tenants.length,
    onTimePayments: tenants.filter((t) => t.paymentStatus === "Paid").length,
    latePayments: tenants.filter((t) => t.paymentStatus === "Late").length,
    upcomingRenewals: tenants.filter((t) => {
      const leaseEnd = new Date(t.leaseEnd);
      const now = new Date();
      const diffTime = leaseEnd.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 60 && diffDays > 0;
    }).length,
    totalRent: tenants.reduce((sum, tenant) => sum + tenant.rent, 0),
  };

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
                  Tenant Management
                </h1>
                <p className="text-gray-600">
                  Manage your rental property tenants in one place
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Link href="/dashboard/tenants/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Tenant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tenants
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {tenantStats.totalTenants}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tenantStats.totalTenants} tenants
                </div>
                <p className="text-xs text-gray-500">
                  Across {tenants.length} rental units
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Status
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (tenantStats.onTimePayments / tenantStats.totalTenants) *
                      100,
                  )}
                  % on time
                </div>
                <div className="mt-2">
                  <Progress
                    value={
                      (tenantStats.onTimePayments / tenantStats.totalTenants) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {tenantStats.onTimePayments} paid, {tenantStats.latePayments}{" "}
                  late
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Rental Income
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-medium">$</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${tenantStats.totalRent.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {tenantStats.totalTenants} active leases
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Renewals
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tenantStats.upcomingRenewals}
                </div>
                <p className="text-xs text-gray-500">In the next 60 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Tenant Listing */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tenant Directory</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search tenants..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>All Tenants</DropdownMenuItem>
                      <DropdownMenuItem>Paid Rent</DropdownMenuItem>
                      <DropdownMenuItem>Late Payments</DropdownMenuItem>
                      <DropdownMenuItem>Upcoming Renewals</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property / Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lease Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {tenant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {tenant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {tenant.notes}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 mb-1">
                            <Mail className="h-4 w-4 mr-1" />
                            {tenant.email}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            {tenant.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {tenant.property}
                        </div>
                        <div className="text-sm text-gray-500">
                          Unit {tenant.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(
                            tenant.leaseStart,
                          ).toLocaleDateString()} -{" "}
                          {new Date(tenant.leaseEnd).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${tenant.rent}/month
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tenant.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {tenant.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Message
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Record Rent Payment</CardTitle>
                <CardDescription>
                  Quickly record a tenant's rent payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Tenant</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Select a tenant...</option>
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name} - {tenant.property} #{tenant.unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Payment Amount
                    </label>
                    <Input type="number" placeholder="0.00" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Payment Method
                    </label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                      <option>Check</option>
                      <option>Credit Card</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dashboard/finances/record-payment"
                  className="w-full"
                >
                  <Button className="w-full">Record Payment</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send Tenant Notice</CardTitle>
                <CardDescription>
                  Send a notice to one or multiple tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Notice Type</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Rent Reminder</option>
                      <option>Maintenance Notice</option>
                      <option>Lease Renewal</option>
                      <option>Inspection Notice</option>
                      <option>Custom Message</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Recipients</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>All Tenants</option>
                      <option>Tenants with Late Payments</option>
                      <option>Tenants with Upcoming Lease Renewals</option>
                      <option>Select Individual Tenant</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      rows={3}
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/tenants/send-notice" className="w-full">
                  <Button className="w-full">Send Notice</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lease Documents</CardTitle>
                <CardDescription>
                  Access and manage tenant lease documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm">Standard Lease Agreement</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm">Move-in Checklist</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm">Rent Increase Notice</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm">Lease Renewal Template</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upload New Document
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
