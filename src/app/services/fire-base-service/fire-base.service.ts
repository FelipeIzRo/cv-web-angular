import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc, getDoc, collectionData, getDocs, QueryDocumentSnapshot } from '@angular/fire/firestore';
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

  getDocument<T>(collectionName: string, documentId: string): Observable<T[]> {
    if (!this.firestore) {
      console.warn("Firestore no está inicializado. Retornando array vacío.");
      return of([]); // Retorna un Observable de un array vacío si firestore no está disponible
    }
    // La referencia a la subcolección es correcta
    const ref = collection(this.firestore, collectionName, documentId, 'ESTUDIO');

    // collectionData retorna Observable<T[]>, así que el cast es a Observable<T[]>
    // Añadimos { idField: 'id' } para que el ID del documento se incluya en cada objeto
    return collectionData(ref, { idField: 'id' }) as Observable<T[]>;
  }

  getDocumentArrayField<T>(collectionName: string, documentId: string, arrayFieldName: string): Observable<T[] | undefined> {
    if (!this.firestore) {
      console.warn("Firestore no está inicializado. Retornando undefined.");
      return of(undefined);
    }

    // 1. Obtiene la referencia al documento específico (el "documento padre")
    const docRef = doc(this.firestore, collectionName, documentId);

    // 2. Usa docData() para obtener el contenido del documento como un Observable
    //    Luego, usamos el operador map para extraer el array del campo deseado
    return docData(docRef).pipe(
      map(documentSnapshot => {
        if (documentSnapshot && documentSnapshot[arrayFieldName] && Array.isArray(documentSnapshot[arrayFieldName])) {
          // Si el documento existe, tiene el campo, y es un array,
          // lo casteamos a T[] y lo retornamos.
          return documentSnapshot[arrayFieldName] as T[];
        }
        // Si no se encuentra el documento, el campo, o no es un array, retornamos undefined
        return undefined;
      }),
      catchError(error => {
        console.error(`Error al obtener el campo '${arrayFieldName}' del documento '${documentId}':`, error);
        return of(undefined); // Devuelve un Observable de undefined en caso de error
      })
    );
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
