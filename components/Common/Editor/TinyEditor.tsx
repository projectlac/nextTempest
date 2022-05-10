import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="jvnq0huwvxzja1sev6byqabo1g6qc276no4top15pw2m6odd"
        onInit={(evt, editor) => (editorRef.current = editor)}
        // onEditorChange={(e) => {
        //   handleChange({ target: { name: "description", value: e } });
        // }}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          image_title: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image | " +
            "removeformat | help",
          content_style:
            "body { font-family:Montserrat,sans-serif; font-size:14px }",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache = editorRef.current.editorUpload.blobCache;
                var base64 = (reader.result as string).split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
        }}
      />
    </>
  );
}
