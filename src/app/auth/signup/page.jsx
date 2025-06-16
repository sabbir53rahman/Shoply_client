"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Users } from "lucide-react"
import useAuth from "@/Firebase/useAuth"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export default function SignUp() {
  const router = useRouter()
  const { createUser } = useAuth()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createUser(formData.fullName, formData.email, formData.password, formData.role)
      alert("Account created successfully!")
      router.push("/")
    } catch (err) {
      setError(err.message || "Failed to create user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-[100px] bg-black py-12 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <UserPlus className="w-4 h-4 mr-2" />
            Join Us Today
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            Create{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Account</span>
          </h1>
          <p className="text-xl text-gray-300">Choose your role and start your learning journey</p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-white text-center">Sign Up for Free</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-400" />
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-orange-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12 pr-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  Select Your Role
                </Label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-gray-800">
                    Choose your role
                  </option>
                  <option value="student" className="bg-gray-800">
                    🎓 Student - Learn new skills
                  </option>
                  <option value="teacher" className="bg-gray-800">
                    👨‍🏫 Teacher - Share knowledge
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-2xl shadow-orange-500/25"
                } text-white h-auto`}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  )
}
