import {
  Truck,
  RotateCcw,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const FooterBottom = () => (
  <div className="bg-gray-50 border-t border-gray-200">
    {/* Features Bar */}
    <div className="py-8 px-4 border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Free Delivery</h4>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Easy Returns</h4>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Money Back</h4>
              <p className="text-sm text-gray-600">100% guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-2xl text-emerald-700">Shoply</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Grocy. All rights reserved. Built with ❤️ for better shopping
            experience.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default FooterBottom;
