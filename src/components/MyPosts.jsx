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
    if (userData?.$id) {
      appwriteService
        .getPosts([
          Query.equal("userID", userData.$id),
          Query.equal("status", "active"),
        ])
        .then((res) => {
          console.log("My Posts:", res);
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
    <div className="py-10 bg-gray-50 min-h-[70vh]">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Blog Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              You have not created any posts yet.
            </p>
            <Link
              to="/add-post"
              className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="bg-white rounded-xl shadow hover:shadow-md transition border p-4 flex flex-col justify-between"
              >
                <Link to={`/post/${post.$id}`}>
                  {imageUrls[post.$id] ? (
                    <img
                      src={imageUrls[post.$id]}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse mb-3" />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 hover:underline">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.$id, post.featuredImage)}
                    className="flex-1 text-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
