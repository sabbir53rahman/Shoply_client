"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Swal from "sweetalert2"
import { useGetCoursesByUserQuery, useDeleteCourseMutation } from "@/redux/features/courseSlice/courseSlice"
import { useSelector } from "react-redux"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  Users,
  DollarSign,
  Calendar,
  Grid,
  List,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Target,
} from "lucide-react"

export default function MyCourses() {
  const user = useSelector((state) => state.user.user)
  const { data: courses, isLoading, isError, refetch } = useGetCoursesByUserQuery(user?._id)

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState("grid")

  const coursesArray = Array.isArray(courses) ? courses : []

  const categories = ["All", ...new Set(coursesArray.map((course) => course.category).filter(Boolean))]

  const filteredCourses = coursesArray.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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

  // SweetAlert2 confirm dialog for deleting course
  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e", // red-500
      cancelButtonColor: "#6b7280", // gray-500
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      try {
        await deleteCourse(courseId).unwrap()
        await Swal.fire("Deleted!", "Your course has been deleted.", "success")
        refetch()
      } catch (error) {
        Swal.fire("Error!", "Failed to delete course. Please try again.", "error")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <Target className="w-4 h-4 mr-2" />
            My Courses
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Course Library
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage and track all your created courses in one place
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 mb-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search your courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div className="relative">
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-gray-800 border border-gray-700 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <Link href="/dashboard/addCourse">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl h-12 font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Add Course
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <div className="text-gray-300">
              {!isLoading && (
                <span>
                  Showing {filteredCourses.length} of {coursesArray.length} courses
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-8`}
          >
            {renderSkeletonCards()}
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-400">Failed to load your courses.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-gray-400">No courses found matching your criteria.</div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredCourses.map((course) => (
                  <Card
                    key={course._id}
                    className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden group flex flex-col ${
                      viewMode === "list" ? "flex-row" : ""
                    }`}
                  >
                    {/* Thumbnail & Category */}
                    <div
                      className={`relative ${
                        viewMode === "list" ? "w-72 flex-shrink-0" : "h-48"
                      }`}
                    >
                      <Image
                        alt={course.title}
                        src={course.thumbnail}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:brightness-110 transition"
                      />
                      <Badge className="absolute top-4 left-4 bg-orange-500/60 border-none text-white px-3 py-1 rounded-xl shadow-lg">
                        {course.category || "Uncategorized"}
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent
                      className={`p-6 space-y-4 flex-1 flex flex-col ${
                        viewMode === "list" ? "justify-between" : ""
                      }`}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-1">
                          Created on {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                        {course.description && (
                          <p className="text-gray-400 text-sm line-clamp-3">{course.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4 justify-between">
                        <Link href={`/dashboard/editCourse/${course._id}`} passHref legacyBehavior>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            title="Edit Course"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/dashboard/courseListing/${course._id}`} target="_blank" passHref legacyBehavior>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex items-center gap-2"
                            title="View Course"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>

                        {/* Delete Button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(course._id)}
                          disabled={isDeleting}
                          title="Delete Course"
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
