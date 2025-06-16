"use client"

import { useState } from "react"
import { useAddLessonMutation } from "@/redux/features/lessonSlice/lessonSlice"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Play, FileText, Video, PlusCircle, Loader2, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react"

const AddLessonPage = () => {
  const { id: courseId } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [addLesson, { isLoading }] = useAddLessonMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setErrorMessage("Lesson title is required")
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
      return
    }

    try {
      await addLesson({
        course: courseId,
        title: title.trim(),
        videoUrl: videoUrl.trim(),
      }).unwrap()

      // Show success message
      setShowSuccess(true)

      // Reset form
      setTitle("")
      setVideoUrl("")

      // Redirect after showing success message
      setTimeout(() => {
        router.push(`/dashboard/courseListing/${courseId}`)
      }, 2000)
    } catch (error) {
      console.error("Failed to add lesson:", error)
      setErrorMessage("Failed to add lesson. Please try again.")
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    }
  }

  const handleGoBack = () => {
    router.push(`/dashboard/courseListing/${courseId}`)
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

        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-8 bg-green-500/10 backdrop-blur-xl border border-green-500/30 animate-in slide-in-from-top duration-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-300">Lesson Added Successfully!</h3>
                  <p className="text-green-400/80">Redirecting you back to the course...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {showError && (
          <Card className="mb-8 bg-red-500/10 backdrop-blur-xl border border-red-500/30 animate-in slide-in-from-top duration-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-300">Error</h3>
                  <p className="text-red-400/80">{errorMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
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
                <p className="text-gray-400 text-sm">
                  Choose a clear, descriptive title that tells students what they&apos;ll learn
                </p>
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
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                />
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-300 text-sm mb-2 font-medium">Supported platforms:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Vimeo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Wistia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Direct MP4</span>
                    </div>
                  </div>
                </div>
              </div>


              {/* Submit Button */}
              <div className="pt-6 flex gap-4">
                <Button
                  type="button"
                  onClick={handleGoBack}
                  variant="outline"
                  className="flex-1 border-gray-700 text-black hover:bg-gray-800 hover:text-white rounded-2xl py-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !title.trim()}
                  className={`flex-1 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                    isLoading || !title.trim()
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-2xl shadow-orange-500/25"
                  } text-white`}
                >
                  {isLoading ? (
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
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Aim for 5-15 minute lessons for optimal engagement</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Include a brief description to help students understand the content</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress Indicator */}
        <Card className="mt-8 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Video className="w-8 h-8 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Building Great Content</h3>
            </div>
            <p className="text-gray-300 text-lg">
              Every lesson you add brings more value to your students and helps them achieve their learning goals.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddLessonPage
