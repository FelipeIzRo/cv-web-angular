import { Component } from '@angular/core';

@Component({
  selector: 'app-about-panel',
  imports: [],
  templateUrl: './about-panel.component.html',
  styleUrl: './about-panel.component.css'
})
export class AboutPanelComponent {
  abierta = false;

  toggleCarta() {
    this.abierta = !this.abierta;
  }
}
