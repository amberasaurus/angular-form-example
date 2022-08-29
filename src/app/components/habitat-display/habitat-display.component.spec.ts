import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HabitatDisplayComponent } from './habitat-display.component';

import { FormService } from '../../services/form.service';

describe('HabitatDisplayComponent', () => {
  let component: HabitatDisplayComponent;

  beforeEach(() => {
    const formServiceSpy = jasmine.createSpyObj<FormService>(['removeHabitat']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HabitatDisplayComponent,
        {
          provide: FormService,
          useValue: formServiceSpy,
        },
      ],
    });

    component = TestBed.inject(HabitatDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
