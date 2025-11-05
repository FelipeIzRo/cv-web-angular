import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface PersonalData {
  name: string;
  lastname: string;
  age: number;
  phone_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor() { }
  private firestore = inject(Firestore);

  // Realtime (se actualiza solo si cambias el doc en Firestore)
  getPersonalData(): Observable<PersonalData | undefined> {
    const ref = doc(this.firestore, 'DATOS_PERSONALES','Lqxyb4o38VjsdnZrOF5q');
    return docData(ref) as Observable<PersonalData | undefined>;
  }

  // Actualizar (opcional, requiere Auth y reglas adecuadas)
  updatePersonalData(partial: Partial<PersonalData>) {
    const ref = doc(this.firestore, 'DATOS_PERSONALES','Lqxyb4o38VjsdnZrOF5q');
    return setDoc(ref, partial, { merge: true });
  }
  
}
