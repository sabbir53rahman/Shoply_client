import { Mail, Gift } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewsletterSignup = () => (
  <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 px-4 overflow-hidden">
    {/* Simple background decoration */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-teal-200 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-emerald-100 rounded-full blur-xl"></div>
    </div>

    <div className="relative max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Gift className="w-4 h-4" />
        Special Offer
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Join Our Newsletter & <span className="text-emerald-600">Save $10</span>
      </h2>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Be the first to know about exclusive deals, new arrivals, and seasonal
        offers. Plus get $10 off your first order!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            placeholder="Enter your email address"
            className="pl-10 h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-0 focus-visible:outline-none rounded-xl"
          />
        </div>
        <Button className="primary_button">
          Subscribe Now
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        No spam, unsubscribe at any time. By subscribing, you agree to our
        Privacy Policy.
      </p>
    </div>
  </div>
);

export default NewsletterSignup;
