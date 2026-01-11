import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { RightPanelComponent } from "../right-panel/right-panel.component";

type ClockSection = {
  angle: number;
  name: string;
};

@Component({
  selector: 'app-radial-tabs',
  imports: [CommonModule, LeftPanelComponent, RightPanelComponent],
  templateUrl: './radial-tabs-refactor.component.html',
  styleUrl: './radial-tabs-refactor.component.css'
})
export class RadialTabsComponent implements OnInit, OnDestroy {
  activeTab: 'about' | 'studies' | 'experience' | 'contact' | null = null;
  focusedTab: 'about' | 'studies' | 'experience' | 'contact' | null = null;

  clockText = 'Comencemos';
  angle = 0;
  duration = 26000;

  private start = 0;
  private rafId!: number;

  private lastAngle = 0;

  currentSection = 'studies';
  private running = true;

  sections: ClockSection[] = [
    {
      angle: 0,
      name: 'studies',
    },
    {
      angle: 90,
      name: 'contact',
    },
    {
      angle: 180,
      name: 'experience',
    },
    {
      angle: 270,
      name: 'about',
    }
  ];

  get visibleSection(): string {
    return this.activeTab ?? this.currentSection;
  }


  ngOnInit() {
    this.start = performance.now();
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  private loop = () => {
    if (!this.running) return;

    const now = performance.now();
    const elapsed = (now - this.start) % this.duration;

    this.angle = (elapsed / this.duration) * 360;
    this.checkMilestones();

    this.rafId = requestAnimationFrame(this.loop);
  };

  private checkMilestones() {
    for (const section of this.sections) {
      this.checkCross(section);
    }
    this.lastAngle = this.angle;
  }

  private checkCross(section: ClockSection) {
    const target = section.angle;

    const crossed =
      (this.lastAngle < target && this.angle >= target) ||
      (target === 0 && this.lastAngle > this.angle);

    if (crossed) {
      this.activateSection(section);
    }
  }

  private activateSection(section: ClockSection) {
    this.currentSection = section.name;

    console.log('Section:', section.name);
  }


  openTab(tab: 'about' | 'studies' | 'experience' | 'contact') {
    this.clockText = tab.charAt(0).toUpperCase().concat(tab.substring(1));
    this.activeTab = tab;
    this.stopClock();
  }

  closeTab() {
    this.activeTab = null;
    this.resumeClock();
    this.clockText = 'Sigamos';
  }
  private stopClock() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }
  private resumeClock() {
    this.start = performance.now(); // reinicia el tiempo
    this.lastAngle = this.angle;    // evita falsos cruces
    this.running = true;
    this.loop();
  }


  focusTab(tab: 'about' | 'studies' | 'experience' | 'contact' | null) {
    this.focusedTab = tab;
  }

  getImagePath() {

    switch (this.activeTab) {
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
