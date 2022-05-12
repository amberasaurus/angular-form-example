import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
const availableSpecies = [
  {
    name: 'Tiger',
    emoji: '🐅',
    type: 'Carnivore',
  },
  {
    name: 'Monkey',
    emoji: '🐒',
    type: 'Herbivore',
  },
  {
    name: 'Zebra',
    emoji: '🦓',
    type: 'Herbivore',
  },
  {
    name: 'Deer',
    emoji: '🦌',
    type: 'Herbivore',
  },
  {
    name: 'Flamingo',
    emoji: '🦩',
    type: 'Carnivore',
  },
  {
    name: 'Alligator',
    emoji: '🐊',
    type: 'Carnivore',
  },
  {
    name: 'T-Rex',
    emoji: '🦖',
    type: 'Omnivore',
  },
];

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  activeEnv = '';
  species = availableSpecies;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  public get environments(): FormArray {
    return this.formService.form.get('environments') as FormArray;
  }

  onAddEnvironment(formGroup: FormGroup) {
    this.formService.addEnvironment(formGroup);

    console.log(this.formService.form);
  }
}
