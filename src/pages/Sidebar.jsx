import DialogComponent1 from "../components/ui/DialogComponent";
import { useGetResources } from "../hooks/useGetResources";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModalContext } from "../context/ModalContext";
import { getResources } from "../services/resourceService";

const slugify = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const SidebarItem = ({ item, path = [], parentId, onAddClick }) => {
  const label = item.name || item.category || "Unnamed";
  const currentPath = [...path, slugify(label)];
  const id = item.id || parentId;

  const nestedKey = Object.keys(item).find(
    (key) => Array.isArray(item[key]) && key !== "Content"
  );
  const hasChildren = nestedKey && item[nestedKey]?.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <Link
          title={label}
          to={`/course/${id}/${currentPath.join("/")}`}
          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg"
        >
          {label.substr(0, 10) + (label.length > 10 ? "..." : "")}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium flex items-center w-full text-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <ul className="ml-4 border-l border-gray-300 pl-4">
          {item[nestedKey].map((subItem, index) => {
            if (typeof subItem === "string") {
              return (
                <SidebarItem
                  key={index}
                  item={{ name: subItem }}
                  path={currentPath}
                  parentId={id}
                  onAddClick={onAddClick}
                />
              );
            }

            return (
              <div className="flex ">
                <div className="flex-1">
                  <SidebarItem
                    key={index}
                    item={subItem}
                    path={currentPath}
                    parentId={id}
                    onAddClick={onAddClick}
                  />
                </div>

              </div>
            );
          })}
        </ul>
      </details>
    </li>
  );
};

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

function Sidebar() {
  // const [resources, setResources] = useState(useGetResources());
  const { refreshTrigger } = useModalContext();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
    console.log("📦 Fetched resources:", resources);
  }, [refreshTrigger]);

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
            <li className="flex items-center justify-between">
              <Link to={"/"}>
                <span className="flex items-center cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  Introduction
                </span>
              </Link>

            </li>

            {loading === false && (
              <SidebarList
                resources={resources}
              />
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;