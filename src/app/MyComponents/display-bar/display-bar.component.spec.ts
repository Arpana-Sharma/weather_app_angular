import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBarComponent } from './display-bar.component';

describe('DisplayBarComponent', () => {
  let component: DisplayBarComponent;
  let fixture: ComponentFixture<DisplayBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
