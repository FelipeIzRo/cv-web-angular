import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { RightPanelComponent } from "../right-panel/right-panel.component";


@Component({
  selector: 'app-radial-tabs',
  imports: [CommonModule, LeftPanelComponent, RightPanelComponent],
  templateUrl: './radial-tabs.component.html',
  styleUrl: './radial-tabs.component.css'
})
export class RadialTabsComponent {
  activeTab: 'about' | 'studies' | 'projects' | 'contact' | null = null;
  focusedTab: 'about' | 'studies' | 'projects' | 'contact' | null = null;

  openTab(tab: 'about' | 'studies' | 'projects' | 'contact') {
    this.activeTab = tab;
  }

  closeTab() {
    this.activeTab = null;
  }

  focusTab(tab: 'about' | 'studies' | 'projects' | 'contact' | null){
    this.focusedTab = tab;
  }

  getImagePath(){

    switch(this.activeTab){
      case 'about':
        console.log('/assets/SobreMi.jpg')
        return '/assets/SobreMi.jpg'
      case 'projects':
        console.log('/assets/Experiencia.jpg')
        return '/assets/Experiencia.jpg';
      case 'studies':
        console.log('/assets/Estudios.jpg');
        return '/assets/Estudios.jpg';
      case 'contact':
        console.log('/assets/Contacto.jpg');
        return '/assets/Contacto.jpg';
      case null:
        return '';
      default:
        return '';
    }
  }
}
