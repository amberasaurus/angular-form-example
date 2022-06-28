import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { availableSpecies } from '../../constants';
import { Animal, Environment, Zone } from '../../types/types';

@Component({
  selector: 'app-animal-display',
  templateUrl: './animal-display.component.html',
  styleUrls: ['./animal-display.component.scss'],
})
export class AnimalDisplayComponent {
  @Input() animal?: Animal;
  @Input() zone?: Zone;
  @Input() environment?: Environment;

  availableSpecies = availableSpecies;

  constructor(private router: Router) {}

  editAnimal(animal: Animal) {
    this.router.navigate([
      {
        outlets: {
          edit: [
            'environment',
            this.environment?.name,
            'zone',
            this.zone?.name,
            'animal',
            animal.name,
          ],
        },
      },
    ]);
  }
}
