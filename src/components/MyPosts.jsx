import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Container } from "../components";
import { Query } from "appwrite";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService
        .getPosts([Query.equal("userID", userData.$id)])
        .then((res) => {
          if (res) setPosts(res.documents);
        });
    }
  }, [userData]);

  useEffect(() => {
    const fetchAllImages = async () => {
      const urls = {};
      for (const post of posts) {
        const url = await appwriteService.getFilePreview(post.featuredImage);
        urls[post.$id] = url;
      }
      setImageUrls(urls);
    };
    if (posts.length > 0) fetchAllImages();
  }, [posts]);

  const handleDelete = async (postId, fileId) => {
    await appwriteService.deletePost(postId);
    await appwriteService.deleteFile(fileId);
    setPosts((prev) => prev.filter((post) => post.$id !== postId));
  };

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-bold mb-6">My Posts</h1>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-lg">
            You have not created any posts yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {posts.map((post) => (
              <div key={post.$id} className="w-1/3 p-4 border rounded-lg">
                <Link to={`/post/${post.$id}`}>
                  {imageUrls?.[post.$id] ? (
                    <img
                      src={imageUrls[post.$id]}
                      alt={post.title}
                      className="w-full rounded-lg mb-2"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                  )}
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                </Link>
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.$id, post.featuredImage)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyPosts;
