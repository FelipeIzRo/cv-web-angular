import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  
  @Input()title: string | null = null;
  @Input()secondTitle: string | null = null;
  @Input()thirdTitle: string | null = null;
  @Input()content: string | null = null;
  openPanel:boolean = false;

  togglePanel(){
    this.openPanel = !this.openPanel;
  }
}
