/* eslint-disable @typescript-eslint/no-explicit-any */
import { getResources } from "../services/resourceService";
import { useEffect, useState } from "react";

export const useGetResources = () => {
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
  }, []);

  return { resources, loading };
};

