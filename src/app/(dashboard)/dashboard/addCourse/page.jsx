"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Image from "next/image"
import { Upload, PlusCircle, BookOpen, DollarSign, FileText, Tag, ImageIcon } from "lucide-react"
import { useCreateCourseMutation } from "@/redux/features/courseSlice/courseSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const categories = [
  "Web Development",
  "Programming",
  "Design",
  "Data Science",
  "AI & Machine Learning",
  "Mobile Development",
  "DevOps",
]

export default function AddCourse() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [preview, setPreview] = useState(null)
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const [createCourse] = useCreateCourseMutation()

  //  Access current user from Redux
  const currentUser = useSelector((state) => state.user.user)

  console.log(currentUser)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !category || !price) {
      alert("Please fill all required fields.")
      return
    }

    if (!currentUser?._id) {
      alert("User not authenticated. Please log in.")
      return
    }

    setLoading(true)

    let imageUrl = null

    if (thumbnail) {
      const imageData = new FormData()
      imageData.append("image", thumbnail)

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: imageData,
        })

        const data = await response.json()

        if (data.success) {
          imageUrl = data.data.url
        } else {
          alert("Image upload failed. Please try again.")
          setLoading(false)
          return
        }
      } catch (error) {
        console.error("Image upload error:", error)
        alert("Image upload failed. Try again.")
        setLoading(false)
        return
      }
    }

    // Include the userId (objectId) in the courseData
    const courseData = {
      title,
      description,
      category,
      price,
      thumbnail: imageUrl,
      teacher: currentUser._id,
    }

    try {
      await createCourse(courseData).unwrap()
      alert("Course added successfully!")
      setTitle("")
      setDescription("")
      setCategory("")
      setPrice("")
      setThumbnail(null)
      setPreview(null)
    } catch (err) {
      console.error("Course creation error:", err)
      alert("Failed to add course. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Course
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-4">
            Add New{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Course</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your expertise with thousands of learners worldwide
          </p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-orange-400" />
              Course Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  Course Title
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                  placeholder="Enter an engaging course title..."
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl min-h-32 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 resize-none"
                  placeholder="Describe what students will learn in this course..."
                  required
                />
              </div>

              {/* Category and Price Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-white flex items-center gap-2">
                    <Tag className="w-5 h-5 text-orange-400" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="bg-gray-800">
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-orange-400" />
                    Price ($)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl h-12 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                    placeholder="Set your course price..."
                    required
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-orange-400" />
                  Course Thumbnail
                </label>
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                  <div className="flex items-center gap-6">
                    {preview ? (
                      <div className="relative group">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt="Thumbnail Preview"
                          width={120}
                          height={120}
                          className="rounded-2xl object-cover border-2 border-orange-500/30"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm">Preview</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-30 h-30 flex items-center justify-center bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-600">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center gap-2 w-fit">
                          <Upload className="w-5 h-5" />
                          {preview ? "Change Image" : "Upload Image"}
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                      <p className="text-gray-400 text-sm mt-2">
                        Upload a high-quality image (JPG, PNG) - Recommended: 1200x600px
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-2xl shadow-orange-500/25"
                  } text-white`}
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  {loading ? "Creating Course..." : "Create Course"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-gray-900/30 backdrop-blur-xl border border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-400" />
              Course Creation Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Write a clear, descriptive title that highlights the main benefit</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Include learning outcomes and target audience in description</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Choose a high-quality, relevant thumbnail image</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Research competitive pricing for similar courses</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
