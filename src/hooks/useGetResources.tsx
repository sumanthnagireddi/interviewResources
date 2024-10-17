import {  useState } from "react";
import { DATA } from "@/lib/resources";
interface Resource {
  id: string;
  // Define other fields that your resources might have, for example:
  name?: string;
  url?: string;
  subCourses?: Resource[];
}

export const useGetResources = () => {
  const [resources] = useState<Resource[]>(DATA);
  return resources;
};

