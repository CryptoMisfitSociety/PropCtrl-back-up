import { createClient } from "../../../../supabase/server";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardNavbar from "@/components/dashboard-navbar";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extract first letter of email for avatar fallback
  const emailFirstLetter = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <div
        className="p-6 pt-20 min-h-screen"
        id="dashboard-content"
        style={{ marginLeft: "256px" }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=property-manager"
                    alt="Profile"
                  />
                  <AvatarFallback className="text-2xl">
                    {emailFirstLetter}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {user?.email?.split("@")[0] || "User"}
                </h2>
                <p className="text-gray-500 mb-4">{user?.email}</p>
                <Button className="w-full mb-2">Change Avatar</Button>
                <Button variant="outline" className="w-full">
                  Remove Avatar
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Account Status</h3>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Active</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button className="mt-2">Save Changes</Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Company Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Enter your business address"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID / Business Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your tax ID or business number"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button className="mt-2">Save Changes</Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold text-lg mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Dashboard View
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Properties Overview</option>
                    <option>Financial Summary</option>
                    <option>Tenant Management</option>
                    <option>Maintenance Requests</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="email-reports"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="email-reports"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Receive weekly email reports
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="sms-alerts"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Enable SMS alerts for urgent matters
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <Button className="mt-2">Save Preferences</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubscriptionCheck>
  );
}
