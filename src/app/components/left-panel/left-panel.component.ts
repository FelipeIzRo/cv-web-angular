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
export class LeftPanelComponent implements OnInit{

  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  // @Input() title: string = 'default-text';
  // @Input() contents: string = 'default-text'
  @Input() bgImage: 'about' | 'studies' | 'projects' | 'contact' | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg:string = '';
  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);

  ngOnInit(): void {
    this.panelData();
  }

  panelData(){
    const data:Observable<Studies | undefined> = this.fireBaseService.getDocument<Studies>('ESTUDIOS','JsQdBul7oM8HeoebALwJ/ESTUDIO');
    data.subscribe({
      next: (valor) => {
        console.log("valor:\n", JSON.stringify(valor));
      },
      error: (err) => {
        console.error('error:\n', err);
      },
      complete: () => {
        console.log('completed');
      }
    })
  }

  onClose() {
    this.close.emit();
  }
}
