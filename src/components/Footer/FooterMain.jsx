import { Phone, Mail, MapPin, Clock } from "lucide-react";

const FooterMain = () => (
  <div className="bg-white border-t border-gray-200 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-600 text-lg font-semibold">
                  +01 123 456 789
                </p>
                <p className="text-sm text-gray-600">Call us anytime</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">demo@example.com</p>
                <p className="text-sm text-gray-600">Send us an email</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">502 New Design Str</p>
                <p className="text-sm text-gray-600">
                  Melbourne, San Francisco
                </p>
                <p className="text-sm text-gray-600">United States</p>
                {/* <button className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-1 hover:underline">
                  Show on map →
                </button> */}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Store Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9:00 to 5:00</p>
                <p className="text-sm text-gray-600">Saturday: 9:00 to 3:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Store Policy</h4>
          <ul className="space-y-3">
            {["Information", "Privacy", "Refund", "Shipping", "Service"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {["About Us", "Contact", "FAQs", "Compare", "Wishlist"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
          <ul className="space-y-3">
            {[
              "Vegetables",
              "Dairy Items",
              "Fruits",
              "Bakery",
              "Healthy Food",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default FooterMain;
