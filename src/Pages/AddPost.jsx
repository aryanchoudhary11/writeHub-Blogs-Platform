import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="bg-white shadow-md rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create a New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
