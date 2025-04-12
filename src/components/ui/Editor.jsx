/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
// import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
// import { useMemo, useRef, useEffect } from "react";
// import { MARKS, plugins, TOOLS } from "./consts";
// import { useCreateMarkdown } from "@/hooks/useCreateMarkdown";
// import {  html, markdown } from "@yoopta/exports";

// function Editor(props: {
//   htmlData?: string;
//   readOnly: boolean;
//   resourceId?: string;
// }) {
//   const editor = useMemo(() => createYooptaEditor(), []);
//   const selectionRef = useRef(null);
//   const updateMarkdownDoc = useCreateMarkdown(props?.resourceId);
//   useEffect(() => {
//     if (props?.htmlData) {
//       deserializeHTML(props?.htmlData);
//     }
//   },[props?.htmlData]);

//   const serializeHTML = () => {
//     const data = editor.getEditorValue();
//     console.log(data)
//     return markdown.serialize(editor, data);
//   };
//   const deserializeHTML = (data: string) => {
//     console.log(props.htmlData)
//     const deserializedContent = html.deserialize(editor, data);
//     editor.setEditorValue(deserializedContent);
//   };

//   const handleSave = async () => {
//     try {
//       await updateMarkdownDoc(serializeHTML());
//     } catch (error) {
//       console.error("Error updating document:", error);
//     }
//   };
//   console.log(props);
//   return (
//     <>
//       {!props.readOnly && (
//         <button
//           onClick={handleSave}
//           className="px-6 mx-2 bg-emerald-500 text-white py-1 text-sm rounded-lg"
//         >
//           Submit
//         </button>
//       )}

//       <div className="md:px-[20px] max-w-none" ref={selectionRef}>
//         <YooptaEditor
//           readOnly={props?.readOnly}
//           editor={editor}
//           plugins={plugins}
//           tools={TOOLS}
//           marks={MARKS}
//           selectionBoxRoot={selectionRef}
//         />
//       </div>
//     </>
//   );
// }

// export default Editor;

import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { html } from "@yoopta/exports";
import { useEffect, useMemo, useRef } from "react";
import {  MARKS, plugins, TOOLS } from "./consts";
import { useCreateMarkdown } from "../../hooks/useCreateMarkdown";
import { updateTopicByName } from "../../services/resourceService";

const Editor = (props) => {
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

  const handleSave = async () => {
    try {
      await updateTopicByName(props?.resourceId,props?.topic,serializeHTML());
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  return (
    <div>
      {/* {!props.readOnly && ( */}
        <div>
          <button
            onClick={handleSave}
            className="px-6 mx-2 bg-emerald-500 text-white py-1 text-sm rounded-lg"
          >
            Submit
          </button>
         
        </div>
      {/* )} */}
      <div className="md:px-[20px] max-w-none" ref={selectionRef}>
        <YooptaEditor
          readOnly={!props?.readOnly}
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          selectionBoxRoot={selectionRef}
        />
      </div>
      
    </div>
  );
};

export default Editor;
