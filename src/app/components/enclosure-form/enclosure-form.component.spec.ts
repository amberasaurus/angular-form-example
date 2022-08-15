import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureFormComponent } from './enclosure-form.component';

describe('EnclosureFormComponent', () => {
  let component: EnclosureFormComponent;
  let fixture: ComponentFixture<EnclosureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnclosureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnclosureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
