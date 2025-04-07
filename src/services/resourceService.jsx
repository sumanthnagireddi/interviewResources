import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import db from "../config";
export const getResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

export const getResourceById = async (id) => {
  try {
    const docRef = doc(db, "resources", id);
    const docSnap = await getDoc(docRef);
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    throw error;
  }
};

export const getResourceByName = async (id, topicName) => {
  const resource = await getResourceById(id);
  if (!resource) return null;

  for (const category of resource?.categories || []) {
    const topic = category.Topics?.find((t) => {
      if (typeof t === "string") {
        return t === topicName;
      } else {
        return t.name === topicName;
      }
    });

    if (topic) {
      return topic;
    }
  }

  return null; // Not found
};

export const updateTopicByName = async (
  id = "QFPHgSmKdgfbcg1HS1G9",
  topicName = "Arrow Functions",
  updatedContent
) => {
  const resource = await getResourceById("QFPHgSmKdgfbcg1HS1G9");
  console.log("🔍 Loaded resource:", resource);

  if (!resource) {
    console.warn("❌ Resource not found!");
    return null;
  }

  for (const category of resource.categories || []) {
    console.log("📂 Checking category:", category);

    const topicIndex = category.Topics?.findIndex((t) =>
      typeof t === "string" ? t === topicName : t.name === topicName
    );

    console.log("🔎 Found topicIndex:", topicIndex);

    if (topicIndex !== -1 && category.Topics) {
      const topic = category.Topics[topicIndex];
      console.log("🎯 Found topic:", topic);

      if (typeof topic === "object") {
        category.Topics[topicIndex] = {
          ...topic,
          content: updatedContent,
        };

        console.log("✅ Updated topic:", category.Topics[topicIndex]);

        // Now we know it's ready to save
        await saveResource(id, resource);

        return category.Topics[topicIndex];
      } else {
        console.warn("⚠️ Topic is a string, cannot update content.");
        return null;
      }
    }
  }

  return null;
};

const saveResource = async (id, updatedResource) => {
  console.log(updatedResource);
  const ref = doc(db, "resources", id); // adjust collection name as needed
  await setDoc(ref, updatedResource);
};
export const pushJsonIntoResourcesCollection = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "resources"), data);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
