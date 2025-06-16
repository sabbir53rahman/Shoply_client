"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ThumbsUp, ThumbsDown, Send, BookOpen, MessageSquare, Video, User, ArrowRight, Edit } from "lucide-react"

import { useGetLessonByIdQuery } from "@/redux/features/lessonSlice/lessonSlice"
import {
  useAddLikeMutation,
  useAddDislikeMutation,
  useRemoveLikeMutation,
  useRemoveDislikeMutation,
  useGetLikeQuery,
  useGetDislikeQuery,
} from "@/redux/features/likeSlice/likeSlice"

import { useAddCommentMutation, useGetLessonCommentsQuery } from "@/redux/features/commentSlice/commentSlice"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function LessonDetails() {
  const { id } = useParams()
  const user = useSelector((state) => state.user.user)
  const [userRole, setUserRole] = useState("student")

  const [commentContent, setCommentContent] = useState("")
  const [reactionLoading, setReactionLoading] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false)

  const [addComment] = useAddCommentMutation()

  const { data: comments, isLoading: isCommentsLoading, refetch: refetchComments } = useGetLessonCommentsQuery(id)

  const { data: lesson, isLoading, isError } = useGetLessonByIdQuery(id)

  const { data: userLike, refetch: refetchLike } = useGetLikeQuery(
    { lessonId: id, userId: user?._id },
    { skip: !user?._id },
  )

  const { data: userDislike, refetch: refetchDislike } = useGetDislikeQuery(
    { lessonId: id, userId: user?._id },
    { skip: !user?._id },
  )

  const [addLike] = useAddLikeMutation()
  const [addDislike] = useAddDislikeMutation()
  const [removeLike] = useRemoveLikeMutation()
  const [removeDislike] = useRemoveDislikeMutation()
  const [pendingReaction, setPendingReaction] = useState(null)
  const [localReaction, setLocalReaction] = useState(null) // 'like' | 'dislike' | null

  useEffect(() => {
    if (!user) {
      setUserRole("guest")
    } else if (user.role === "teacher") {
      setUserRole("teacher")
    } else {
      setUserRole("student")
    }
  }, [user])

  useEffect(() => {
    setLocalReaction(userLike ? "like" : userDislike ? "dislike" : null)
  }, [userLike, userDislike])

  const handleReaction = async (reactionType) => {
    if (!user?._id) return alert("Please login to react.")

    setPendingReaction(reactionType) // track which button is being clicked
    setReactionLoading(true)

    try {
      if (reactionType === "like") {
        if (localReaction !== "like") {
          await addLike({ lessonId: id, userId: user._id })
          if (localReaction === "dislike") {
            await removeDislike({ lessonId: id, userId: user._id })
          }
        }
      } else if (reactionType === "dislike") {
        if (localReaction !== "dislike") {
          await addDislike({ lessonId: id, userId: user._id })
          if (localReaction === "like") {
            await removeLike({ lessonId: id, userId: user._id })
          }
        }
      }

      await Promise.all([refetchLike(), refetchDislike()])
    } catch (err) {
      console.error("Reaction error:", err)
    } finally {
      setReactionLoading(false)
      setPendingReaction(null)
    }
  }

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) return
    setCommentLoading(true)

    try {
      await addComment({ lessonId: id, content: commentContent })
      setCommentContent("")
      refetchComments()
    } catch (err) {
      console.error("Failed to add comment:", err)
    } finally {
      setCommentLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-orange-400 text-xl font-semibold animate-pulse flex items-center gap-2">
          <div className="w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          Loading lesson...
        </div>
      </div>
    )
  }

  if (isError || !lesson) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-red-500 text-xl font-semibold">Failed to load lesson.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Lesson Details
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {lesson.title}
            </span>
          </h1>
          {lesson.teacher?.name && (
            <p className="text-xl text-gray-300">
              Instructor: <span className="text-orange-400 font-medium">{lesson.teacher.name}</span>
            </p>
          )}
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl mb-8">
          <CardContent className="p-6">
            {/* Video */}
            {lesson.videoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 border border-gray-700 shadow-lg shadow-orange-500/10">
                <iframe
                  src={lesson.videoUrl.replace("watch?v=", "embed/")}
                  title="Lesson Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {/* Description */}
            {lesson.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Video className="w-5 h-5 text-orange-400" />
                  About This Lesson
                </h3>
                <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
              </div>
            )}

            {/* Reaction Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => handleReaction("like")}
                disabled={reactionLoading}
                variant="outline"
                className={`px-6 py-2 h-auto rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  localReaction === "like"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-none"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                Like
                {reactionLoading && pendingReaction === "like" && (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                )}
              </Button>

              <Button
                onClick={() => handleReaction("dislike")}
                disabled={reactionLoading}
                variant="outline"
                className={`px-6 py-2 h-auto rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  localReaction === "dislike"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                Dislike
                {reactionLoading && pendingReaction === "dislike" && (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-orange-400" />
              Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Comment Input */}
            {userRole !== "guest" && (
              <div className="mb-8">
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Share your thoughts about this lesson..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl min-h-24 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 resize-none mb-3"
                  disabled={commentLoading}
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={commentLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 h-auto rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center gap-2"
                >
                  {commentLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  <Send className="w-4 h-4" />
                  Submit Comment
                </Button>
              </div>
            )}

            {/* Comments List */}
            {isCommentsLoading ? (
              <div className="text-orange-400 text-center py-8">
                <div className="w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                Loading comments...
              </div>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-orange-300">{comment.user?.name || "Anonymous"}</span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </CardContent>
        </Card>

        {/* User-based Actions */}
        <Card className="bg-gray-900/30 backdrop-blur-xl border border-gray-800 shadow-2xl">
          <CardContent className="p-6">
            {userRole === "guest" && (
              <div className="text-center py-4">
                <p className="text-red-400 font-semibold mb-3">Please login to access all features</p>
                <Link
                  href="/login"
                  className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25"
                >
                  Login Now
                </Link>
              </div>
            )}

            {userRole === "student" && lesson.nextLessonId && (
              <div className="text-center py-4">
                <Link
                  href={`/lesson/${lesson.nextLessonId}`}
                  className=" bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center gap-2 mx-auto"
                >
                  Next Lesson
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {userRole === "teacher" && (
              <div className="text-center py-4">
                <Link
                  href={`/edit-lesson/${lesson._id}`}
                  className=" bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center gap-2 mx-auto"
                >
                  <Edit className="w-5 h-5" />
                  Edit Lesson
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
