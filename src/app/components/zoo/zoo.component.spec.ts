import { TestBed } from '@angular/core/testing';

import { ZooComponent } from './zoo.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormService} from '../../services/form.service';

describe('ZooComponent', () => {
  let component: ZooComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        ZooComponent,
        {
          provide: FormService,
          useValue: jasmine.createSpyObj<FormService>(['getEnvironmentFormGroup'])
        },
      ]
    });

    component = TestBed.inject(ZooComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
