import { createClient } from "../../../../supabase/server";
import { SubscriptionCheck } from "@/components/subscription-check";
import DashboardNavbar from "@/components/dashboard-navbar";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <div
        className="p-6 pt-20 min-h-screen"
        id="dashboard-content"
        style={{ marginLeft: "256px" }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-5 sticky top-20">
              <h2 className="font-semibold text-lg mb-4">Navigation</h2>
              <nav className="space-y-2">
                <a
                  href="#account"
                  className="block px-3 py-2 text-blue-600 bg-blue-50 rounded-md font-medium"
                >
                  Account Settings
                </a>
                <a
                  href="#notifications"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Notifications
                </a>
                <a
                  href="#billing"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Billing & Subscription
                </a>
                <a
                  href="#security"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Security
                </a>
                <a
                  href="#integrations"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Integrations
                </a>
              </nav>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div
              id="account"
              className="bg-white rounded-lg shadow p-6 mb-6 scroll-mt-20"
            >
              <h2 className="font-semibold text-lg mb-4">Account Settings</h2>
              <div className="space-y-4">
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
                  <p className="text-xs text-gray-500 mt-1">
                    Your email address is used for login and notifications
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Pacific Time (US & Canada)</option>
                    <option>Eastern Time (US & Canada)</option>
                    <option>UTC</option>
                    <option>Central European Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              id="notifications"
              className="bg-white rounded-lg shadow p-6 mb-6 scroll-mt-20"
            >
              <h2 className="font-semibold text-lg mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive email updates about your account activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Alerts</h3>
                    <p className="text-sm text-gray-500">
                      Get notified about maintenance requests and updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Payment Reminders</h3>
                    <p className="text-sm text-gray-500">
                      Receive reminders about upcoming and overdue payments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div
              id="security"
              className="bg-white rounded-lg shadow p-6 scroll-mt-20 mb-6"
            >
              <h2 className="font-semibold text-lg mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Change Password
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your password regularly for better security
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubscriptionCheck>
  );
}
