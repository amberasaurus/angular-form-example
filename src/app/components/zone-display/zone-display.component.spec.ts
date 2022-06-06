import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDisplayComponent } from './zone-display.component';

describe('ZoneDisplayComponent', () => {
  let component: ZoneDisplayComponent;
  let fixture: ComponentFixture<ZoneDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
