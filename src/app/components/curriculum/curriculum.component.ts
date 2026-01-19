import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  imports: [],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {

  openPdf() {
    window.open('assets/Felipe izquierdo CV 19-01-26.pdf', '_blank');
  }

}
