import { useGetResources } from "@/hooks/useGetResources";
import { Link } from "react-router-dom";

function Sidebar() {
  const resources = useGetResources();
  return (
    <div className="w-full ">
      <div className="flex max-h-[90vh] overflow-y-auto flex-col justify-between border-e bg-white">
        <div className="md:px-4 md:py-4">
          <span className=" hidden lg:flex items-center">
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

          <ul className="mt-4 md:mt-10 space-y-1">
            <li>
              <Link to={"/"}>
                <span className="flex items-center cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  Introduction
                </span>
              </Link>
            </li>
            {resources.map((res) =>
              res.subCourses ? (
                <li key={res.id}>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium flex cursor-pointer items-center  w-full text-nowrap overflow-hidden text-ellipsis"> {res.name} </span>

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

                    <ul className="mt-2 space-y-1 md:px-4">
                      {res.subCourses.map((res) => (
                        <li key={res.id}>
                          <Link to={`course/${res.id}`}>
                            <span className="flex items-center cursor-pointer rounded-lg md:px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              {res.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={res.id}>
                  <Link to={`course/${res.id}`}>
                    <span className="flex items-center cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      {res.name}
                    </span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
