import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormService } from 'src/app/services/form.service';

import { AnimalDisplayComponent } from './animal-display.component';

describe('AnimalDisplayComponent', () => {
  let component: AnimalDisplayComponent;

  beforeEach(() => {
    const formServiceSpy = jasmine.createSpyObj<FormService>([
      'removeAnimalFromEnclosure',
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AnimalDisplayComponent,
        {
          provide: FormService,
          useValue: formServiceSpy,
        },
      ],
    });

    component = TestBed.inject(AnimalDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
