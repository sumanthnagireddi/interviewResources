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
import Editor from "@/components/ui/Editor";
import { useGetMarkdownData } from "@/hooks/useGetMarkdowndata";
import { useGetResources } from "@/hooks/useGetResources";
import { useState } from "react";

// Define types for resources and subResources
interface SubResource {
  id: string;
  name?: string; // Mark name as optional to allow undefined
}

interface Resource {
  id?: string;
  name?: string; // Mark name as optional to allow undefined
  subCourses?: SubResource[]; // Optional field if the resource has subCourses
}

function Admin() {
  const resources: Resource[] = useGetResources(); // Correct type for resources
  const [currentResource, setCurrentResource] = useState<Resource>({});
  const markdownData = useGetMarkdownData(currentResource?.id);
  const handleClick = (resource: Resource) => {
    setCurrentResource(resource);
  };

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
                    {resource.name || "Unnamed Resource"}{" "}
                    {/* Handling optional name */}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-60 max-h-[400px] overflow-y-auto">
                      {resource.subCourses.map((sub) => (
                        <DropdownMenuItem
                          onClick={() => handleClick(sub)}
                          key={sub.id}
                        >
                          {sub.name || "Unnamed SubResource"}{" "}
                          {/* Handling optional name */}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem onClick={() => setCurrentResource(resource)}>
                  {resource.name || "Unnamed Resource"}{" "}
                  {/* Handling optional name */}
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {currentResource?.id && (
        <span className="font-medium text-lg text-gray-800 pl-4">
          Selected Resource: {currentResource?.name}
        </span>
      )}
      <Editor
        resourceId={currentResource?.id}
        readOnly={false}
        htmlData={markdownData}
      />
    </div>
  );
}

export default Admin;
