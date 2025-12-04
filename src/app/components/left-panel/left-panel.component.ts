import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, signal, Signal, WritableSignal } from '@angular/core';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';
import { Studies } from '../../interfaces/studies';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent implements OnInit, OnDestroy{

  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  // @Input() title: string = 'default-text';
  // @Input() contents: string = 'default-text'
  @Input() bgImage: 'about' | 'studies' | 'projects' | 'contact' | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg: string = '';
  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);


  public readonly studiesSignal:WritableSignal<Studies[]> = signal([]);
  private dataSubscription?: Subscription;

  ngOnInit(): void {
    this.setDocumentData();
  }
  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
  setDocumentData(){

    // {ESTUDIO:Studies[]} esto solo porque el array tiene el field ESTUDIO para poder ser llamado
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

  onClose() {
    this.close.emit();
  }
}
