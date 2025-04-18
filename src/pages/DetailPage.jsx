import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import Features from "../components/ui/Features";
import Editor from "../components/ui/Editor";
import { getResourceByName, getTopicById, getTopicsByCategoryId } from "../services/resourceService";
import Loader from "../components/ui/Loader";
import Emptystate from "../components/ui/Emptystate";

const deslugify = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function DetailPage() {
  const [data, setData] = useState(null);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const {  category, subCategory, topic } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response=await getTopicById(topic)
      console.log(response)
      if (response[0]?.content) {
        setIsDataAvailable(true); 
        setData(response[0]);
        setLoading(false);
      } else {
        setIsDataAvailable(false);
        setLoading(false);
      }


    };
    fetchData();
  }, [ category, subCategory, topic]);

  const handleItemClick = () => {
    setReadOnly(!readOnly);
  };

  if (loading) return <div><Loader/></div>;
  // if (!isDataAvailable) return <div><Emptystate/></div>;

  return (
    <div>
      <Breadcrumb pathArray={[category, subCategory, topic]} />
      <div className="py-10">
        <div className="flex items-start gap-2">
          <div className="w-full">
           
            {
              isDataAvailable && (
                <div>
                   <h3 className="text-xl font-bold text-gray-800">{data?.name}</h3>
                <Editor readOnly={true} htmlData={data?.content} />

                </div>
              )
            }
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
