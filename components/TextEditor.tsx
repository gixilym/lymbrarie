import { useRef, useEffect } from "react";
import { Editor as EditorType } from "tinymce";
import { Editor } from "@tinymce/tinymce-react";
import useLoad from "@/hooks/useLoad";
import type { Component, Timer } from "@/utils/types";

export default function TextEditor(): Component {
  const { isLoading, finishLoading } = useLoad(true);
  const editorRef = useRef<EditorType | null>(null);

  useEffect(() => {
    const timer: Timer = setTimeout(() => finishLoading(), 500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  function handleChange(content: string): void {
    if (editorRef.current) {
      console.log(content);
    }
  }

  return (
    <section className="w-full h-full z-10 max-w-[1000px] px-6 pb-24">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <span className="loading loading-spinner text-secondary w-14" />
        </div>
      ) : (
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onEditorChange={handleChange}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            theme: "silver",
            content_css: "dark",
            custom_colors: true,
            min_height: 600,
            width: "100%",
            onboarding: false,
            menubar: false,
            plugins: [
              "preview",
              "importcss",
              "searchreplace",
              "autolink",
              "autosave",
              "save",
              "directionality",
              "code",
              "visualblocks",
              "visualchars",
              "fullscreen",
              "image",
              "link",
              "media",
              "codesample",
              "table",
              "charmap",
              "pagebreak",
              "nonbreaking",
              "anchor",
              "insertdatetime",
              "advlist",
              "lists",
              "wordcount",
              "help",
              "charmap",
              "quickbars",
              "emoticons",
              "accordion",
            ],
            toolbar:
              "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
          }}
        />
      )}
    </section>
  );
}
