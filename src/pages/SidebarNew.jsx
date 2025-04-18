import DialogComponent1 from "../components/ui/DialogComponent";
import { useGetResources } from "../hooks/useGetResources";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModalContext } from "../context/ModalContext";
import { getCategoriesByTechnologyId, getResources, getTechnologies, getTopicsByCategoryId } from "../services/resourceService";


const SidebarList = ({ resources, onAddClick }) => {
  return (
    <ul className="bg-white p-4 border-r space-y-1">
      {resources?.map((stack) => (
        <div className="flex" key={stack.id}>
          <div className="flex-1">
            <SidebarItem
              item={stack}
              parentId={stack.id}
              onAddClick={onAddClick}
            />
          </div>

        </div>
      ))}
    </ul>
  );
};

const slugify = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Sidebar() {
  // const [resources, setResources] = useState(useGetResources());
  const { refreshTrigger } = useModalContext();
  const [loading, setLoading] = useState(true);
  const [technologies, setTechnologies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [openTechnologyId, setOpenTechnologyId] = useState(null);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [openTopicId, setOpenTopicId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        const technolgoies = await getTechnologies();
        const categories = await getCategoriesByTechnologyId('926d3dbc-db95-43ea-bcab-a2e15448d1c7');

        setTechnologies(technolgoies);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [refreshTrigger]);

  const handleSidebarTechnologyClick = async (e) => {
    const categories = await getCategoriesByTechnologyId(e);
    console.log(categories)
    setCategories(categories);
  }

  const handleToggle = (id) => {
    setOpenTechnologyId(id);
    setCategories([]);
    handleSidebarTechnologyClick(id); 
  };

  const handleSidebarCategoryClick = async (e) => {
    const categories = await getCategoriesByTechnologyId(e);
    setCategories(categories);
  }

  const handleCategoryClickToggle = async (id) => {
    console.log(id)
    setOpenCategoryId(id);
    setTopics([]);
    const topics = await getTopicsByCategoryId(id);
    setTopics(topics);
  }
  const handleSidebarTopicClick = (id) => {
    setOpenTopicId(id);
    const dynamicPath = `/course/${openTechnologyId}/${openCategoryId}/${id}`;
    navigate(dynamicPath);
  }
  return (
    <div className="w-full">
      <div className="flex max-h-[97vh] overflow-y-auto flex-col justify-between border-e bg-white">
        <div className="md:px-4 md:py-4">
          <span className="hidden lg:flex items-center">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 md:pl-2">
              <path
                className="fill-emerald-400"
                d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
              ></path>
            </svg>
            <span className="font-semibold text-lg fill-zinc-900">
              Sumanth Nagireddi
            </span>
          </span>

          <ul className="mt-4 md:mt-6 space-y-1">
            <li key={"introduction"} className="flex items-center justify-between">
              <Link to={"/"}>
                <span className="flex items-center cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  Introduction
                </span>
              </Link>

            </li>

            {loading === false && (

              <ul className="ml-4 border-l border-gray-300 pl-4">
                {technologies?.map((technology) => (
                  <li key={technology.id} className="flex items-center justify-between">
                    <details open={openTechnologyId === technology.id} className="group [&_summary::-webkit-details-marker]:hidden w-full">
                      <summary onClick={(e) => {
                        e.preventDefault();
                        handleToggle(technology.id);
                      }}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <span className="text-sm font-medium flex items-center w-full text-nowrap overflow-hidden text-ellipsis">{technology.name}</span>
                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </summary>

                      <ul className="ml-4 border-l border-gray-300 pl-4 space-y-1 px-4">
                        {categories?.map((category) => (
                          <li key={category?.docId}>
                            {category?.id}
                            <details open={openCategoryId === category.docId} className="group [&_summary::-webkit-details-marker]:hidden w-full">
                              <summary onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClickToggle(category?.docId);
                              }}
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-sm font-medium flex items-center w-full text-nowrap overflow-hidden text-ellipsis">{category.name}</span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              </summary>
                              <ul className=" space-y-1 px-4 ml-4 border-l border-gray-300 pl-4">
                                {topics?.map((topic) => (
                                  <li className="text-sm justify-between rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2 cursor-pointer font-medium flex items-center w-full text-nowrap overflow-hidden text-ellipsis" onClick={(e) => {e.preventDefault()
                                    handleSidebarTopicClick(topic?.docId)}} key={topic?.docId}>
                                    {topic.name}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;