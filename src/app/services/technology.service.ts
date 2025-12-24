import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  firestore = inject(Firestore);
  technologiesCollectionRef = collection(this.firestore, 'technologies_new');
  technologiesCollectionRefString = 'technologies_new';
  topicsCollectionRef = collection(this.firestore, 'topics_new');
  topicsCollectionRefString = 'topics_new';
  Technologies_Endpoint = environment.API_URL + '/technologies';
  constructor(private http: HttpClient) {}

  getTechnologiesFromMongo() {
    return this.http.get(this.Technologies_Endpoint);
  }
  addTechnologyToMongo(technology_payload: any) {
    const payload = {
      ...technology_payload,
      slug: technology_payload?.name
        ?.trim() // remove leading/trailing spaces
        .toLowerCase() // convert to lowercase
        .replace(/\s+/g, '-') // replace spaces (one or more) with hyphens
        .replace(/[^a-z0-9-]/g, ''), // optional: remove special characters
    };

    return this.http.post(this.Technologies_Endpoint, payload);
  }

  getTechnologies(): Observable<any> {
    return from(getDocs(this.technologiesCollectionRef)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  }

  addTechnology(
    technology: any
  ): Observable<{ id: string; name: string; topic?: string }> {
    const id = uuidv4();
    const docRef = doc(
      this.firestore,
      this.technologiesCollectionRefString,
      id
    );
    const technologyName = technology?.name;
    const topicName = technology?.name;
    const data = {
      name: technologyName,
      createdOn: serverTimestamp(),
    };

    return from(setDoc(docRef, data)).pipe(
      map(() => ({
        id,
        name: technologyName,
        topic: topicName,
      }))
    );
  }
  addTopic(topic: {
    id: string;
    name: string;
    topic: string;
  }): Observable<{ id: string; name: string; topic: string }> {
    const id = uuidv4();
    const docRef = doc(
      this.firestore,
      this.technologiesCollectionRefString,
      id
    );
    const data = {
      topic: topic.topic,
      technologyId: topic.name,
      createdOn: serverTimestamp(),
    };
    return from(setDoc(docRef, data)).pipe(
      map(() => ({
        id,
        topic: topic.topic,
        name: topic.name,
      }))
    );
  }
}
