"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setIsSubmitting(false);

    // Success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+01 123 456 789",
      subtitle: "Mon-Fri 9AM-6PM",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@grocy.com",
      subtitle: "We reply within 24 hours",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "502 New Design Street",
      subtitle: "Melbourne, San Francisco",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-200 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let&apos;s Start a
              <span className="text-emerald-600"> Conversation</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 lg:p-12">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Send us a message
                      </h2>
                      <p className="text-gray-600">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-6"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-6"
                          placeholder="Your email"
                        />
                      </div>

                      <div>
                        <Textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-6 py-4 resize-none"
                          placeholder="Tell us what's on your mind..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Get in touch
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Have questions about our organic products or need help with
                    your order? We&apos;re here to help!
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="group">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-14 h-14 ${info.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                              >
                                <IconComponent
                                  className={`w-7 h-7 ${info.color}`}
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {info.title}
                                </h3>
                                <p className="text-gray-900 font-medium">
                                  {info.info}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {info.subtitle}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>

                {/* Store Hours */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <Clock className="w-7 h-7 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Store Hours
                      </h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Response Promise */}
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
                  <MessageCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Quick Response Promise
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 2-4 hours
                    during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              We&apos;re here to make your grocery shopping experience amazing
            </h2>
            <p className="text-xl text-emerald-100">
              Your satisfaction is our priority. Let us know how we can serve
              you better.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
