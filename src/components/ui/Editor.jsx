
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { html } from "@yoopta/exports";
import { useEffect, useMemo, useRef } from "react";
import {  MARKS, plugins, TOOLS } from "./consts";

const Editor = (props) => {
  console.log(props)
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  useEffect(() => {
    if (props?.htmlData) {
      deserializeHTML(props?.htmlData);
    }
  }, [props?.htmlData]);

  // from html to @yoopta content
  const deserializeHTML = (data) => {
    console.log(data);
    const content = html.deserialize(editor, data);
    editor.setEditorValue(content);
  };

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);
    console.log("html string", htmlString);
    return htmlString;
  };

  return (
      <div className="md:px-[20px] max-w-none" ref={selectionRef}>
        <YooptaEditor
          readOnly={props?.readOnly}
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          selectionBoxRoot={selectionRef}
        />
      </div>
      
  );
};

export default Editor;
