import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePanelComponent } from './experience-panel.component';

describe('ExperiencePanelComponent', () => {
  let component: ExperiencePanelComponent;
  let fixture: ComponentFixture<ExperiencePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
