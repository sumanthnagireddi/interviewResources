import { useEffect, useState } from "react";
import db from "../config";
import { getDocs, collection } from "firebase/firestore";
import { DATA } from "@/lib/resources";
interface Resource {
  id: string;
  // Define other fields that your resources might have, for example:
  name?: string;
  url?: string;
  subCourses?: Resource[];
}

const useGetResources = () => {
  const [resources] = useState<Resource[]>(DATA);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resource[];
      console.log(fetchedData);
    };

    fetchData();
  }, []);

  return resources;
};

export default useGetResources;
