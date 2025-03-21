import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import {
  Building2,
  Users,
  Wallet,
  ClipboardCheck,
  ArrowUpRight,
  Plus,
  Filter,
  Search,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SubscriptionCheck } from "@/components/subscription-check";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for the dashboard
  const propertyStats = {
    totalProperties: 12,
    occupiedUnits: 10,
    vacantUnits: 2,
    occupancyRate: 83,
    totalRevenue: 24500,
    pendingMaintenance: 3,
  };

  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, Anytown",
      units: 6,
      occupancyRate: 100,
      revenue: 8500,
    },
    {
      id: 2,
      name: "Oakwood Residences",
      address: "456 Oak Ave, Somewhere",
      units: 4,
      occupancyRate: 75,
      revenue: 6000,
    },
    {
      id: 3,
      name: "Riverfront Condos",
      address: "789 River Rd, Elsewhere",
      units: 8,
      occupancyRate: 88,
      revenue: 10000,
    },
    {
      id: 4,
      name: "Highland Townhomes",
      address: "101 Highland Dr, Nowhere",
      units: 4,
      occupancyRate: 50,
      revenue: 4000,
    },
  ];

  const tenants = [
    {
      id: 1,
      name: "John Smith",
      property: "Sunset Apartments",
      unit: "101",
      leaseEnd: "2024-12-31",
      paymentStatus: "Paid",
      lastPayment: "2023-11-01",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      property: "Oakwood Residences",
      unit: "202",
      leaseEnd: "2024-06-30",
      paymentStatus: "Paid",
      lastPayment: "2023-11-02",
    },
    {
      id: 3,
      name: "Michael Brown",
      property: "Riverfront Condos",
      unit: "303",
      leaseEnd: "2024-09-15",
      paymentStatus: "Late",
      lastPayment: "2023-10-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      property: "Highland Townhomes",
      unit: "404",
      leaseEnd: "2024-03-31",
      paymentStatus: "Paid",
      lastPayment: "2023-11-01",
    },
  ];

  const maintenanceRequests = [
    {
      id: 1,
      property: "Sunset Apartments",
      unit: "103",
      issue: "Leaking faucet",
      priority: "Medium",
      status: "In Progress",
      date: "2023-10-28",
    },
    {
      id: 2,
      property: "Oakwood Residences",
      unit: "201",
      issue: "HVAC not working",
      priority: "High",
      status: "Pending",
      date: "2023-11-01",
    },
    {
      id: 3,
      property: "Riverfront Condos",
      unit: "305",
      issue: "Broken window",
      priority: "Medium",
      status: "Scheduled",
      date: "2023-10-30",
    },
  ];

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
                  Property Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {user.email}</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Link href="/dashboard/properties/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Property
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
                  Total Properties
                </CardTitle>
                <Building2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {propertyStats.totalProperties}
                </div>
                <p className="text-xs text-gray-500">
                  Across {properties.reduce((acc, prop) => acc + prop.units, 0)}{" "}
                  units
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Occupancy Rate
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {propertyStats.occupancyRate}%
                </div>
                <div className="mt-2">
                  <Progress
                    value={propertyStats.occupancyRate}
                    className="h-2"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {propertyStats.occupiedUnits} occupied,{" "}
                  {propertyStats.vacantUnits} vacant
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <Wallet className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${propertyStats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance Requests
                </CardTitle>
                <ClipboardCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {propertyStats.pendingMaintenance}
                </div>
                <p className="text-xs text-gray-500">2 high priority</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="finances">Finances</TabsTrigger>
            </TabsList>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Property Listing</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search properties..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Link href="/dashboard/properties/add">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Units
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Occupancy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {property.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {property.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {property.units}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2 text-gray-700">
                                {property.occupancyRate}%
                              </span>
                              <Progress
                                value={property.occupancyRate}
                                className="h-2 w-20"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            ${property.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Tenants Tab */}
            <TabsContent value="tenants" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tenant Management</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search tenants..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tenant
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tenant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lease Ends
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Payment
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
                            <div className="font-medium text-gray-900">
                              {tenant.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {tenant.property}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {tenant.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {tenant.leaseEnd}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tenant.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {tenant.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {tenant.lastPayment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Maintenance Requests</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {maintenanceRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {request.property}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {request.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {request.issue}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.priority === "High" ? "bg-red-100 text-red-800" : request.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : request.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {request.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Finances Tab */}
            <TabsContent value="finances" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Financial Summary</h2>
                <div className="flex items-center gap-4">
                  <Button variant="outline">Last 30 Days</Button>
                  <Button variant="outline">Export Report</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Income</CardTitle>
                    <CardDescription>November 2023</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-3xl font-bold">
                      ${propertyStats.totalRevenue.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      5% from last month
                    </p>
                    <div className="h-[200px] w-full mt-4 bg-gray-100 rounded-md flex items-end justify-between p-2">
                      {[65, 45, 75, 55, 60, 80, 70, 45, 60, 75, 85, 90].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="w-4 bg-blue-600 rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                        ),
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500">
                    Showing data for all properties
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expenses</CardTitle>
                    <CardDescription>November 2023</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-3xl font-bold">$8,750</div>
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12% from last month
                    </p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Maintenance</span>
                          <span>$3,200</span>
                        </div>
                        <Progress value={36} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Utilities</span>
                          <span>$2,800</span>
                        </div>
                        <Progress value={32} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Insurance</span>
                          <span>$1,500</span>
                        </div>
                        <Progress value={17} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Property Tax</span>
                          <span>$1,250</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500">
                    Showing data for all properties
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow</CardTitle>
                    <CardDescription>November 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      $15,750
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Net income after expenses
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Sunset Apartments</span>
                          <span className="text-green-600 font-medium">
                            $6,200
                          </span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            Oakwood Residences
                          </span>
                          <span className="text-green-600 font-medium">
                            $4,100
                          </span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Riverfront Condos</span>
                          <span className="text-green-600 font-medium">
                            $5,450
                          </span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
