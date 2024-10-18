import { doc, updateDoc } from "firebase/firestore";
import db from "../config";

export const useCreateMarkdown = (resourceId?: string) => {
  const updateMarkdownDoc = async (content: string) => {
    if (!resourceId) {
      return;
    }
    try {
      const docRef = doc(db, "resources", resourceId);
      await updateDoc(docRef, { content: content });
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  return updateMarkdownDoc;
};
