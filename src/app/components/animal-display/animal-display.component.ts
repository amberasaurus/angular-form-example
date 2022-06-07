import { Component, Input } from '@angular/core';
import { Animal } from '../../types/types';
import { availableSpecies } from '../../constants';

@Component({
  selector: 'app-animal-display',
  templateUrl: './animal-display.component.html',
  styleUrls: ['./animal-display.component.scss']
})
export class AnimalDisplayComponent {
  @Input() animal?: Animal | undefined;

  availableSpecies = availableSpecies;

  constructor() { }

}
