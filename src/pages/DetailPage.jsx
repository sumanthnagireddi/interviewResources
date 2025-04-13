import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import Features from "../components/ui/Features";
import Editor from "../components/ui/Editor";
import { getResourceByName } from "../services/resourceService";
import DialogComponent from "../components/ui/Dialog";

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

  const { id, category, subCategory, topic } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getResourceByName(id, deslugify(category), deslugify(subCategory), deslugify(topic));
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, [id, category, subCategory, topic]);

  const handleItemClick = () => {
    setReadOnly(!readOnly);
  };

  // if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No data found</div>;

  return (
    <div>
      <DialogComponent/>
      <Breadcrumb pathArray={[category, subCategory, topic]} />
      <div className="py-10">
        <div className="flex items-start gap-2">
          <div className="w-full">
            <h3 className="text-xl font-bold text-gray-800">{data?.name}</h3>
            <Editor readOnly={true} htmlData={data?.content} />
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
