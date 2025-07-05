import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | link image | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
