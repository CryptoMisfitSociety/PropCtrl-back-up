import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Wallet,
  Users,
  ClipboardCheck,
  BarChart4,
  Clock,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Property Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything property managers need to
              streamline operations and maximize returns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Building2 className="w-6 h-6" />,
                title: "Property Tracking",
                description:
                  "Manage all your properties in one centralized dashboard",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Tenant Management",
                description: "Track leases, payments, and communications",
              },
              {
                icon: <Wallet className="w-6 h-6" />,
                title: "Financial Analytics",
                description:
                  "Real-time insights into your property performance",
              },
              {
                icon: <ClipboardCheck className="w-6 h-6" />,
                title: "Maintenance Requests",
                description: "Streamlined maintenance workflow",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Powerful Dashboard at Your Fingertips
              </h2>
              <p className="text-gray-600 mb-6">
                Get a comprehensive view of your entire property portfolio with
                our intuitive dashboard.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <BarChart4 className="w-5 h-5 text-blue-600" />,
                    title: "Real-time Analytics",
                    description:
                      "Track occupancy rates, revenue, and expenses at a glance",
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-blue-600" />,
                    title: "Upcoming Lease Expirations",
                    description:
                      "Never miss a lease renewal with automated reminders",
                  },
                  {
                    icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
                    title: "Maintenance Tracking",
                    description:
                      "Monitor all maintenance requests from submission to completion",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Dashboard
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Property Management Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Efficiency Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2.5B+</div>
              <div className="text-blue-100">Property Value</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Tenants</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-blue-100">Occupancy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your property portfolio. Scale as you
              grow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Property managers like you are transforming their business with
              our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "This platform has completely transformed how we manage our 200+ rental units. The financial insights alone have increased our profitability by 15%.",
                name: "Sarah Johnson",
                title: "Property Manager, Urban Living Properties",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                quote:
                  "The maintenance request system has cut our response time in half. Our tenants are happier and our maintenance team is more efficient.",
                name: "Michael Rodriguez",
                title: "Operations Director, Rodriguez Real Estate",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                quote:
                  "As a small property management company, this platform gives us the tools to compete with larger firms. It's been a game-changer for our business.",
                name: "Jennifer Lee",
                title: "Owner, Cornerstone Properties",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Property Management?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of property managers who are streamlining their
            operations and increasing profitability.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
