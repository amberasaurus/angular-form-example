import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnimalDisplayComponent } from './animal-display.component';

describe('AnimalDisplayComponent', () => {
  let component: AnimalDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AnimalDisplayComponent],
    });

    component = TestBed.inject(AnimalDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
