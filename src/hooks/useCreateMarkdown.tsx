import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../config";

export const useCreateMarkdown = (resourceId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to replace undefined values with "left"
  const replaceUndefinedWithLeft = (obj: object): object => {
    if (Array.isArray(obj)) {
      return obj.map(replaceUndefinedWithLeft);
    }
    if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          value === undefined ? "left" : replaceUndefinedWithLeft(value),
        ])
      );
    }
    return obj;
  };

  // Function to update the markdown document
  const updateMarkdownDoc = async (content: object) => {
    if (!resourceId) {
      setError("Resource ID is required");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, "resources", resourceId);
      const updatedContent = replaceUndefinedWithLeft(Object.values(content));
      await updateDoc(docRef, { content: updatedContent });
    } catch (err) {
      console.error("Error updating document:", err);
      setError("Failed to update document");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateMarkdownDoc,
    loading,
    error,
  };
};
