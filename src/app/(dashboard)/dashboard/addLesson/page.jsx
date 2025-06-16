"use client"

import { useState } from "react"
import { useGetAllCoursesQuery } from "@/redux/features/courseSlice/courseSlice"
import { useAddLessonMutation } from "@/redux/features/lessonSlice/lessonSlice"
import { Play, FileText, BookOpen, PlusCircle, Video, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AddLesson() {
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [courseId, setCourseId] = useState("")

  const { data: courses, isLoading: coursesLoading } = useGetAllCoursesQuery()
  const [addLesson, { isLoading: addingLesson }] = useAddLessonMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !courseId) return alert("Title and course are required")

    try {
      await addLesson({ title, videoUrl, course: courseId }).unwrap()
      alert("Lesson added successfully!")
      setTitle("")
      setVideoUrl("")
      setCourseId("")
    } catch (error) {
      console.error("Failed to add lesson:", error)
      alert("Failed to add lesson")
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <Play className="w-4 h-4 mr-2" />
            Add Content
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-4">
            Create New{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Lesson</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Add engaging video lessons to enhance your course content
          </p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <Video className="w-6 h-6 text-orange-400" />
              Lesson Details
            </CardTitle>
            <p className="text-gray-400 mt-2">Fill in the details below to add a new lesson to your course</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Lesson Title */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  Lesson Title
                  <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                  placeholder="Enter an engaging lesson title..."
                  required
                />
              </div>

              {/* Video URL */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-orange-400" />
                  Video URL
                </label>
                <Input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Supports YouTube, Vimeo, and other video platforms
                </p>
              </div>

              {/* Course Selection */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-400" />
                  Select Course
                  <span className="text-red-400">*</span>
                </label>
                {coursesLoading ? (
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                    <span className="text-gray-300">Loading courses...</span>
                  </div>
                ) : (
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800">
                      -- Select a Course --
                    </option>
                    {courses?.map((course) => (
                      <option key={course._id} value={course._id} className="bg-gray-800">
                        {course.title}
                      </option>
                    ))}
                  </select>
                )}
                {courses && courses.length === 0 && (
                  <p className="text-amber-400 text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    No courses found. Please create a course first.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={addingLesson || !title || !courseId}
                  className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                    addingLesson || !title || !courseId
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-2xl shadow-orange-500/25"
                  } text-white`}
                >
                  {addingLesson ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Adding Lesson...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add Lesson
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-gray-900/30 backdrop-blur-xl border border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-orange-400" />
              Lesson Creation Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use clear, descriptive titles that indicate what students will learn</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ensure video quality is high and audio is clear</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Keep lessons focused on one main concept or skill</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Test video URLs before submitting to ensure they work</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Stats */}
        {courses && courses.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">{courses.length}</div>
                  <div className="text-gray-400">Total Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    {courses.reduce((total, course) => total + (course.lessons?.length || 0), 0)}
                  </div>
                  <div className="text-gray-400">Total Lessons</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400 mb-2">
                    {courses.filter((course) => course.lessons?.length > 0).length}
                  </div>
                  <div className="text-gray-400">Active Courses</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
