import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClimateOptionsComponent } from './display-climate-options.component';

describe('DisplayClimateOptionsComponent', () => {
  let component: DisplayClimateOptionsComponent;
  let fixture: ComponentFixture<DisplayClimateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayClimateOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayClimateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
