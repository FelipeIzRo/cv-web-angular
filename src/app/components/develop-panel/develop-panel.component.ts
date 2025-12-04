import { Component, HostListener, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';

@Component({
  selector: 'app-develop-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './develop-panel.component.html',
  styleUrl: './develop-panel.component.css'
})
export class DevelopPanelComponent {
  @Inject(FireBaseService) private fireBaseService = inject(FireBaseService);


  // Posición inicial del panel
  top = 100;
  left = 100;

  // Para controlar el drag
  private dragging = false;
  private offsetX = 0;
  private offsetY = 0;

  // Inputs (empiezan vacíos)
  field1 = 'ESTUDIOS';
  field2 = 'JsQdBul7oM8HeoebALwJ';
  field3 = '';

  // Cuando pulsas en la barra superior
  onDragStart(event: MouseEvent) {
    this.dragging = true;
    this.offsetX = event.clientX - this.left;
    this.offsetY = event.clientY - this.top;
    event.preventDefault(); // Evita selección de texto
  }

  // Movemos el panel siguiendo al ratón
  @HostListener('window:mousemove', ['$event'])
  onDragMove(event: MouseEvent) {
    if (!this.dragging) return;
    this.left = event.clientX - this.offsetX;
    this.top = event.clientY - this.offsetY;
  }

  // Soltamos el panel al soltar el ratón en cualquier parte
  @HostListener('window:mouseup')
  onDragEnd() {
    this.dragging = false;
  }

  public update(){
    this.fireBaseService.updateDocument(this.field1,this.field2, JSON.parse(this.field3))
  }
}
