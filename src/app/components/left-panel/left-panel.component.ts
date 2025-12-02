import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';
import { Studies } from '../../interfaces/studies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent implements OnInit {

  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  // @Input() title: string = 'default-text';
  // @Input() contents: string = 'default-text'
  @Input() bgImage: 'about' | 'studies' | 'projects' | 'contact' | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg: string = '';
  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);

  ngOnInit(): void {
    this.panelData();
  }

  panelData() {
    const data: Observable<Studies[] | undefined> = this.fireBaseService.getDocumentArrayField<Studies>(
      'ESTUDIOS',                       // Nombre de la colección principal
      'JsQdBul7oM8HeoebALwJ',           // ID del documento que contiene el array
      'ESTUDIO'                         // ¡El nombre del campo dentro de ese documento que es un array!
    );

    data.subscribe({
      next: (studiesList: Studies[] | undefined) => {
        if (studiesList) {
          console.log("Lista de estudios desde el campo array:\n", studiesList);
          if (studiesList.length === 0) {
            console.log("El campo 'ESTUDIO' en el documento está vacío.");
          }
        } else {
          console.log("El campo 'ESTUDIO' no se encontró o no es un array en el documento.");
        }
      },
      error: (err) => {
        console.error('Error al obtener la lista de estudios del campo array:\n', err);
      },
      complete: () => {
        console.log('Obtención de lista de estudios del campo array completada.');
      }
    });

  }

  onClose() {
    this.close.emit();
  }
}
