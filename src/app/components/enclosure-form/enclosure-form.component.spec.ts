import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { EnclosureFormComponent } from './enclosure-form.component';
import { FormService } from '../../services/form.service';

describe('EnclosureFormComponent', () => {
  let component: EnclosureFormComponent;

  beforeEach( () => {
    const formServiceSpy = jasmine.createSpyObj<FormService>(
      ['getEnclosureFormGroup', 'getCurrentEnvironments']
    );

    TestBed.configureTestingModule({
     imports: [RouterTestingModule],
      providers: [
        EnclosureFormComponent,
        {
          provide: FormService,
          useValue: formServiceSpy
        },
      ]
    });

    component = TestBed.inject(EnclosureFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
