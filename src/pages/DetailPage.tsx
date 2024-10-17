import Editor from "@/components/ui/Editor";
import { useGetMarkdownData } from "@/hooks/useGetMarkdowndata";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const data = useGetMarkdownData(id);
  if (!data) {
    return <p>Loading...</p>;
  }

  if (data && Object.keys(data).length === 0) {
    return <p>No data found for this ID.</p>;
  }

  return (
    <div>
      <Editor content={data} readOnlyMode={true} />
    </div>
  );
}

export default DetailPage;
