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
    console.log('focus: ' , tab)
    this.focusedTab = tab;
  }
}
