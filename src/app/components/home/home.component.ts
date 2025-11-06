import { Component, inject, OnInit } from '@angular/core';
import { FireBaseService, PersonalData } from '../../services/fire-base-service/fire-base.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RadialTabsComponent } from "../radial-tabs/radial-tabs.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RadialTabsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  private fireBaseService = inject(FireBaseService);
  personalData: Observable<PersonalData | undefined> = this.fireBaseService.getPersonalData();
  

}
