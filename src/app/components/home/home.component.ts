import { Component, inject, OnInit } from '@angular/core';
import { FireBaseService } from '../../services/fire-base-service/fire-base.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RadialTabsComponent } from "../radial-tabs/radial-tabs.component";
import { PersonalData } from '../../interfaces/personal-data';
import { DevelopPanelComponent } from "../develop-panel/develop-panel.component";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RadialTabsComponent, DevelopPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  public environment = environment;
  private fireBaseService = inject(FireBaseService);
  personalData: Observable<PersonalData | undefined> = this.fireBaseService.getPersonalData();
  

}
