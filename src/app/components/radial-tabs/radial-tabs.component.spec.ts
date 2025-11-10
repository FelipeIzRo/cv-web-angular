import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialTabsComponent } from './radial-tabs.component';

describe('RadialTabsComponent', () => {
  let component: RadialTabsComponent;
  let fixture: ComponentFixture<RadialTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadialTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadialTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
