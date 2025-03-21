import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Home,
  Users,
  DollarSign,
  Calendar,
  ClipboardCheck,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock property data based on ID
  const propertyId = parseInt(params.id);

  // This would be a database query in a real application
  const property = {
    id: propertyId,
    name:
      propertyId === 1
        ? "Sunset Apartments"
        : propertyId === 2
          ? "Oakwood Residences"
          : propertyId === 3
            ? "Riverfront Condos"
            : propertyId === 4
              ? "Highland Townhomes"
              : "Property " + propertyId,
    address:
      propertyId === 1
        ? "123 Main St, Anytown"
        : propertyId === 2
          ? "456 Oak Ave, Somewhere"
          : propertyId === 3
            ? "789 River Rd, Elsewhere"
            : propertyId === 4
              ? "101 Highland Dr, Nowhere"
              : propertyId + " Example St, City",
    description:
      "A beautiful property featuring modern amenities, spacious units, and a prime location. Perfect for families and professionals looking for comfort and convenience.",
    units:
      propertyId === 1
        ? 6
        : propertyId === 2
          ? 4
          : propertyId === 3
            ? 8
            : propertyId === 4
              ? 4
              : 5,
    occupiedUnits:
      propertyId === 1
        ? 6
        : propertyId === 2
          ? 3
          : propertyId === 3
            ? 7
            : propertyId === 4
              ? 2
              : 4,
    occupancyRate:
      propertyId === 1
        ? 100
        : propertyId === 2
          ? 75
          : propertyId === 3
            ? 88
            : propertyId === 4
              ? 50
              : 80,
    revenue:
      propertyId === 1
        ? 8500
        : propertyId === 2
          ? 6000
          : propertyId === 3
            ? 10000
            : propertyId === 4
              ? 4000
              : 7500,
    expenses:
      propertyId === 1
        ? 3200
        : propertyId === 2
          ? 2400
          : propertyId === 3
            ? 4500
            : propertyId === 4
              ? 1800
              : 3000,
    maintenanceRequests:
      propertyId === 1
        ? 1
        : propertyId === 2
          ? 2
          : propertyId === 3
            ? 0
            : propertyId === 4
              ? 3
              : 1,
    yearBuilt:
      propertyId === 1
        ? 2010
        : propertyId === 2
          ? 2015
          : propertyId === 3
            ? 2018
            : propertyId === 4
              ? 2005
              : 2012,
    lastRenovation:
      propertyId === 1
        ? 2020
        : propertyId === 2
          ? 2022
          : propertyId === 3
            ? 2023
            : propertyId === 4
              ? 2018
              : 2021,
    propertyType:
      propertyId === 1
        ? "Apartment Complex"
        : propertyId === 2
          ? "Townhomes"
          : propertyId === 3
            ? "Condominiums"
            : propertyId === 4
              ? "Single Family Homes"
              : "Mixed Use",
    image:
      propertyId === 1
        ? "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
        : propertyId === 2
          ? "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80"
          : propertyId === 3
            ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
            : propertyId === 4
              ? "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80"
              : "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
  };

  // Mock units data
  const units = Array.from({ length: property.units }, (_, i) => ({
    id: i + 1,
    number: (i + 101).toString(),
    type: i % 3 === 0 ? "Studio" : i % 3 === 1 ? "1 Bedroom" : "2 Bedroom",
    sqft:
      i % 3 === 0 ? 500 + i * 10 : i % 3 === 1 ? 700 + i * 15 : 900 + i * 20,
    rent:
      i % 3 === 0
        ? 1200 + i * 50
        : i % 3 === 1
          ? 1500 + i * 75
          : 1800 + i * 100,
    status: i < property.occupiedUnits ? "Occupied" : "Vacant",
    leaseEnd:
      i < property.occupiedUnits
        ? new Date(
            Date.now() +
              (Math.floor(Math.random() * 12) + 1) * 30 * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0]
        : "",
    tenant:
      i < property.occupiedUnits
        ? [
            "John Smith",
            "Sarah Johnson",
            "Michael Brown",
            "Emily Davis",
            "David Wilson",
            "Jennifer Lee",
          ][i % 6]
        : "",
  }));

  // Mock maintenance requests
  const maintenanceRequests = [
    {
      id: 1,
      unit: "103",
      issue: "Leaking faucet in bathroom",
      priority: "Medium",
      status: "In Progress",
      reportedDate: "2023-10-28",
      scheduledDate: "2023-11-05",
    },
    {
      id: 2,
      unit: "105",
      issue: "HVAC not cooling properly",
      priority: "High",
      status: "Scheduled",
      reportedDate: "2023-11-01",
      scheduledDate: "2023-11-03",
    },
    {
      id: 3,
      unit: "102",
      issue: "Broken cabinet hinge in kitchen",
      priority: "Low",
      status: "Pending",
      reportedDate: "2023-10-30",
      scheduledDate: "",
    },
  ].slice(0, property.maintenanceRequests);

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
                <Link href="/dashboard/properties" className="mr-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {property.name}
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href={`/dashboard/properties/${property.id}/edit`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Property
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Property Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Property Overview
                  </h2>
                  <p className="text-gray-600 mb-4">{property.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Property Type
                      </span>
                      <span className="font-semibold">
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Year Built</span>
                      <span className="font-semibold">
                        {property.yearBuilt}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Last Renovation
                      </span>
                      <span className="font-semibold">
                        {property.lastRenovation}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Total Units</span>
                      <span className="font-semibold">{property.units}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Occupancy Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Occupancy Rate
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {property.occupancyRate}%
                  </div>
                  <div className="mt-2">
                    <Progress value={property.occupancyRate} className="h-2" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {property.occupiedUnits} occupied,{" "}
                    {property.units - property.occupiedUnits} vacant
                  </p>
                </CardContent>
              </Card>

              {/* Revenue Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${property.revenue.toLocaleString()}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Expenses</span>
                    <span className="text-xs text-gray-500">
                      ${property.expenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Net Income</span>
                    <span className="text-xs text-green-600 font-medium">
                      ${(property.revenue - property.expenses).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance
                  </CardTitle>
                  <ClipboardCheck className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {property.maintenanceRequests}
                  </div>
                  <p className="text-xs text-gray-500">Open requests</p>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">
                      <Link href="#maintenance" className="w-full">
                        View Requests
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs for Units, Maintenance, etc. */}
          <Tabs defaultValue="units" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Units Tab */}
            <TabsContent value="units" className="space-y-6" id="units">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Property Units</h2>
                <Link href={`/dashboard/properties/${property.id}/units/add`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Unit
                  </Button>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size (sq ft)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tenant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lease Ends
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {units.map((unit) => (
                        <tr key={unit.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {unit.number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {unit.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {unit.sqft}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            ${unit.rent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${unit.status === "Occupied" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                            >
                              {unit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {unit.tenant || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {unit.leaseEnd || "-"}
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
            <TabsContent
              value="maintenance"
              className="space-y-6"
              id="maintenance"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Maintenance Requests</h2>
                <Link href="/dashboard/maintenance/add">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </Link>
              </div>

              {maintenanceRequests.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
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
                            Reported
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Scheduled
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
                              {request.reportedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {request.scheduledDate || "-"}
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
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Maintenance Requests
                  </h3>
                  <p className="text-gray-500 mb-4">
                    There are currently no maintenance requests for this
                    property.
                  </p>
                  <Link href="/dashboard/maintenance/add">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Request
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Financials Tab */}
            <TabsContent value="financials" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Financial Summary</h2>
                <div className="flex space-x-4">
                  <Button variant="outline">Last 12 Months</Button>
                  <Button variant="outline">Export Report</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full bg-gray-100 rounded-md flex items-end justify-between p-4">
                      {[65, 70, 75, 72, 78, 80, 82, 85, 83, 85, 88, 90].map(
                        (height, i) => (
                          <div key={i} className="relative group">
                            <div
                              className="w-8 bg-blue-600 rounded-t-sm transition-all duration-200 hover:bg-blue-700"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              $
                              {Math.round(
                                (property.revenue * height) / 100,
                              ).toLocaleString()}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Expenses Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Maintenance</span>
                          <span>
                            $
                            {Math.round(
                              property.expenses * 0.35,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Utilities</span>
                          <span>
                            $
                            {Math.round(
                              property.expenses * 0.25,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Property Management</span>
                          <span>
                            $
                            {Math.round(
                              property.expenses * 0.2,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Insurance</span>
                          <span>
                            $
                            {Math.round(
                              property.expenses * 0.12,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Property Tax</span>
                          <span>
                            $
                            {Math.round(
                              property.expenses * 0.08,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Expenses</span>
                        <span className="font-medium">
                          ${property.expenses.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Net Income</span>
                        <span className="font-medium text-green-600">
                          $
                          {(
                            property.revenue - property.expenses
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Property Documents</h2>
                <Link href={`/dashboard/properties/${property.id}/documents`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Property Deed",
                      type: "PDF",
                      date: "2022-05-15",
                      size: "2.4 MB",
                    },
                    {
                      name: "Insurance Policy",
                      type: "PDF",
                      date: "2023-01-10",
                      size: "1.8 MB",
                    },
                    {
                      name: "Property Tax Statement",
                      type: "PDF",
                      date: "2023-03-22",
                      size: "1.2 MB",
                    },
                    {
                      name: "Maintenance Records",
                      type: "XLSX",
                      date: "2023-09-05",
                      size: "3.5 MB",
                    },
                    {
                      name: "Tenant Agreements",
                      type: "ZIP",
                      date: "2023-08-12",
                      size: "5.7 MB",
                    },
                    {
                      name: "Property Photos",
                      type: "ZIP",
                      date: "2023-06-30",
                      size: "12.8 MB",
                    },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex items-start"
                    >
                      <div className="bg-blue-100 text-blue-800 rounded p-2 mr-3">
                        <span className="font-mono font-bold">{doc.type}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Uploaded: {doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SubscriptionCheck>
  );
}
