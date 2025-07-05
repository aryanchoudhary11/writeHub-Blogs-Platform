import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 py-12">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-700 mb-2">
              No Posts Available
            </h1>
            <p className="text-gray-500 text-lg">
              Login or create a post to get started.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Latest Blog Posts
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
