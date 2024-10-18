import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { useMemo, useRef, useEffect } from "react";
import { MARKS, plugins, TOOLS } from "./consts";
import { useCreateMarkdown } from "@/hooks/useCreateMarkdown";
import {  markdown } from "@yoopta/exports";

function Editor(props: {
  htmlData?: string;
  readOnly: boolean;
  resourceId?: string;
}) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);
  const updateMarkdownDoc = useCreateMarkdown(props?.resourceId);
  useEffect(() => {
    if (props?.htmlData) {
      deserializeHTML(props?.htmlData);
    }
  },[props?.htmlData]);

  const serializeHTML = () => {
    const data = editor.getEditorValue();
    return markdown.serialize(editor, data);
  };
  const deserializeHTML = (data: string) => {
    console.log(props.htmlData)
    const deserializedContent = markdown.deserialize(editor, data);
    editor.setEditorValue(deserializedContent);
  };

  const handleSave = async () => {
    try {
      await updateMarkdownDoc(serializeHTML());
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  console.log(props);
  return (
    <>
      {!props.readOnly && (
        <button
          onClick={handleSave}
          className="px-6 mx-2 bg-emerald-500 text-white py-1 text-sm rounded-lg"
        >
          Submit
        </button>
      )}

      <div className="px-[20px] max-w-none" ref={selectionRef}>
        <YooptaEditor
          readOnly={props?.readOnly}
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          selectionBoxRoot={selectionRef}
        />
      </div>
    </>
  );
}

export default Editor;
