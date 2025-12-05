import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, signal, Signal, WritableSignal } from '@angular/core';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';
import { Studies } from '../../interfaces/studies';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-studies-panel',
  imports: [CommonModule],
  templateUrl: './studies-panel.component.html',
  styleUrl: './studies-panel.component.css'
})
export class StudiesPanelComponent implements OnInit, OnDestroy{

  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);
  public readonly studiesSignal:WritableSignal<Studies[]> = signal([]);
  private dataSubscription?: Subscription;

   expandedIndex = signal<number | null>(null);

toggleExpand(i: number) {
  this.expandedIndex.set(this.expandedIndex() === i ? null : i);
}

  ngOnInit(): void {
    this.setDocumentData();
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

}
