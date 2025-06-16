"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar = () => {
  // Mock user state - replace with your actual auth logic
  const [user, setUser] = useState(null); // Set to user object when logged in
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  // Mock login/logout functions - replace with your actual auth logic
  const handleLogin = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+01 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@grocy.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Free delivery over $100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-emerald-700">Grocy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}

              {/* Conditional Dashboard Link */}
              {user && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )}
            </div>

            {/* Remove this entire search section */}
            {/* Search Bar - REMOVED */}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist - Hidden on mobile */}
              <Link
                href="/wishlist"
                className="hidden md:flex relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart - Hidden on mobile */}
              <Link
                href="/cart"
                className="hidden md:flex relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account - Hidden on mobile */}
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 p-2"
                      >
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="hidden lg:block font-medium">
                          {user.name}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Profile Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={handleLogin}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <span className="text-xl font-bold text-emerald-700">
                        Grocy
                      </span>
                    </SheetTitle>
                    <SheetDescription>
                      Navigate through our store
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-8 space-y-6">
                    {/* Mobile Navigation Links */}
                    <div className="space-y-2">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}

                      {/* Conditional Dashboard Link for Mobile */}
                      {user && (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>

                    {/* Mobile Actions Section */}
                    <div className="border-t pt-6 space-y-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
                        Quick Actions
                      </h3>

                      {/* Mobile Wishlist & Cart */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/wishlist"
                          className="flex items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <div className="relative inline-block">
                              <Heart className="w-6 h-6 text-gray-700 mx-auto" />
                              {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {wishlistCount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-2">
                              Wishlist
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/cart"
                          className="flex items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="text-center">
                            <div className="relative inline-block">
                              <ShoppingCart className="w-6 h-6 text-gray-700 mx-auto" />
                              {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {cartCount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-700 mt-2">
                              Cart
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile User Section */}
                    {user ? (
                      <div className="border-t pt-6 space-y-2">
                        <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-lg">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Package className="w-5 h-5 mr-3" />
                          My Orders
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Settings className="w-5 h-5 mr-3" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="border-t pt-6 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
                          Account
                        </h3>
                        <Button
                          onClick={handleLogin}
                          className="w-full justify-start bg-gray-50 hover:bg-gray-100 text-gray-700"
                          variant="ghost"
                        >
                          <User className="w-5 h-5 mr-3" />
                          Login to Your Account
                        </Button>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Create New Account
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
