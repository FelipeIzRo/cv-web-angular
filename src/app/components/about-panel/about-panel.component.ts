import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { CurriculumComponent } from "../curriculum/curriculum.component";

type ContentType = 'card' | 'personal-info' | 'curriculum';

@Component({
  selector: 'app-about-panel',
  imports: [CommonModule, CardComponent, PersonalInfoComponent, CurriculumComponent],
  templateUrl: './about-panel.component.html',
  styleUrl: './about-panel.component.css'
})
export class AboutPanelComponent {

  currentIndex = 0;
  contents: ContentType[] = [ 'personal-info', 'card', 'curriculum'];
  content:ContentType = this.contents[this.currentIndex];
  title: 'Carta de presentacion' | 'Informacion personal' | 'Curriculum' = 'Informacion personal';

  changeContent(){
    switch(this.content){
      case 'card': this.title = 'Carta de presentacion'; break;
      case 'personal-info': this.title = 'Informacion personal'; break;
      case 'curriculum': this.title = 'Curriculum'; break;
    }
  }
  next(){
    if(this.currentIndex < this.contents.length - 1){
      this.currentIndex++;
      this.content = this.contents[this.currentIndex];
      this.changeContent();
    }
  }
  previous(){
    if(this.currentIndex > 0){
      this.currentIndex--;
      this.content = this.contents[this.currentIndex];
      this.changeContent();
    }
  }
  downloadCV() {
    const link = document.createElement('a');
    link.href = '/assets/MarcaAguaAmarilla.png';
    link.download = 'Felipe_Izquierdo_CV.pdf';
    link.click();
  }
  downloadCard() {
    const link = document.createElement('a');
    link.href = '/assets/MarcaAguaAmarillaModerna.png';
    link.download = 'Felipe_Izquierdo_CV.pdf';
    link.click();
  }
}
