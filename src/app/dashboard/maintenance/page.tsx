import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import {
  Plus,
  Search,
  Filter,
  Wrench,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Building2,
  User,
  FileText,
  MessageSquare,
  Phone,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Maintenance() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for maintenance requests
  const maintenanceRequests = [
    {
      id: 1,
      property: "Sunset Apartments",
      unit: "103",
      tenant: "Robert Johnson",
      issue: "Leaking faucet in kitchen sink",
      description:
        "The kitchen sink faucet has been dripping constantly for the past two days. Water is accumulating in the cabinet below.",
      priority: "Medium",
      status: "In Progress",
      date: "2023-10-28",
      assignedTo: "Mike's Plumbing",
      estimatedCost: 150,
      scheduledDate: "2023-11-10",
      photos: 2,
      comments: 3,
    },
    {
      id: 2,
      property: "Oakwood Residences",
      unit: "201",
      tenant: "Sarah Johnson",
      issue: "HVAC not working properly",
      description:
        "The heating system is not working correctly. The apartment is very cold despite setting the thermostat to 75 degrees.",
      priority: "High",
      status: "Pending",
      date: "2023-11-01",
      assignedTo: "Unassigned",
      estimatedCost: 350,
      scheduledDate: null,
      photos: 1,
      comments: 2,
    },
    {
      id: 3,
      property: "Riverfront Condos",
      unit: "305",
      tenant: "Michael Brown",
      issue: "Broken window in living room",
      description:
        "The window in the living room has a crack across the bottom pane. It doesn't appear to be letting air in but should be replaced soon.",
      priority: "Medium",
      status: "Scheduled",
      date: "2023-10-30",
      assignedTo: "City Glass Services",
      estimatedCost: 275,
      scheduledDate: "2023-11-15",
      photos: 3,
      comments: 1,
    },
    {
      id: 4,
      property: "Highland Townhomes",
      unit: "404",
      tenant: "Emily Davis",
      issue: "Dishwasher not draining",
      description:
        "The dishwasher isn't draining properly after cycles. Water remains at the bottom and has a bad smell.",
      priority: "Low",
      status: "Completed",
      date: "2023-10-25",
      assignedTo: "Appliance Repair Co.",
      estimatedCost: 125,
      scheduledDate: "2023-11-02",
      photos: 0,
      comments: 4,
    },
    {
      id: 5,
      property: "Sunset Apartments",
      unit: "105",
      tenant: "David Wilson",
      issue: "Bathroom ceiling leak",
      description:
        "There's a water stain on the bathroom ceiling that appears to be growing. Possibly a leak from the unit above.",
      priority: "High",
      status: "Pending",
      date: "2023-11-03",
      assignedTo: "Unassigned",
      estimatedCost: 400,
      scheduledDate: null,
      photos: 2,
      comments: 1,
    },
  ];

  // Maintenance vendors
  const vendors = [
    {
      id: 1,
      name: "Mike's Plumbing",
      specialty: "Plumbing",
      phone: "(555) 123-4567",
      email: "mike@mikesplumbing.com",
      rating: 4.8,
      jobsCompleted: 12,
    },
    {
      id: 2,
      name: "City Glass Services",
      specialty: "Windows & Glass",
      phone: "(555) 987-6543",
      email: "info@cityglass.com",
      rating: 4.5,
      jobsCompleted: 8,
    },
    {
      id: 3,
      name: "Appliance Repair Co.",
      specialty: "Appliances",
      phone: "(555) 456-7890",
      email: "service@appliancerepair.com",
      rating: 4.7,
      jobsCompleted: 15,
    },
    {
      id: 4,
      name: "Elite HVAC Solutions",
      specialty: "Heating & Cooling",
      phone: "(555) 234-5678",
      email: "support@elitehvac.com",
      rating: 4.9,
      jobsCompleted: 20,
    },
    {
      id: 5,
      name: "Handyman Heroes",
      specialty: "General Repairs",
      phone: "(555) 876-5432",
      email: "jobs@handymanheroes.com",
      rating: 4.6,
      jobsCompleted: 35,
    },
  ];

  // Calculate maintenance stats
  const maintenanceStats = {
    total: maintenanceRequests.length,
    pending: maintenanceRequests.filter((r) => r.status === "Pending").length,
    inProgress: maintenanceRequests.filter((r) => r.status === "In Progress")
      .length,
    scheduled: maintenanceRequests.filter((r) => r.status === "Scheduled")
      .length,
    completed: maintenanceRequests.filter((r) => r.status === "Completed")
      .length,
    highPriority: maintenanceRequests.filter((r) => r.priority === "High")
      .length,
    estimatedCosts: maintenanceRequests.reduce(
      (sum, r) => sum + r.estimatedCost,
      0,
    ),
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
                  Maintenance Management
                </h1>
                <p className="text-gray-600">
                  Track and manage repairs for your rental properties
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Link href="/dashboard/maintenance/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Request
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
                  Open Requests
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {maintenanceStats.pending +
                    maintenanceStats.inProgress +
                    maintenanceStats.scheduled}
                </div>
                <p className="text-xs text-gray-500">
                  {maintenanceStats.highPriority} high priority
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Request Status
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Pending: {maintenanceStats.pending}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>In Progress: {maintenanceStats.inProgress}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span>Scheduled: {maintenanceStats.scheduled}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Completed: {maintenanceStats.completed}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress
                    value={
                      (maintenanceStats.completed / maintenanceStats.total) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Estimated Costs
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-medium">$</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${maintenanceStats.estimatedCosts.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  For all current maintenance requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Appointments
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    maintenanceRequests.filter(
                      (r) =>
                        r.scheduledDate &&
                        new Date(r.scheduledDate) >= new Date(),
                    ).length
                  }
                </div>
                <p className="text-xs text-gray-500">
                  Scheduled in the next 7 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="requests">Maintenance Requests</TabsTrigger>
              <TabsTrigger value="vendors">Vendors & Contractors</TabsTrigger>
              <TabsTrigger value="preventive">
                Preventive Maintenance
              </TabsTrigger>
            </TabsList>

            {/* Maintenance Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  All Maintenance Requests
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
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
                      <DropdownMenuItem>All Requests</DropdownMenuItem>
                      <DropdownMenuItem>High Priority</DropdownMenuItem>
                      <DropdownMenuItem>Pending</DropdownMenuItem>
                      <DropdownMenuItem>In Progress</DropdownMenuItem>
                      <DropdownMenuItem>Scheduled</DropdownMenuItem>
                      <DropdownMenuItem>Completed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/dashboard/maintenance/add">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Request
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
                          Request
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property / Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tenant
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
                          Assigned To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {maintenanceRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Wrench className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {request.issue}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {request.description.substring(0, 60)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {request.property}
                            </div>
                            <div className="text-sm text-gray-500">
                              Unit {request.unit}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {request.tenant}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${request.priority === "High" ? "bg-red-100 text-red-800" : request.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === "Pending" ? "bg-red-100 text-red-800" : request.status === "In Progress" ? "bg-blue-100 text-blue-800" : request.status === "Scheduled" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(request.date).toLocaleDateString()}
                            </div>
                            {request.scheduledDate && (
                              <div className="text-xs text-gray-500 flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(
                                  request.scheduledDate,
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {request.assignedTo}
                            </div>
                            {request.assignedTo !== "Unassigned" && (
                              <div className="text-xs text-gray-500">
                                Est. ${request.estimatedCost}
                              </div>
                            )}
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
                                Update
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Vendors & Contractors</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search vendors..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Link href="/dashboard/maintenance/vendors/add">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Vendor
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{vendor.name}</CardTitle>
                          <CardDescription>{vendor.specialty}</CardDescription>
                        </div>
                        <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          <span className="mr-1">{vendor.rating}</span>
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{vendor.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{vendor.email}</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">
                            {vendor.jobsCompleted} jobs completed
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                      <Button size="sm">Contact</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Preventive Maintenance Tab */}
            <TabsContent value="preventive" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Preventive Maintenance Schedule
                </h2>
                <Link href="/dashboard/maintenance/schedule/add">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Schedule
                  </Button>
                </Link>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Calendar</CardTitle>
                  <CardDescription>
                    Scheduled preventive maintenance tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <h3 className="font-medium">
                            HVAC Filter Replacement
                          </h3>
                          <p className="text-sm text-gray-500">
                            All properties - Quarterly maintenance
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Nov 15, 2023</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                        <div>
                          <h3 className="font-medium">Gutter Cleaning</h3>
                          <p className="text-sm text-gray-500">
                            All properties - Seasonal maintenance
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Nov 20, 2023</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <h3 className="font-medium">
                            Water Heater Inspection
                          </h3>
                          <p className="text-sm text-gray-500">
                            Sunset Apartments - Annual inspection
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Dec 5, 2023</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <h3 className="font-medium">
                            Smoke Detector Testing
                          </h3>
                          <p className="text-sm text-gray-500">
                            All properties - Required safety check
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Dec 15, 2023</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h3 className="font-medium">Roof Inspection</h3>
                          <p className="text-sm text-gray-500">
                            Oakwood Residences - Annual inspection
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Jan 10, 2024</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Checklist Templates</CardTitle>
                    <CardDescription>
                      Standardized checklists for common maintenance tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span>HVAC System Inspection</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Plumbing System Check</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Electrical System Inspection</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Exterior Building Inspection</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Appliance Maintenance</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Cost Savings</CardTitle>
                    <CardDescription>
                      Estimated savings from preventive maintenance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>HVAC Repairs</span>
                          <span className="text-green-600">$2,800 saved</span>
                        </div>
                        <Progress value={70} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          70% reduction in emergency repairs
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Plumbing Issues</span>
                          <span className="text-green-600">$1,950 saved</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          65% reduction in emergency repairs
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Appliance Lifespan</span>
                          <span className="text-green-600">$3,200 saved</span>
                        </div>
                        <Progress value={80} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          80% increase in appliance lifespan
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Maintenance</span>
                          <span className="text-green-600">$8,750 saved</span>
                        </div>
                        <Progress value={72} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          72% reduction in total maintenance costs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
