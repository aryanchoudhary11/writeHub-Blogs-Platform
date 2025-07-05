import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, featuredImage, title }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const url = await appwriteService.getFilePreview(featuredImage);
      setImageUrl(url);
    };

    fetchImage();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl shadow hover:shadow-lg transition p-4">
        <div
          className="w-full flex justify-center items-center mb-4 bg-gray-100 rounded-lg overflow-hidden"
          style={{ height: "12rem" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-contain max-h-48 mx-auto"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
