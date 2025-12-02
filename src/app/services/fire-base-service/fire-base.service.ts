import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc, getDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalData } from '../../interfaces/personal-data';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor() { }
  private firestore = inject(Firestore);

  // De esta manera con un observable ves los cambios en tiempo real en la base de datos
  getPersonalData(): Observable<PersonalData | undefined> {
    const ref = doc(this.firestore, 'DATOS_PERSONALES','Lqxyb4o38VjsdnZrOF5q');
    return docData(ref) as Observable<PersonalData | undefined>;
  }
  // Este devuelve un Promise y no ve la informacion en tiempo real
  async getPersonalDataOnce(): Promise<PersonalData | undefined> {
    const ref = doc(this.firestore, 'DATOS_PERSONALES','Lqxyb4o38VjsdnZrOF5q');
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as PersonalData) : undefined;
  }

  getDocument<T>(collectionName:string, documentId:string):Observable<T | undefined> {
     if(!this.firestore){return {} as Observable<T | undefined>}
    const ref = collection(this.firestore, collectionName,documentId);
    return collectionData(ref) as Observable<T | undefined>;
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
    const ref = doc(this.firestore, 'DATOS_PERSONALES','Lqxyb4o38VjsdnZrOF5q');
    return setDoc(ref, partial, { merge: true });
  }
  
}
