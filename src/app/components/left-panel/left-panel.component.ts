import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent{

  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  // @Input() title: string = 'default-text';
  // @Input() contents: string = 'default-text'
  @Input() bgImage: 'about' | 'studies' | 'projects' | 'contact' | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg:string = '';

  onClose() {
    this.close.emit();
  }
}
