import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      console.log("Fetched Posts:", posts);
      if (posts) {
        const activePosts = posts.documents.filter(
          (post) => post.status === "active"
        );
        setPosts(activePosts);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Explore All Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No posts available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
