import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnvironmentFormComponent } from './environment-form.component';
import { FormService } from '../../services/form.service';

describe('EnvironmentFormComponent', () => {
  let component: EnvironmentFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EnvironmentFormComponent,
        {
          provide: FormService,
          useValue: jasmine.createSpyObj<FormService>([
            'getEnvironmentFormGroup',
          ]),
        },
      ],
    });

    component = TestBed.inject(EnvironmentFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
