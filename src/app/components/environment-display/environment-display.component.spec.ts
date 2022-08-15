import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnvironmentDisplayComponent } from './environment-display.component';

describe('EnvironmentDisplayComponent', () => {
  let component: EnvironmentDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ EnvironmentDisplayComponent ]
    });

    component = TestBed.inject(EnvironmentDisplayComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
