import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureDisplayComponent } from './enclosure-display.component';

describe('EnclosureDisplayComponent', () => {
  let component: EnclosureDisplayComponent;
  let fixture: ComponentFixture<EnclosureDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnclosureDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnclosureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
