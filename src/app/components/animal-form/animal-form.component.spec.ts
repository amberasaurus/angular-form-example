import { TestBed } from '@angular/core/testing';

import { AnimalFormComponent } from './animal-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormService } from '../../services/form.service';

describe('AnimalFormComponent', () => {
  let component: AnimalFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AnimalFormComponent,
        {
          provide: FormService,
          useValue: jasmine.createSpyObj<FormService>([
            'getAnimalFormGroup',
            'getCurrentHabitats',
            'getEnclosureById',
          ]),
        },
      ],
    });

    component = TestBed.inject(AnimalFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
