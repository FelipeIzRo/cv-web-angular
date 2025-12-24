import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience-panel',
  imports: [CommonModule],
  templateUrl: './experience-panel.component.html',
  styleUrl: './experience-panel.component.css'
})
export class ExperiencePanelComponent {

  view: 'menu' | 'experience' | 'technologies' = 'menu';
  openPanels: Record<string, boolean> = {
    indra: false,
    mercanza: false
  };

  selectView(view:'menu' | 'experience' | 'technologies') {
    this.view = view;
  }

  togglePanel(panel: string) {
  this.openPanels[panel] = !this.openPanels[panel];
}

}
