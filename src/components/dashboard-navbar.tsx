"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Building2,
  Home,
  Users,
  Wallet,
  ClipboardCheck,
  Settings,
  Bell,
  Search,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Initialize dashboard content margin on component mount
  useState(() => {
    // Only run on client-side
    if (typeof document !== "undefined") {
      const content = document.getElementById("dashboard-content");
      if (content) {
        content.style.marginLeft = collapsed ? "80px" : "256px";
      }
    }
  });

  return (
    <>
      {/* Left sidebar navigation */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#1E293B] text-white z-50 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            {!collapsed && (
              <Link href="/dashboard" prefetch className="flex items-center">
                <Building2 className="h-6 w-6 text-blue-400 mr-2" />
                <span className="font-bold text-xl">PropertyPro</span>
              </Link>
            )}
            {collapsed && (
              <Link
                href="/dashboard"
                prefetch
                className="flex items-center justify-center w-full"
              >
                <Building2 className="h-6 w-6 text-blue-400" />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-full"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Navigation links */}
          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="px-3 space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  pathname === "/dashboard"
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <LayoutDashboard
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname === "/dashboard" ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Dashboard</span>}
              </Link>
              <Link
                href="/dashboard/properties"
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/properties")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <Building2
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/properties") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Properties</span>}
              </Link>
              <Link
                href="/dashboard/tenants"
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/tenants")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <Users
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/tenants") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Tenants</span>}
              </Link>
              <Link
                href="/dashboard/finances"
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/finances")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <Wallet
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/finances") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Finances</span>}
              </Link>
              <Link
                href="/dashboard/maintenance"
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/maintenance")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <ClipboardCheck
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/maintenance") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Maintenance</span>}
              </Link>
            </nav>
          </div>

          {/* Bottom section with settings, user profile and logout */}
          <div className="p-4 border-t border-slate-700">
            <div className="space-y-3">
              <Link
                href="/dashboard/settings"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/settings")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <Settings
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/settings") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Settings</span>}
              </Link>
              <Link
                href="/dashboard/profile"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname.includes("/dashboard/profile")
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } group`}
              >
                <Users
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${pathname.includes("/dashboard/profile") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"}`}
                />
                {!collapsed && <span>Profile</span>}
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white group"
              >
                <LogOut
                  className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 text-slate-400 group-hover:text-blue-400`}
                />
                {!collapsed && <span>Sign out</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Top header for search and notifications */}
      <header
        className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 py-3 px-4 z-40 transition-all duration-300 h-16"
        style={{ left: collapsed ? "80px" : "256px" }}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
