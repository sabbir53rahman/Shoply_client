"use client"

import { useSelector } from "react-redux"
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useGetEnrollmentsByUserQuery } from "@/redux/features/enrollSlice/enrollSlice"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const EnrollmentsPage = () => {
  const user = useSelector((state) => state.user.user)
  const { data, isLoading, isError } = useGetEnrollmentsByUserQuery(user?._id)

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Card
        key={index}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden animate-pulse"
      >
        <div className="w-full h-48 bg-gray-800"></div>
        <CardContent className="p-6 space-y-3">
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  const enrollments = data?.enrollments || []

  return (
    <div className="min-h-screen bg-black pt-24 pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            My Learning
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Enrolled</span>{" "}
            Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Continue your learning journey with these courses you&apos;ve enrolled in
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{renderSkeletonCards()}</div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 font-semibold">Failed to load your enrolled courses. Please try again.</p>
            <Button
              className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* No Enrollments */}
        {!isLoading && !isError && enrollments.length === 0 && (
          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-orange-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Enrolled Courses</h3>
              <p className="text-gray-400 mb-6">
                You haven&apos;t enrolled in any courses yet. Start your learning journey today!
              </p>
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 h-auto rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25">
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Enrollments Grid */}
        {!isLoading && !isError && enrollments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((enrollment) => {
              const course = enrollment.course || {}
              return (
                <Card
                  key={enrollment._id}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={course.thumbnail || "/placeholder.svg?height=192&width=384"}
                      alt={course.title || "Course Thumbnail"}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-3">
                      <Badge className="w-max bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-xl">
                        {course.category || "General"}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">{course.title || "Untitled Course"}</h3>
                      <p className="text-gray-300 line-clamp-2">
                        {course.description || "No description available for this course."}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {course.teacher && (
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{course.teacher.name || "Instructor"}</p>
                              <p className="text-xs text-gray-400">{course.teacher.title || "Teacher"}</p>
                            </div>
                          </div>
                        )}

                        <div className="text-orange-400 font-bold text-lg">
                          {course.price ? `$${course.price}` : "Free"}
                        </div>
                      </div>

                      <Link href={`/dashboard/courseListing/${course._id}`}>
                        <Button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 flex items-center justify-center gap-2">
                          Continue Learning
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnrollmentsPage
