import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  imports: [],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {

  openPdf() {
    window.open('assets/NEW_CurriculumAzul.pdf', '_blank');
  }

}
