"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
} from "@/redux/features/courseSlice/courseSlice";
import {
  useEnrollCourseMutation,
  useGetEnrollmentsByUserQuery,
  useUpdateProgressMutation,
} from "@/redux/features/enrollSlice/enrollSlice";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlayCircle,
  CheckCircle,
  BookOpen,
  Users,
  Calendar,
  Target,
  Edit,
  Trash2,
  PlusCircle,
  Loader2,
  AlertTriangle,
  User,
  Lock,
  ChevronRight,
  Star,
  Award,
  Share2,
} from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: courseData,
    isLoading,
    isError,
    refetch,
  } = useGetCourseByIdQuery(id);
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation();
  const [updateProgress] = useUpdateProgressMutation();

  const user = useSelector((state) => state.user.user);
  const userRole = user?.role || "guest";

  // Query enrollments only for students with userId
  const { data: enrollments, isLoading: isEnrollmentsLoading } =
    useGetEnrollmentsByUserQuery(user?._id, {
      skip: !user?._id || userRole !== "student",
    });

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (courseData && userRole === "student") {
      const enrolled = Array.isArray(enrollments)
        ? enrollments.some((enroll) => enroll.course?._id === courseData._id)
        : false;
      setIsEnrolled(enrolled);

      if (enrolled) {
        const enrollment = Array.isArray(enrollments)
          ? enrollments.find((enroll) => enroll.course?._id === courseData._id)
          : null;

        if (enrollment?.progress) {
          setProgress(enrollment.progress);
        } else {
          const completedLessons =
            courseData.lessons?.filter((l) => l.completed).length || 0;
          const totalLessons = courseData.lessons?.length || 1;
          setProgress((completedLessons / totalLessons) * 100);
        }
      } else {
        setProgress(0);
      }
    }
  }, [courseData, enrollments, userRole]);

  const handleEnroll = async () => {
    try {
      await enrollCourse({
        userId: user._id,
        courseId: courseData._id,
      }).unwrap();
      setIsEnrolled(true);
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(courseData._id).unwrap();
      setShowDeleteConfirm(false);
      alert("Course deleted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("You're not authorized to delete this course.");
    }
  };

  const handleLessonClick = async (lessonId) => {
    if (userRole === "student") {
      try {
        await updateProgress({
          userId: user._id,
          courseId: courseData._id,
          lessonId: lessonId,
        }).unwrap();
        refetch();
      } catch (error) {
        console.error("Progress update failed:", error);
      }
    }
  };

  if (isLoading || isEnrollmentsLoading)
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-white text-xl font-medium">
          Loading course details...
        </p>
      </div>
    );

  if (isError || !courseData)
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-6">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-white text-xl font-medium">
          Failed to load course details
        </p>
        <Button
          onClick={() => router.back()}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Course Image */}
          <div className="lg:col-span-1">
            <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-orange-500/10">
              {courseData.thumbnail ? (
                <Image
                  src={courseData.thumbnail || "/placeholder.svg"}
                  alt={courseData.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-gray-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-orange-500/20 text-orange-300 border-0 mb-2">
                  {courseData.category || "General"}
                </Badge>
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{courseData.lessons?.length || 0} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{courseData.enrollments?.length || 0} students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-4">
                <Target className="w-4 h-4 mr-2" />
                Course Details
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl text-gray-300">{courseData.description}</p>
            </div>

            {courseData.teacher?.name && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400">Instructor</p>
                  <p className="text-white font-semibold text-lg">
                    {courseData.teacher.name}
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {userRole === "student" && isEnrolled && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-semibold">Your Progress</p>
                  <p className="text-orange-300 font-semibold">
                    {Math.round(progress)}%
                  </p>
                </div>
                <div className="bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {courseData.lessons?.filter((l) => l.completed).length || 0}{" "}
                  of {courseData.lessons?.length || 0} lessons completed
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {userRole === "guest" && (
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-red-400" />
                    </div>
                    <p className="text-white font-semibold">
                      Login required to access this course
                    </p>
                  </div>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold w-full">
                      Login to Continue
                    </Button>
                  </Link>
                </div>
              )}

              {userRole === "student" && !isEnrolled && (
                <Button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-orange-500/25"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5 mr-2" />
                      Enroll Now
                    </>
                  )}
                </Button>
              )}

              {userRole === "student" && isEnrolled && (
                <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-xl">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Enrolled</span>
                </div>
              )}

              {userRole === "teacher" && (
                <div className="flex flex-wrap gap-4">
                  <Link href={`/edit-course/${courseData._id}`}>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold">
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Course
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Course
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Lessons</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {courseData.lessons?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Students</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {courseData.enrollments?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Price</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    ${courseData.price || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Created</p>
                  <p className="text-xl font-bold text-white mt-2">
                    {new Date(courseData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Course Content
              </Badge>
              <h2 className="text-3xl font-bold text-white">Lessons</h2>
            </div>

            {/* Add Lesson Button for Teachers */}
            {userRole === "teacher" && (
              <Link href={`/dashboard/addLesson/${courseData._id}`}>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add New Lesson
                </Button>
              </Link>
            )}
          </div>

          {courseData.lessons && courseData.lessons.length > 0 ? (
            <div className="space-y-4">
              {courseData.lessons.map((lesson, index) => (
                <Card
                  key={lesson._id}
                  className="group bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-300 hover:scale-102"
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          lesson.completed
                            ? "bg-green-500/20 text-green-300"
                            : "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <PlayCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">
                            Lesson {index + 1}
                          </span>
                          {lesson.completed && (
                            <Badge className="bg-green-500/20 text-green-300 border-0">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-white font-semibold group-hover:text-orange-300 transition-colors">
                          {lesson.title}
                        </h3>
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/lesson/${lesson._id}`}
                      onClick={() => handleLessonClick(lesson._id)}
                      className="flex items-center gap-2 text-orange-300 font-semibold hover:text-orange-400 transition-colors"
                    >
                      {userRole === "student" && isEnrolled ? (
                        <>
                          Watch Lesson
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : userRole === "teacher" ? (
                        <>
                          View Lesson
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Locked
                        </>
                      )}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No lessons available
                </h3>
                <p className="text-gray-400 mb-6">
                  This course doesn&apos;t have any lessons yet.
                </p>
                {userRole === "teacher" && (
                  <Link href={`/dashboard/addLesson/${courseData._id}`}>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold">
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add First Lesson
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">
                  What You&apos;ll Learn
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comprehensive understanding of {courseData.title}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Practical skills through hands-on lessons</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Industry-relevant knowledge and techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Certificate of completion for your portfolio</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">
                  Share This Course
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Know someone who might be interested in this course? Share it
                with them!
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out this course: ${
                        courseData.title
                      }&url=${encodeURIComponent(window.location.href)}`,
                      "_blank"
                    )
                  }
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 text-black hover:text-white"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                >
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border border-gray-800 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Delete Course
                  </h3>
                  <p className="text-gray-400">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="text-white font-semibold">
                  &quot;{courseData.title}&quot;
                </span>
                ? All lessons and enrollment data will be permanently removed.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Course"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
