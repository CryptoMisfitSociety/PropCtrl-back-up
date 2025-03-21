import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Building2,
  Users,
  Wallet,
  Calendar,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Manage{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Properties
              </span>{" "}
              with Confidence
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              The all-in-one property management platform that helps you track
              properties, tenants, and finances in one centralized dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Get Started Free
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Building2 className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Property Management
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Track all your properties in one place
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Users className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tenant Tracking</h3>
                <p className="text-gray-600 text-sm text-center">
                  Manage tenants and lease agreements
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Wallet className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Financial Insights
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Track income, expenses and cash flow
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Calendar className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
                <p className="text-gray-600 text-sm text-center">
                  Schedule and track maintenance requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
