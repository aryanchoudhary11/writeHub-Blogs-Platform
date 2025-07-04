import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Container, PostForm } from "../components/index";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (post && userData) {
      console.log("Post.userId:", post.userID);
      console.log("UserData.$id:", userData.$id);
    }
  }, [post, userData]);

  const isAuthor = post && userData && post.userID === userData.$id;
  if (!post) return null;

  if (!isAuthor) {
    return (
      <div className="py-8">
        <Container>
          <h1 className="text-2xl font-bold text-red-500">
            Unauthorized Access
          </h1>
          <p className="text-gray-600">You cannot edit someone else's post.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}
export default EditPost;
