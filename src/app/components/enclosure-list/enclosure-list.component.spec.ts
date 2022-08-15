import { TestBed } from '@angular/core/testing';

import { EnclosureListComponent } from './enclosure-list.component';

describe('EnclosureListComponent', () => {
  let component: EnclosureListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnclosureListComponent],
    });

    component = TestBed.inject(EnclosureListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
