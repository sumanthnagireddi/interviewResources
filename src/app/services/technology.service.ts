import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  firestore = inject(Firestore);
  technologiesCollectionRef = collection(this.firestore, 'technologies_new');
  technologiesCollectionRefString = 'technologies_new';

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

  addTechnology(technologyName: string): Observable<any> {
    const docRef = doc(this.firestore, this.technologiesCollectionRefString, uuidv4())
    return from(setDoc(docRef, { name: technologyName }))
  }
}
