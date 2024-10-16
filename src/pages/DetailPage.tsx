import useGetMarkdownData from "@/hooks/useGetMarkdowndata";
import { useParams } from "react-router-dom";
import MDEditor,{ commands } from "@uiw/react-md-editor";


function DetailPage() {
  const { id } = useParams();
  const data = useGetMarkdownData(id);
  return (
    <>
      <div>
      {/* <MDEditor
      value={data.data}
    //   onChange={(val) => setValue(val || "")}
      commands={[
        commands.bold,
        commands.italic,
        commands.link,
        // Add or remove commands as needed
      ]}
    /> */}
      </div>
    </>
  );
}

export default DetailPage;
