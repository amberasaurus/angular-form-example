import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Animal,
  Enclosure,
  FormService,
  Habitat,
} from 'src/app/services/form.service';
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

  constructor(private router: Router, private formService: FormService) {}

  editAnimal() {
    this.router.navigate([
      'zoo',
      'habitat',
      this.habitat?.value.id,
      'enclosure',
      this.enclosure?.value.id,
      'animal',
      this.animal?.value.id,
    ]);
  }

  deleteAnimal() {
    // TODO: switch to material dialog
    const confirmed = confirm('Are you sure you want to delete this animal?');
    if (confirmed) {
      this.formService.removeAnimalFromEnclosure(
        this.habitat?.get('id')?.value || '',
        this.enclosure?.get('id')?.value || '',
        this.animal?.get('id')?.value || '',
      );

      this.router.navigate(['']);
    }
  }
}
