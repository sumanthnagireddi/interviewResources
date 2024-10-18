import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMarkdownData } from "@/hooks/useGetMarkdowndata";
import { useGetResources } from "@/hooks/useGetResources";
import { useState } from "react";

// Define types for resources and subResources

function Admin() {
  const resources = useGetResources();
  const [currentResource, setCurrentResource] = useState<object>({
    id: "",
    name: "",
  });
  const markdownData = useGetMarkdownData(currentResource?.id);
  const handleClick = (resource: object) => {
    setCurrentResource(resource);
  };
  console.log(Object.values(markdownData).length);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <a
            href="https://sumanthnagireddi1.web.app/"
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Select the resource to update
          </a>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60 max-h-[400px] overflow-y-auto">
          <DropdownMenuSeparator />
          {resources.map((resource) => (
            <DropdownMenuGroup key={resource.id}>
              {resource.subCourses ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {resource.name}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-60 max-h-[400px] overflow-y-auto">
                      {resource.subCourses.map((sub) => (
                        <DropdownMenuItem
                          onClick={() => handleClick(sub)}
                          key={sub.id}
                        >
                          {sub.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem onClick={() => setCurrentResource(resource)}>
                  {resource.name}
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="font-medium text-lg text-gray-800 pl-4">
        Selected Resource: {currentResource && currentResource.name}
      </span>
    </div>
  );
}

export default Admin;
