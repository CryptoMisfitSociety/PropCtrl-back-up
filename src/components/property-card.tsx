"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  Building2,
  MapPin,
  Home,
  Users,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    address: string;
    units: number;
    occupancyRate: number;
    revenue: number;
    image: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-xl truncate">
              {property.name}
            </h3>
            <div className="flex items-center text-white/80 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{property.address}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 hover:bg-white text-gray-700 rounded-full h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/properties/${property.id}`}
                  className="w-full"
                >
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/properties/${property.id}/edit`}
                  className="w-full"
                >
                  Edit Property
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 flex items-center">
              <Home className="h-3 w-3 mr-1" /> Units
            </span>
            <span className="font-semibold">{property.units}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 flex items-center">
              <Users className="h-3 w-3 mr-1" /> Occupancy
            </span>
            <div className="flex items-center">
              <span className="font-semibold mr-2">
                {property.occupancyRate}%
              </span>
              <Progress value={property.occupancyRate} className="h-1 w-12" />
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-sm text-gray-500 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" /> Monthly Revenue
            </span>
            <span className="font-semibold">
              ${property.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm">
          <Building2 className="h-4 w-4 mr-2" /> Manage Units
        </Button>
        <Button size="sm">
          <Link
            href={`/dashboard/properties/${property.id}`}
            className="flex items-center"
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
