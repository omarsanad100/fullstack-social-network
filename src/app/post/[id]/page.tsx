import { getPostById } from "@/actions/post.action";
import PostCard from "@/components/postCard/PostCard";
import { getDbUserId } from "@/actions/user.action"; // adjust path if needed

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  const dbUserId = await getDbUserId(); // or however you get the current user id

  if (!post) {
    return <div className="p-8 text-center">Post not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <PostCard post={post} dbUserId={dbUserId} />
    </div>
  );
}
