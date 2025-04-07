import { doc, updateDoc } from "firebase/firestore";
import db from "../config";

export const useCreateMarkdown = (resourceId) => {
  const updateMarkdownDoc = async (content) => {
    if (!resourceId) return;

    try {
      const docRef = doc(db, "resources", resourceId);
      await updateDoc(docRef, { content });
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  return updateMarkdownDoc;
};