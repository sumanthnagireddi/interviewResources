import { useEffect, useState } from "react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Features from "../components/ui/Features";
import { getResourceByName } from "../services/resourceService";
import Editor from "../components/ui/Editor";
import { useParams } from "react-router-dom";
const deslugify = (slug) => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readOnly,setReadOnly]=useState(true)
  const pathSegments = location.pathname.replace(/^\/course\//, "").split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const {id} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getResourceByName(id,deslugify(lastSegment));
      console.log(response)
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, [id,pathSegments]);
  const handleItemClick = () => {
    setReadOnly(!readOnly)
    // You can handle the click logic here
  };
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  const htmlContent = data?.content;

  return (
    <div >
      <Breadcrumb pathArray={pathSegments} />
      <div className="py-10">
        <div className="flex items-start gap-2">
          <div className="w-full">
            <h3 className="text-xl font-bold text-gray-800">{data?.name}</h3>
            <Editor readOnly={readOnly} htmlData={htmlContent}  />
          </div>
          <div className="mt-4"><Features onItemClick={handleItemClick} /></div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
