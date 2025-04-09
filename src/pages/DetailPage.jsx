import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import Features from "../components/ui/Features";
import Editor from "../components/ui/Editor";
import { getResourceByName } from "../services/resourceService";

const deslugify = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function DetailPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readOnly, setReadOnly] = useState(true);

  const { id } = useParams();
  const location = useLocation();

  // ✅ Memoize pathSegments and lastSegment to avoid triggering useEffect repeatedly
  const pathSegments = useMemo(
    () => location.pathname.replace(/^\/course\//, "").split("/"),
    [location.pathname]
  );

  const lastSegment = useMemo(
    () => pathSegments[pathSegments.length - 1],
    [pathSegments]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getResourceByName(id, deslugify(lastSegment));
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, [id, lastSegment]);

  const handleItemClick = () => {
    setReadOnly(!readOnly);
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <Breadcrumb pathArray={pathSegments} />
      <div className="py-10">
        <div className="flex items-start gap-2">
          <div className="w-full">
            <h3 className="text-xl font-bold text-gray-800">{data?.name}</h3>
            <Editor readOnly={readOnly} htmlData={data?.content} />
          </div>
          <div className="mt-4">
            <Features onItemClick={handleItemClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
