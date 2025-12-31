import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { CurriculumComponent } from "../curriculum/curriculum.component";

@Component({
  selector: 'app-about-panel',
  imports: [CommonModule, CardComponent, PersonalInfoComponent, CurriculumComponent],
  templateUrl: './about-panel.component.html',
  styleUrl: './about-panel.component.css'
})
export class AboutPanelComponent {
  content: 'card' | 'personal-info' | 'curriculum' = 'card';
  title: 'Carta de presentacion' | 'Informacion personal' | 'Curriculum' = 'Carta de presentacion';

  changeContent(){
    switch(this.content){
      case 'card': this.title = 'Carta de presentacion'; break;
      case 'personal-info': this.title = 'Informacion personal'; break;
      case 'curriculum': this.title = 'Curriculum'; break;
    }
  }
}
