import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentDisplayComponent } from './environment-display.component';

describe('EnvironmentDisplayComponent', () => {
  let component: EnvironmentDisplayComponent;
  let fixture: ComponentFixture<EnvironmentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
