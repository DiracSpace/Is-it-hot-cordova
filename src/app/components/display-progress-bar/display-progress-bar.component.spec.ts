import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProgressBarComponent } from './display-progress-bar.component';

describe('DisplayProgressBarComponent', () => {
  let component: DisplayProgressBarComponent;
  let fixture: ComponentFixture<DisplayProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
