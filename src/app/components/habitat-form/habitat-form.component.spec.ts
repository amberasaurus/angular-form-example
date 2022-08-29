import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HabitatFormComponent } from './habitat-form.component';
import { FormService } from '../../services/form.service';

describe('HabitatFormComponent', () => {
  let component: HabitatFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HabitatFormComponent,
        {
          provide: FormService,
          useValue: jasmine.createSpyObj<FormService>(['getHabitatFormGroup']),
        },
      ],
    });

    component = TestBed.inject(HabitatFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
