import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, signal, Signal, WritableSignal } from '@angular/core';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';
import { Studies } from '../../interfaces/studies';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

type StudiesContent = {
  id:number,
  content:string
};

@Component({
  selector: 'app-studies-panel',
  imports: [CommonModule],
  templateUrl: './studies-panel.component.html',
  styleUrl: './studies-panel.component.css'
})
export class StudiesPanelComponent implements OnInit, OnDestroy{

  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);
  public readonly studiesSignal:WritableSignal<Studies[]> = signal([]);
  public readonly contentStudies:WritableSignal<StudiesContent[]> = signal([]);
  private dataSubscription?: Subscription;

   expandedIndex = signal<number | null>(null);

  toggleExpand(i: number) {
    this.expandedIndex.set(this.expandedIndex() === i ? null : i);
  }

  ngOnInit(): void {
    this.setDocumentData();
    this.setContentData();
  }
  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
  setDocumentData(){

    // {LISTA_DE_ESTUDIOS:Studies[]} esto solo porque el array tiene el field ESTUDIO para poder ser llamado
    this.dataSubscription = this.fireBaseService.getDocument<{LISTA_DE_ESTUDIOS:Studies[]}>('ESTUDIOS/JsQdBul7oM8HeoebALwJ')
    .subscribe({
      next:(value) => {
        console.log('VALUE: ' , value?.LISTA_DE_ESTUDIOS);
        this.studiesSignal.set(value?.LISTA_DE_ESTUDIOS ?? []);
      },
      error:(err) => {
        console.error('Error en get document');
      }
    })

  }

  setContentData(): void {
    //TODO Esto hay que guardarlo en la base de datos y cogerlo ahora esta mal
    this.contentStudies.set([
      {
        id: 1,
        content: 'Actualmente curso el Grado en Ingeniería Informática en la UNED, enfocado al análisis, diseño y desarrollo de sistemas software. \
        La formación cubre programación, bases de datos, ingeniería del software, sistemas y redes, \
        reforzando una base técnica sólida y una visión global del desarrollo.'
      },
      {
        id: 2,
        content: 'Curso intensivo de desarrollo web Back-End orientado a la creación de APIs REST, arquitectura de aplicaciones y buenas prácticas. \
        Incluye trabajo con bases de datos, control de versiones y enfoque en calidad del código, seguridad y escalabilidad.'
      },
      {
        id: 3,
        content: 'Grado Superior en desarrollo de aplicaciones multiplataforma, tanto móviles como de escritorio. \
        Formación en programación orientada a objetos, Java, bases de datos, servicios web y desarrollo de proyectos completos.'
      }
    ]);

  }

}
