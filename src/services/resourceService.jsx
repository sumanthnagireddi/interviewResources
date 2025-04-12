import {collection,addDoc,getDocs,doc,getDoc,setDoc,arrayUnion,updateDoc} from "firebase/firestore";
import db from "../config";
import { v4 as uuidv4 } from "uuid";
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

export const getResourceByName = async (id, category, subCategory, topicName) => {
  const resource = await getResourceById(id);
  if (!resource) return null;

  const matchedCategory = resource.categories?.find(
    (cat) => cat.name === subCategory
  );

  if (!matchedCategory || !Array.isArray(matchedCategory.Topics)) return null;

  const matchedTopic = matchedCategory.Topics.find(
    (topic) =>
      (typeof topic === "string" && topic === topicName) ||
      (typeof topic === "object" && topic.name === topicName)
  );

  return matchedTopic || null;
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
export const updateResourceById = async (updatedResource) => {
  try {
    const docRef = doc(db, "resources", updatedResource.technology );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const categories = data.categories || [];

      // Find the category to update (e.g., first category or by name)
      const index = categories.findIndex(cat => cat.name === updatedResource.category);

      if (index !== -1) {
        const updatedTopics = categories[index].Topics || [];
        updatedTopics.push({ name: updatedResource.subcategory });
        categories[index].Topics = updatedTopics;

        // Firebase update
        await updateDoc(docRef, {
          categories: categories
        });

        console.log("Subcategory added successfully!");
      } else {
        await updateDoc(docRef, {categories: arrayUnion({ name: updatedResource.category, Topics: [] })});
        console.log("Category not found.");
      }
    } else {
      const docRef = doc(db, "resources",uuidv4() );
      setDoc(docRef, {name: updatedResource.technology, categories: [] })
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const saveResource = async (id, updatedResource) => {
  console.log(updatedResource);
  const ref = doc(db, "resources", id);
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
