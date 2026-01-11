import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { RightPanelComponent } from "../right-panel/right-panel.component";


@Component({
  selector: 'app-radial-tabs',
  imports: [CommonModule, LeftPanelComponent, RightPanelComponent],
  templateUrl: './radial-tabs-refactor.component.html',
  styleUrl: './radial-tabs-refactor.component.css'
})
export class RadialTabsComponent implements OnInit, OnDestroy {
  activeTab: 'about' | 'studies' | 'experience' | 'contact' | null = null;
  focusedTab: 'about' | 'studies' | 'experience' | 'contact' | null = null;

  angle = 0;
  duration = 26000;

  private start = 0;
  private rafId!: number;

  ngOnInit() {
    this.start = performance.now();
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  private loop = () => {
    const now = performance.now();
    const elapsed = (now - this.start) % this.duration;

    this.angle = (elapsed / this.duration) * 360;

    this.checkMilestones();

    this.rafId = requestAnimationFrame(this.loop);
  };

  private lastAngle = 0;

  private checkMilestones() {
    this.checkCross(0, '0 / 360');
    this.checkCross(90, '90');
    this.checkCross(180, '180');
    this.checkCross(270, '270');
    this.lastAngle = this.angle;
  }

  private checkCross(target: number, label: string) {
    if (
      (this.lastAngle < target && this.angle >= target) ||
      (target === 0 && this.lastAngle > this.angle)
    ) {
      console.log(label);
    }
  }
  
  openTab(tab: 'about' | 'studies' | 'experience' | 'contact') {
    console.log('clicked: ',tab);
    this.activeTab = tab;
  }

  closeTab() {
    this.activeTab = null;
  }

  focusTab(tab: 'about' | 'studies' | 'experience' | 'contact' | null){
    this.focusedTab = tab;
  }

  getImagePath(){

    switch(this.activeTab){
      case 'about':
        // console.log('assets/SobreMi.jpg')
        return 'assets/SobreMi.jpg'
      case 'experience':
        // console.log('assets/Experiencia.jpg')
        return 'assets/Experiencia.jpg';
      case 'studies':
        // console.log('assets/Estudios.jpg');
        return 'assets/Estudios.jpg';
      case 'contact':
        // console.log('assets/Contacto.png');
        return 'assets/Contacto.png';
      case null:
        return '';
      default:
        return '';
    }
  }
}
