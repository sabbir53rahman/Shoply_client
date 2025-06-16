"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, BookOpen, Grid, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllCoursesQuery } from "@/redux/features/courseSlice/courseSlice";

const categories = [
  "All",
  "Web Development",
  "Programming",
  "Design",
  "Data Science",
  "AI & Machine Learning",
  "Mobile Development",
  "DevOps",
];

export default function CourseListing() {
  const {
    data: coursesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllCoursesQuery();

  // Ensure courses is always an array
  const courses = Array.isArray(coursesData) ? coursesData : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  // Filter courses based on search term and category
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    ));
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-24">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Course Library
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Explore{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {courses.length}+
            </span>{" "}
            Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover courses from industry experts and advance your career with
            hands-on learning
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 mb-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-gray-800 border border-gray-700 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <div className="text-gray-300">
              {!isLoading && (
                <span>
                  Showing {filteredCourses.length} of {courses.length} courses
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

        {/* Loading State */}
        {isLoading && (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-8`}
          >
            {renderSkeletonCards()}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 font-semibold">
              Failed to load courses. Please try again.
            </p>
            <Button className="mt-4" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !isError && filteredCourses.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No courses match your search and filter criteria.
          </div>
        )}

        {/* Courses List/Grid */}
        {!isLoading && !isError && filteredCourses.length > 0 && (
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredCourses.map((course) => (
              <Card
                key={course._id}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-3">
                    <Badge className="w-max bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-xl">
                      {course.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white">
                      {course.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={course.teacher.image}
                          alt={course.teacher.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {course.teacher.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {course.teacher.title}
                          </p>
                        </div>
                      </div>

                      <div className="text-orange-400 font-bold text-lg">
                        ${course.price}
                      </div>
                    </div>

                    <Link href={`/dashboard/courseListing/${course._id}`}>
                      <Button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
