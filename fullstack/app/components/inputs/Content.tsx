import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";

interface ContentProps {
  id: string;
  value?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

const Content: React.FC<ContentProps> = ({ id, value, onChange, disabled }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current?.editor) {
      const editor = editorRef.current.editor;
      editor.setContent("Initial content");

      setTimeout(() => {
        editor.setContent("New content");
      }, 2000);
    }
  }, []);

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
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
            "code",
            "help",
            "blockquote",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor table blockquote | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px },  {color: red}",
        }}
        id={id}
        value={value}
        onEditorChange={onChange}
        apiKey="l07a71p3889egqur57et40xsax7z9uo8o6vrwgwvtamfkfzc"
        disabled={disabled}
      />
    </div>
  );
};
export default Content;
