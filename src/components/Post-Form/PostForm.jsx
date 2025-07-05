import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../Appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      if (!userData || !userData.$id) {
        console.error("User data is not available");
        return;
      }
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });
        console.log("Created post response:", dbPost);
        if (dbPost && dbPost.$id) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          console.error("Post creation failed or missing $id", dbPost);
        }
      } else {
        console.error("File upload failed");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 36);
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  useEffect(() => {
    const loadPreview = async () => {
      if (post && post.featuredImage) {
        const url = await appwriteService.getFilePreview(post.featuredImage);
        setPreviewImageUrl(url);
      }
    };
    loadPreview();
  }, [post]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl p-6 shadow-md"
    >
      {/* Left Side – Content Editor */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Enter post title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Auto-generated or custom"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Side – Options */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full rounded-md overflow-hidden border">
            <img
              src={previewImageUrl}
              alt={post.title}
              className="object-cover w-full h-48"
            />
          </div>
        )}

        <Select
          label="Post Status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-600" : "bg-blue-600"}
          className="w-full text-white py-2 rounded-md font-medium"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
