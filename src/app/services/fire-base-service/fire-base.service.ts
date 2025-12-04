import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc, getDoc, collectionData, getDocs, QueryDocumentSnapshot, DocumentData, updateDoc } from '@angular/fire/firestore';
import { catchError, map, Observable, of } from 'rxjs';
import { PersonalData } from '../../interfaces/personal-data';
import { Studies } from '../../interfaces/studies';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor() { }
  private firestore = inject(Firestore);

  // De esta manera con un observable ves los cambios en tiempo real en la base de datos
  getPersonalData(): Observable<PersonalData | undefined> {
    const ref = doc(this.firestore, 'DATOS_PERSONALES', 'Lqxyb4o38VjsdnZrOF5q');
    return docData(ref) as Observable<PersonalData | undefined>;
  }
  // Este devuelve un Promise y no ve la informacion en tiempo real
  async getPersonalDataOnce(): Promise<PersonalData | undefined> {
    const ref = doc(this.firestore, 'DATOS_PERSONALES', 'Lqxyb4o38VjsdnZrOF5q');
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as PersonalData) : undefined;
  }

  getDocument<T>(docPath: string): Observable<T | undefined> {
    if (!this.firestore) {
      console.warn("Firestore no está inicializado. Retornando array vacío.");
      return of([] as T); // Retorna un Observable de un array vacío si firestore no está disponible
    }
    const docRef = doc(this.firestore, docPath);
    return docData(docRef) as Observable<T | undefined>
  }


  updateDocument(collection: string, documentId: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, collection, documentId);
    return updateDoc(docRef, data);
  }

  // Tambien se puede por ejemplo obtener lista con observables
  /*
    getExperiences() {
      const ref = collection(this.firestore, 'EXPERIENCIAS');
      return collectionData(ref, { idField: 'id' }); // Observable<any[]>
    }
  */

  // Como antes pero con Promise
  /*
    async getExperiencesOnce() {
      const ref = collection(this.firestore, 'EXPERIENCIAS');
      const snap = await getDocs(ref);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  */

  // Lectura con consultas

  /*
    getLastJobs() {
      const ref = collection(this.firestore, 'EXPERIENCIAS');
      const q = query(
        ref,
        where('type', '==', 'job'),  // solo trabajos
        orderBy('from', 'desc'),     // orden por fecha
        limit(5)                     // máximo 5
      );

      return collectionData(q, { idField: 'id' }); // Observable
    }
  */

  // Igual Pero con Promise y query
  /*
  async getCurrentJobsOnce() {
    const ref = collection(this.firestore, 'EXPERIENCIAS');
    const q = query(ref, where('isCurrent', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  */

  //! Todavia no comprendi esto
  // Actualizar (opcional, requiere Auth y reglas adecuadas)
  updatePersonalData(partial: Partial<PersonalData>) {
    const ref = doc(this.firestore, 'DATOS_PERSONALES', 'Lqxyb4o38VjsdnZrOF5q');
    return setDoc(ref, partial, { merge: true });
  }
  
}
