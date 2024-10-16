import { useEffect, useState } from "react";
import db from "../config";
import { doc, getDoc } from "firebase/firestore";

const useGetMarkdownData = (resourceId: string | undefined) => {
  const [resource,setResource] = useState({});
  useEffect(() => {
    if (!resourceId) return;
    const fetchData = async () => {
        try {
            const docRef = doc(db, "resources", resourceId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              setResource({ id: docSnap.id, ...docSnap.data() });
            } else {
            //   setError('s');
            }
          } catch (err) {
            // setError("Failed to fetch data.");
            console.error("Error fetching document: ", err);
          } 
    
    };

    fetchData();
  }, [resourceId]);

  return resource
};

export default useGetMarkdownData;
