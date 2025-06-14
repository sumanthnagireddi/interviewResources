import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  firestore = inject(Firestore);
  technologiesCollectionRef = collection(this.firestore, 'technologies');


  constructor(private http: HttpClient) { }
  getTechnologies(): Observable<any> {
    return from(getDocs(this.technologiesCollectionRef)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );

  }

  getCategoriesByTechnologyId(technologyId: any): Observable<any> {
    const categoriesRef = collection(this.firestore, "categories");
    const q = query(categoriesRef, where("parent", "==", technologyId));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  };

  addNewCategory(category: any): Observable<any> {
    const docRef = doc(this.firestore, 'categories', uuidv4())
    return from(setDoc(docRef, category))
  }
  getTopicById(id: string): Observable<any[]> {
    const docRef = collection(this.firestore, 'topicContents');
    const q = query(docRef, where('parent', '==', id));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }))
      )
    );
  }
  getAllContents(): Observable<any> {
    const docRef = collection(this.firestore, 'topicContents');
    const q = query(docRef, where('parent', '==', 'a22907c8-5f21-4cfe-89b6-a754859ac88e'));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()[0],
        }))
      )
    );
  }
  // updateTopicContent
  updateTopicContentById(payload: any) {
    const docRef = doc(this.firestore, "topicContents", payload.id);
    return from(setDoc(docRef, { content: payload.data }, { merge: true }))
  };
  addNewTopicContent(topic: any) {
    const docRef = doc(this.firestore, 'topicContents', uuidv4())
    return from(setDoc(docRef, topic))
  }
  //getbyId
  getTechnologyById = async (id: string) => {
    try {
      const docRef = doc(this.firestore, "technologies", id);
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
  // update
  updateTechnologyById = async (id: string, updatedData: any) => {
    try {
      const docRef = doc(this.firestore, "technologies", id);
      await setDoc(docRef, updatedData, { merge: true });
      // console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  // delete
  // todo- when deleteing a technology, delete all categories and topics related to it
  deleteTechnologyById = async (id: string) => {
    try {
      const docRef = doc(this.firestore, "technologies", id);
      await deleteDoc(docRef);
      // console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  // add new technology
  addNewTechnology = async (technology: any) => {
    try {
      const docRef = doc(this.firestore, 'technologies', uuidv4())
      await setDoc(docRef, technology,);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
  // categories collection
  // getAllCategoriesByTechnologyId

  // add new category

  // updateCategory
  updateCategoryById = async (id: string, updatedData: any) => {
    try {
      const docRef = doc(this.firestore, "categories", id);
      await setDoc(docRef, updatedData, { merge: true });
      // console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  // delete category
  // todo- when deleteing a category, delete all topics related to it
  deleteCategoryById = async (id: string) => {
    try {
      const docRef = doc(this.firestore, "categories", id);
      await deleteDoc(docRef);
      // console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  // topics collection && topicContents collection
  // getAllTopicsByCategoryId
  getTopicsByCategoryId = async (categoryId: any) => {
    try {
      const topicsRef = collection(this.firestore, "topics");
      const q = query(topicsRef, where("parent", "==", 'a22907c8-5f21-4cfe-89b6-a754859ac88e'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  };

  // updateTopicById
  updateTopicById = async (id: string, updatedData: any) => {
    try {
      const docRef = doc(this.firestore, "topics", id);
      await setDoc(docRef, updatedData, { merge: true });
      // console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  // // updateTopicContent
  // updateTopicContentById = async (id: string, updatedData: any) => {
  //   try {
  //     const docRef = doc(this.firestore, "topicContents", id);
  //     await setDoc(docRef, { content: updatedData }, { merge: true });
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //   }
  // };
  // deleteTopicById
  deleteTopicById = async (id: string) => {
    try {
      const docRef = doc(this.firestore, "topics", id);
      await deleteDoc(docRef);
      // console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  // addNewTopic
  addNewTopic = async (topic: any) => {
    try {
      const docRef = doc(this.firestore, 'topics', uuidv4())
      await setDoc(docRef, topic,);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
  // addNewTopicContent
  // addNewTopicContent = async (topic: any) => {
  //   try {
  //     const docRef = doc(this.firestore, 'topicContents', uuidv4())
  //     await setDoc(docRef, topic,);
  //     return docRef;
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //     throw error;
  //   }
  // }
}

