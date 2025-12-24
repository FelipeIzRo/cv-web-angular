import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExperiencePanelComponent } from "../experience-panel/experience-panel.component";

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule, ExperiencePanelComponent],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent{

  @Input() visible: boolean = false;
  //TODO Esto falta por poner que el padre llame a firebase y cargue los textos
  // @Input() title: string = 'default-text';
  // @Input() contents: string = 'default-text'
  @Input() activeTab: string | undefined = undefined;
  @Output() close = new EventEmitter<void>();
  @Input() pathImg: string = '';

  onClose() {
    this.close.emit();
  }
}
