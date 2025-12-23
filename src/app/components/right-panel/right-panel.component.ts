import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudiesPanelComponent } from "../studies-panel/studies-panel.component";

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule, StudiesPanelComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent{
  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  @Input() title: string = 'default-text';
  @Input() contents: string = 'default-text'
  @Input() activeTab: string | undefined = undefined;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg:string = '';

  onClose() {
    this.close.emit();
  }
}
