import { useEffect, useMemo, useRef } from "react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { useCreateMarkdown } from "@/hooks/useCreateMarkdown";

interface EditorProps {
  readOnlyMode?: boolean;
  content?: unknown[]; // Specify a more accurate type if possible
}

export default function Editor(props: EditorProps) {
  const plugins = [
    Paragraph,
    Table,
    Divider.extend({
      elementProps: {
        divider: (props) => ({
          ...props,
          color: "#007aff",
        }),
      },
    }),
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
  ];

  const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

  const TOOLS = {
    ActionMenu: {
      render: DefaultActionMenuRender,
      tool: ActionMenuList,
    },
    Toolbar: {
      render: DefaultToolbarRender,
      tool: Toolbar,
    },
    LinkTool: {
      render: DefaultLinkToolRender,
      tool: LinkTool,
    },
  };

  const { updateMarkdownDoc } = useCreateMarkdown("oZaYil2DwBeI3BKm8903");
  const selectionRef = useRef<HTMLDivElement>(null);
  const editor = useMemo(() => createYooptaEditor(), []);

  const getEditorContent = () => {
    const content = editor.getEditorValue();
    updateMarkdownDoc(content);
  };

  function handleChange(value: unknown) {
    console.log("value", value);
  }

  useEffect(() => {
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  return (
    <>
      <div ref={selectionRef} className="px-8 max-w-none">
        <YooptaEditor
          value={props.content || []} // Provide a default empty array
          selectionBoxRoot={selectionRef}
          readOnly={props.readOnlyMode}
          tools={TOOLS}
          marks={MARKS}
          plugins={plugins}
          editor={editor}
          width="100%"
        />
      </div>
      <div className="mt-4">
        <button
          onClick={getEditorContent}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Get Editor Content
        </button>
      </div>
    </>
  );
}
