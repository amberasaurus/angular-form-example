import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormService } from 'src/app/services/form.service';

import { EnclosureDisplayComponent } from './enclosure-display.component';

describe('EnclosureDisplayComponent', () => {
  let component: EnclosureDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EnclosureDisplayComponent,
        {
          provide: FormService,
          useValue: jasmine.createSpyObj<FormService>([
            'removeEnclosureFromEnvironment',
          ]),
        },
      ],
    });

    component = TestBed.inject(EnclosureDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
