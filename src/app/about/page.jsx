import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import vagetable from "@/assets/vagetable.jpg";
import farm from "@/assets/farm.jpg";
import {
  Leaf,
  Users,
  Award,
  Heart,
  Truck,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const AboutPage = () => {
  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "10+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Organic Products", icon: Leaf },
    { number: "99%", label: "Customer Satisfaction", icon: Heart },
  ];

  const values = [
    {
      icon: Leaf,
      title: "100% Organic",
      description:
        "All our products are certified organic, grown without harmful pesticides or chemicals.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Same-day delivery for orders placed before 2 PM. Fresh products at your doorstep.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Rigorous quality checks ensure you get only the freshest and finest products.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our customer support team is always ready to help you with any queries or concerns.",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Passionate about sustainable farming and healthy living for over 15 years.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Expert in supply chain management with a focus on organic food distribution.",
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ensures every product meets our high standards for freshness and quality.",
    },
  ];

  const testimonials = [
    {
      name: "Jennifer Smith",
      role: "Regular Customer",
      content:
        "Grocy has transformed how I shop for groceries. The quality is exceptional and delivery is always on time!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Wilson",
      role: "Health Enthusiast",
      content:
        "As someone who cares about organic food, Grocy is my go-to store. Their selection is amazing!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 mb-4">
                  <Leaf className="w-4 h-4 mr-2" />
                  About Shoply
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh, Organic &
                  <span className="text-emerald-600"> Sustainable</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We&apos;re passionate about bringing you the freshest organic
                  produce while supporting sustainable farming practices and
                  local communities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-xl"
                >
                  Our Story
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={vagetable}
                  alt="Fresh organic vegetables"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Certified Organic
                    </p>
                    <p className="text-sm text-gray-600">
                      100% Natural Products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Grocy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to providing you with the highest quality
              organic products while maintaining sustainable and ethical
              practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Founded in 2014, Grocy started as a small family business with
                  a simple mission: to make fresh, organic produce accessible to
                  everyone. What began as a local farmers market stall has grown
                  into a trusted online grocery platform serving thousands of
                  families.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We work directly with local farmers and organic producers to
                  ensure that every product meets our strict quality standards.
                  Our commitment to sustainability extends beyond our products
                  to our packaging, delivery methods, and community initiatives.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">
                    Direct partnerships with local organic farmers
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">
                    Eco-friendly packaging and delivery
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">
                    Supporting sustainable farming practices
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={farm}
                  alt="Our organic farm"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team is dedicated to bringing you the best organic
              products and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don&apos;t just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-emerald-600 mb-4" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Healthy Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Grocy for their
            organic grocery needs.
          </p>
          <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
            Start Shopping Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutPage;
