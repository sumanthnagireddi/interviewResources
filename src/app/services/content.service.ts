import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, deleteDoc, doc, limit, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  firestore = inject(Firestore);
  contentCollectionRef = collection(this.firestore, 'content_new');
  contentCollectionRefString = 'content_new';

  constructor(private http: HttpClient) { }
  getContent(id: string): Observable<any> {
    const contentDocRef = doc(this.firestore, 'content_new', id);
    return from(getDoc(contentDocRef)).pipe(
      map(snapshot => {
        console.log('Fetched content snapshot:', snapshot.data());
        return {
          id: snapshot.id,
          ...snapshot.data()
        };
      })
    );
  }

  getAllContents(limitCount: number): Observable<any> {
    const docRef = collection(this.firestore, this.contentCollectionRefString);
    const q = query(docRef, limit(limitCount));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    );
  }

  addContent(contentName: string, id: string): Observable<any> {
    const docRef = doc(this.firestore, this.contentCollectionRefString, id)
    return from(setDoc(docRef, { content: contentName }))
  }
}
