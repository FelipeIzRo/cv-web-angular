import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-radial-tabs',
  imports: [CommonModule],
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
