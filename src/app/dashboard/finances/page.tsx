import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PiggyBank,
  Building2,
  Calendar,
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

export default async function Finances() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for finances
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      units: 6,
      income: 8500,
      expenses: 3200,
      netIncome: 5300,
    },
    {
      id: 2,
      name: "Oakwood Residences",
      units: 4,
      income: 6000,
      expenses: 2100,
      netIncome: 3900,
    },
    {
      id: 3,
      name: "Riverfront Condos",
      units: 8,
      income: 10000,
      expenses: 4500,
      netIncome: 5500,
    },
    {
      id: 4,
      name: "Highland Townhomes",
      units: 4,
      income: 4000,
      expenses: 1800,
      netIncome: 2200,
    },
  ];

  const transactions = [
    {
      id: 1,
      date: "2023-11-01",
      description: "Rent Payment - John Smith",
      property: "Sunset Apartments",
      unit: "101",
      amount: 1200,
      type: "income",
      category: "Rent",
    },
    {
      id: 2,
      date: "2023-11-01",
      description: "Rent Payment - Sarah Johnson",
      property: "Oakwood Residences",
      unit: "202",
      amount: 1450,
      type: "income",
      category: "Rent",
    },
    {
      id: 3,
      date: "2023-11-02",
      description: "Plumbing Repair",
      property: "Riverfront Condos",
      unit: "303",
      amount: 350,
      type: "expense",
      category: "Maintenance",
    },
    {
      id: 4,
      date: "2023-11-03",
      description: "Property Insurance",
      property: "All Properties",
      unit: "-",
      amount: 1200,
      type: "expense",
      category: "Insurance",
    },
    {
      id: 5,
      date: "2023-11-05",
      description: "Landscaping Service",
      property: "Highland Townhomes",
      unit: "-",
      amount: 250,
      type: "expense",
      category: "Maintenance",
    },
    {
      id: 6,
      date: "2023-11-05",
      description: "Rent Payment - Emily Davis",
      property: "Highland Townhomes",
      unit: "404",
      amount: 1350,
      type: "income",
      category: "Rent",
    },
    {
      id: 7,
      date: "2023-11-10",
      description: "Utility Bill - Water",
      property: "Sunset Apartments",
      unit: "-",
      amount: 420,
      type: "expense",
      category: "Utilities",
    },
    {
      id: 8,
      date: "2023-11-15",
      description: "Property Tax Payment",
      property: "All Properties",
      unit: "-",
      amount: 2800,
      type: "expense",
      category: "Taxes",
    },
  ];

  // Calculate financial summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  // Calculate expense breakdown
  const expenseCategories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {});

  const expenseBreakdown = Object.entries(expenseCategories).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((Number(amount) / totalExpenses) * 100),
    }),
  );

  // Monthly data for charts
  const monthlyData = [
    { month: "Jan", income: 22000, expenses: 9500 },
    { month: "Feb", income: 21500, expenses: 9200 },
    { month: "Mar", income: 22500, expenses: 10000 },
    { month: "Apr", income: 23000, expenses: 9800 },
    { month: "May", income: 23500, expenses: 10200 },
    { month: "Jun", income: 24000, expenses: 10500 },
    { month: "Jul", income: 24500, expenses: 10800 },
    { month: "Aug", income: 25000, expenses: 11000 },
    { month: "Sep", income: 25500, expenses: 11200 },
    { month: "Oct", income: 26000, expenses: 11500 },
    { month: "Nov", income: 28500, expenses: 12600 },
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
                  Financial Management
                </h1>
                <p className="text-gray-600">
                  Track income, expenses, and profitability for your rental
                  properties
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard/finances/export">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </Link>
                <Link href="/dashboard/finances/upload-document">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Document
                  </Button>
                </Link>
                <Link href="/dashboard/finances/add-transaction">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Transaction
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
                  Total Income
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${totalIncome.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  This month from all properties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${totalExpenses.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  This month across all categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Net Income
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${netIncome.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">Profit after expenses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Cash on Cash Return
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <PiggyBank className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">8.4%</div>
                <p className="text-xs text-gray-500">
                  Annual return on investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="tax">Tax Planning</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly Income vs. Expenses</CardTitle>
                    <CardDescription>Last 11 months</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="h-[300px] w-full mt-4 bg-gray-50 rounded-md flex items-end justify-between p-4">
                      {monthlyData.map((month, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center space-y-2"
                        >
                          <div className="w-12 flex flex-col items-center space-y-1">
                            <div
                              className="w-6 bg-green-500 rounded-t-sm"
                              style={{
                                height: `${(month.income / 30000) * 200}px`,
                              }}
                            ></div>
                            <div
                              className="w-6 bg-red-500 rounded-t-sm"
                              style={{
                                height: `${(month.expenses / 30000) * 200}px`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {month.month}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4 space-x-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                        <span className="text-sm text-gray-600">Income</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                        <span className="text-sm text-gray-600">Expenses</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>November 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expenseBreakdown.map((expense, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{expense.category}</span>
                            <span>${expense.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Progress
                              value={expense.percentage}
                              className="h-2 flex-1"
                            />
                            <span className="text-xs text-gray-500 ml-2 w-8">
                              {expense.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">
                    Property Performance
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Units
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monthly Income
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monthly Expenses
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Income
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Profit Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                              <div className="font-medium text-gray-900">
                                {property.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {property.units}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-green-600">
                              ${property.income.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-red-600">
                              ${property.expenses.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">
                              ${property.netIncome.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {Math.round(
                                  (property.netIncome / property.income) * 100,
                                )}
                                %
                              </span>
                              <Progress
                                value={
                                  (property.netIncome / property.income) * 100
                                }
                                className="h-2 w-20 ml-2"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Link href="/dashboard/finances/add-transaction">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Transaction
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
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property / Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">
                                {new Date(
                                  transaction.date,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {transaction.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {transaction.property}
                            </div>
                            {transaction.unit !== "-" && (
                              <div className="text-xs text-gray-500">
                                Unit {transaction.unit}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "income" ? "+" : "-"}$
                              {transaction.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                    <CardDescription>
                      Generate and download financial reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">
                            Monthly Income Statement
                          </h3>
                          <p className="text-sm text-gray-500">
                            Income and expenses summary
                          </p>
                        </div>
                        <Button className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Cash Flow Analysis</h3>
                          <p className="text-sm text-gray-500">
                            Detailed cash flow by property
                          </p>
                        </div>
                        <Button className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Annual Profit & Loss</h3>
                          <p className="text-sm text-gray-500">
                            Yearly financial performance
                          </p>
                        </div>
                        <Button className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Expense Breakdown</h3>
                          <p className="text-sm text-gray-500">
                            Categorized expense report
                          </p>
                        </div>
                        <Button className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Report</CardTitle>
                    <CardDescription>
                      Create a customized financial report
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">
                          Report Type
                        </label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>Income Statement</option>
                          <option>Cash Flow</option>
                          <option>Balance Sheet</option>
                          <option>Tax Summary</option>
                          <option>Expense Report</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Date Range
                        </label>
                        <div className="grid grid-cols-2 gap-4 mt-1">
                          <Input type="date" placeholder="Start Date" />
                          <Input type="date" placeholder="End Date" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Properties
                        </label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>All Properties</option>
                          {properties.map((property) => (
                            <option key={property.id}>{property.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Format</label>
                        <div className="mt-1 flex space-x-4">
                          <div className="flex items-center">
                            <input
                              id="pdf"
                              name="format"
                              type="radio"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              defaultChecked
                            />
                            <label
                              htmlFor="pdf"
                              className="ml-2 text-sm text-gray-700"
                            >
                              PDF
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="excel"
                              name="format"
                              type="radio"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label
                              htmlFor="excel"
                              className="ml-2 text-sm text-gray-700"
                            >
                              Excel
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="csv"
                              name="format"
                              type="radio"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label
                              htmlFor="csv"
                              className="ml-2 text-sm text-gray-700"
                            >
                              CSV
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Generate Custom Report</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Tax Planning Tab */}
            <TabsContent value="tax" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Deductions</CardTitle>
                    <CardDescription>
                      Potential tax deductions for your rental properties
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Mortgage Interest</h3>
                          <p className="text-sm text-gray-500">
                            Deductible interest paid on loans
                          </p>
                        </div>
                        <span className="font-medium">$8,450</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Property Taxes</h3>
                          <p className="text-sm text-gray-500">
                            Annual property tax payments
                          </p>
                        </div>
                        <span className="font-medium">$6,200</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Depreciation</h3>
                          <p className="text-sm text-gray-500">
                            Building value depreciation
                          </p>
                        </div>
                        <span className="font-medium">$15,300</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Repairs & Maintenance</h3>
                          <p className="text-sm text-gray-500">
                            Costs to keep properties in good condition
                          </p>
                        </div>
                        <span className="font-medium">$7,850</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Insurance Premiums</h3>
                          <p className="text-sm text-gray-500">
                            Property insurance costs
                          </p>
                        </div>
                        <span className="font-medium">$3,600</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Estimated Total Deductions
                    </span>
                    <span className="font-bold">$41,400</span>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Calendar</CardTitle>
                    <CardDescription>
                      Important tax dates for property owners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h3 className="font-medium">January 31, 2024</h3>
                          <p className="text-sm text-gray-500">
                            1099-MISC forms due to contractors
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h3 className="font-medium">April 15, 2024</h3>
                          <p className="text-sm text-gray-500">
                            Federal tax return deadline
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <h3 className="font-medium">June 15, 2024</h3>
                          <p className="text-sm text-gray-500">
                            Estimated tax payment (Q2)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <h3 className="font-medium">September 15, 2024</h3>
                          <p className="text-sm text-gray-500">
                            Estimated tax payment (Q3)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <h3 className="font-medium">December 31, 2024</h3>
                          <p className="text-sm text-gray-500">
                            Last day for tax-year transactions
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Resources</CardTitle>
                    <CardDescription>
                      Helpful resources for rental property owners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium">IRS Publication 527</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Residential Rental Property Tax Guide
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Resource
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium">Tax Deduction Checklist</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Complete list of potential deductions
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Download PDF
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium">Depreciation Calculator</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Calculate property depreciation
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Open Calculator
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium">Find a Tax Professional</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Connect with real estate tax experts
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Search Directory
                        </Button>
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
