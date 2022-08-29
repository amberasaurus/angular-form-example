import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Animal, Habitat, Enclosure } from 'src/app/services/form.service';
import { availableSpecies } from '../../constants';

@Component({
  selector: 'app-animal-display',
  templateUrl: './animal-display.component.html',
  styleUrls: ['./animal-display.component.scss'],
})
export class AnimalDisplayComponent {
  @Input() animal?: Animal;
  @Input() enclosure?: Enclosure;
  @Input() habitat?: Habitat;

  availableSpecies = availableSpecies;

  constructor(private router: Router) {}

  editAnimal(animal: Animal) {
    this.router.navigate([
      'zoo',
      'habitat',
      this.habitat?.value.id,
      'enclosure',
      this.enclosure?.value.id,
      'animal',
      animal.value.id,
    ]);
  }
}
