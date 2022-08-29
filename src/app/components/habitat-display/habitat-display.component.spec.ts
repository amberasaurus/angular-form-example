import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HabitatDisplayComponent } from './habitat-display.component';

describe('HabitatDisplayComponent', () => {
  let component: HabitatDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HabitatDisplayComponent],
    });

    component = TestBed.inject(HabitatDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
