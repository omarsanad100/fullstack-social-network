"use client";

import {
  createComment,
  deletePost,
  getPosts,
  toggleLike,
} from "@/actions/post.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "../deleteAlertDialog/DeleteAlertDialog";
import { Button } from "../ui/button";
import {
  HeartIcon,
  LogInIcon,
  MessageCircleIcon,
  SendIcon,
} from "lucide-react";
import { Textarea } from "../ui/textarea";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const PostCard = ({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);

  // For reply UI
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({});

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment({
        postId: post.id,
        content: newComment,
      });
      if (result?.success) {
        setNewComment("");
      }
    } catch (error) {
      // handle error if needed
    } finally {
      setIsCommenting(false);
    }
  };

  // Handle reply to a comment
  const handleAddReply = async (parentId: string) => {
    if (!replyContent[parentId]?.trim() || isReplying[parentId]) return;
    setIsReplying((prev) => ({ ...prev, [parentId]: true }));
    try {
      const result = await createComment({
        postId: post.id,
        content: replyContent[parentId],
        parentId,
      });
      if (result?.success) {
        setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
        setReplyingTo(null);
      }
    } catch (error) {
      // handle error if needed
    } finally {
      setIsReplying((prev) => ({ ...prev, [parentId]: false }));
    }
  };

  // Recursive render for nested comments
  function renderComments(
    comments: Post["comments"],
    parentId: string | null = null,
    level = 0
  ) {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((comment) => (
        <div key={comment.id} style={{ marginLeft: level * 24 }}>
          <div className="flex space-x-3 mt-2">
            <Avatar className="size-8 flex-shrink-0">
              <AvatarImage src={comment.author.image ?? "/avatar.png"} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-sm">
                  {comment.author.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  @{comment.author.username}
                </span>
                <span className="text-sm text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt))} ago
                </span>
              </div>
              <p className="text-sm break-words">{comment.content}</p>
              {user && (
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 text-xs"
                  onClick={() =>
                    setReplyingTo((prev) =>
                      prev === comment.id ? null : comment.id
                    )
                  }
                >
                  Reply
                </Button>
              )}
              {/* Reply form */}
              {replyingTo === comment.id && user && (
                <div className="mt-2 flex space-x-2">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent[comment.id] || ""}
                    onChange={(e) =>
                      setReplyContent((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    className="min-h-[60px] resize-none"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleAddReply(comment.id)}
                    disabled={
                      !replyContent[comment.id]?.trim() ||
                      isReplying[comment.id]
                    }
                  >
                    {isReplying[comment.id] ? (
                      "Posting..."
                    ) : (
                      <>
                        <SendIcon className="size-4" /> Reply
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Render replies recursively */}
          {renderComments(comments, comment.id, level + 1)}
        </div>
      ));
  }

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      // handle result if needed
    } catch (error) {
      // handle error if needed
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      className="overflow-hidden antialiased text-gray-800
    bg-gray-50
    dark:bg-gradient-to-r dark:from-[#070c16] dark:to-[#243b55]
    dark:text-gray-200
    rounded-xl"
    >
      <CardContent className="p-4 sm:p-6 bg-transparent shadow-none w-full rounded-xl">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold truncate"
                  >
                    {post.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href={`/profile/${post.author.username}`}>
                      @{post.author.username}
                    </Link>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === post.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-foreground break-words">
                {post.content}
              </p>
            </div>
          </div>

          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasLiked
                    ? "text-red-500 hover:text-red-600"
                    : "hover:text-red-500"
                }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span>{optimisticLikes}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2"
                >
                  <HeartIcon className="size-5" />
                  <span>{optimisticLikes}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${
                  showComments ? "fill-blue-500 text-blue-500" : ""
                }`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY NESTED COMMENTS */}
                {renderComments(post.comments)}
              </div>

              {/* New top-level comment form */}
              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          "Posting..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Sign in to comment
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default PostCard;
