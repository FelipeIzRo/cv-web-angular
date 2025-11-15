import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent{
  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  @Input() title: string = 'default-text';
  @Input() contents: string = 'default-text'
  @Input() pathImg:string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
