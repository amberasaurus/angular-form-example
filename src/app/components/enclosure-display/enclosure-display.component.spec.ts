import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnclosureDisplayComponent } from './enclosure-display.component';

describe('EnclosureDisplayComponent', () => {
  let component: EnclosureDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ EnclosureDisplayComponent ]
    });

    component = TestBed.inject(EnclosureDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
