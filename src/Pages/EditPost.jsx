import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Container, PostForm } from "../components/index";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const isAuthor = post && userData && post.userID === userData.$id;

  if (!post) return null;

  if (!isAuthor) {
    return (
      <div className="py-16 min-h-screen bg-red-50">
        <Container>
          <div className="bg-white border border-red-200 rounded-lg p-8 shadow-sm text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Unauthorized Access
            </h1>
            <p className="text-gray-600">
              You are not allowed to edit someone else's post.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Edit Your Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;
