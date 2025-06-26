"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  BarChart3,
  User,
  Store,
  UserCog,
  LogOut,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

const adminNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Products", url: "/dashboard/productManagement", icon: Package },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Users", url: "/dashboard/users", icon: UserCog },
  { title: "Reviews", url: "/dashboard/reviews", icon: Star },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const user = {
    name: "Sabbir Hossain",
    role: "admin",
  }

  const navItems = adminNavItems

  const handleNavigation = (url) => {
    router.push(url)
    setOpen(false)
  }

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <>
      {/* Mobile Trigger Button */}
      <SidebarTrigger
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-[100px] left-4 z-50 bg-white text-gray-700 border border-gray-300 px-3 py-2 rounded-md shadow"
      >
        ☰
      </SidebarTrigger>

      {/* Mobile Sidebar as Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white text-gray-700 p-0 border-r border-gray-200">
          <SheetHeader className="p-6 border-b border-gray-200">
            <SheetTitle className="flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center rounded-lg">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-bold">Shoply</p>
                <p className="text-sm text-gray-500 capitalize">{user.role} Panel</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => handleNavigation(item.url)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition font-medium"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col h-screen w-64 bg-white text-gray-700 pt-[20px] p-6 fixed top-0 left-0 border-r border-gray-200 shadow-md">
        <Link href='/'>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center rounded-lg">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold">Shoply</p>
              <p className="text-sm text-gray-500 capitalize">{user.role} Panel</p>
            </div>
          </div>
        </Link>
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <p className="font-medium">{user.name}</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => handleNavigation(item.url)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}