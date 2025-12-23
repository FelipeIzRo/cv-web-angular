import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesPanelComponent } from './studies-panel.component';

describe('StudiesPanelComponent', () => {
  let component: StudiesPanelComponent;
  let fixture: ComponentFixture<StudiesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudiesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
