import { Component } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-main-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.css']
})
export class MainShellComponent {
  activeTab: 'about' | 'skills' | 'projects' | 'contact' | null = null;

  openTab(tab: 'about' | 'skills' | 'projects' | 'contact') {
    this.activeTab = tab;
  }

  closeTab() {
    this.activeTab = null;
  }
}