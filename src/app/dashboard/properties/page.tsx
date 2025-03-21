import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Plus,
  Search,
  Filter,
  Building2,
  MapPin,
  Home,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/property-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PropertiesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, Anytown",
      units: 6,
      occupancyRate: 100,
      revenue: 8500,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
    {
      id: 2,
      name: "Oakwood Residences",
      address: "456 Oak Ave, Somewhere",
      units: 4,
      occupancyRate: 75,
      revenue: 6000,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    },
    {
      id: 3,
      name: "Riverfront Condos",
      address: "789 River Rd, Elsewhere",
      units: 8,
      occupancyRate: 88,
      revenue: 10000,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    {
      id: 4,
      name: "Highland Townhomes",
      address: "101 Highland Dr, Nowhere",
      units: 4,
      occupancyRate: 50,
      revenue: 4000,
      image:
        "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80",
    },
    {
      id: 5,
      name: "Parkview Apartments",
      address: "202 Park Ave, Anytown",
      units: 10,
      occupancyRate: 90,
      revenue: 12000,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
    },
    {
      id: 6,
      name: "Lakeshore Villas",
      address: "303 Lake Dr, Somewhere",
      units: 6,
      occupancyRate: 83,
      revenue: 7500,
      image:
        "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=800&q=80",
    },
  ];

  // Property stats
  const propertyStats = {
    totalProperties: properties.length,
    totalUnits: properties.reduce((acc, prop) => acc + prop.units, 0),
    averageOccupancy: Math.round(
      properties.reduce((acc, prop) => acc + prop.occupancyRate, 0) /
        properties.length,
    ),
    totalRevenue: properties.reduce((acc, prop) => acc + prop.revenue, 0),
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
                <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                <p className="text-gray-600">Manage your property portfolio</p>
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
          {/* Property Stats */}
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
                  Across {propertyStats.totalUnits} units
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Occupancy
                </CardTitle>
                <Home className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {propertyStats.averageOccupancy}%
                </div>
                <div className="mt-2">
                  <Progress
                    value={propertyStats.averageOccupancy}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <Building2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${propertyStats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">Monthly income</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Per Unit
                </CardTitle>
                <MapPin className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {Math.round(
                    propertyStats.totalRevenue / propertyStats.totalUnits,
                  ).toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">Monthly per unit</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and View Options */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-10 w-full md:w-[350px]"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                List View
              </Button>
              <Button
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200 flex-1 md:flex-none"
              >
                Card View
              </Button>
              <Button variant="outline" className="flex-1 md:flex-none">
                Map View
              </Button>
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Property Table (Alternative View) */}
          <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Property Listing</h2>
            </div>
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
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Link href={`/dashboard/properties/${property.id}`}>
                              View
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <Edit className="h-4 w-4" />
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
        </main>
      </div>
    </SubscriptionCheck>
  );
}
