import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Animal, Environment, Zone } from 'src/app/services/form.service';
import { availableSpecies } from '../../constants';

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
      'zoo',
      'environment',
      this.environment?.value.id,
      'zone',
      this.zone?.value.id,
      'animal',
      animal.value.id,
    ]);
  }
}
