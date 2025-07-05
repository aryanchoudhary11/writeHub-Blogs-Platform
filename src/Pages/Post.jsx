import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

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

  useEffect(() => {
    const fetchImage = async () => {
      if (post?.featuredImage) {
        const url = await appwriteService.getFilePreview(post.featuredImage);
        setImageUrl(url);
      }
    };

    fetchImage();
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          )}
          {isAuthor && (
            <div className="absolute right-10 top-10 flex gap-3 z-10">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="prose max-w-none text-gray-800">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
