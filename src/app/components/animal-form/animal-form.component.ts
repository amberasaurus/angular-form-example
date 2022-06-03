import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { zoneCapacityValidator } from 'src/app/services/form-validator.service';
import {
  Animal,
  Environment,
  FormService,
  Zone,
} from 'src/app/services/form.service';
import { ZoneTemp } from 'src/app/types/types';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent implements OnInit, OnDestroy {
  animalForm: FormGroup<Animal>;
  availableSpecies = availableSpecies;
  availableLifeStages = availableLifeStages;
  availableZones: Observable<FormArray<FormGroup<Zone>> | undefined>;
  currentEnvironments: FormArray<FormGroup<Environment>>;

  selectedEnvironment = new FormControl<number>(-1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });

  selectedZone = new FormControl<ZoneTemp | undefined>(undefined, {
    validators: [Validators.required, zoneCapacityValidator],
  });

  constructor(private formService: FormService, private router: Router) {
    this.animalForm = this.formService.getAnimalFormGroup();
    this.currentEnvironments = this.formService.getCurrentEnvironments();

    this.availableZones = this.selectedEnvironment.valueChanges.pipe(
      map((e) => this.formService.getZonesForEnvironment(e))
    );
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  submit(): void {
    this.router.navigate(['']);
  }
}

const availableLifeStages = ['Juvenile', 'Adult'];

const availableSpecies = [
  {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    type: 'Carnivore',
  },
  {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    type: 'Herbivore',
  },
  {
    id: 'zebra',
    name: 'Zebra',
    emoji: '🦓',
    type: 'Herbivore',
  },
  {
    id: 'deer',
    name: 'Deer',
    emoji: '🦌',
    type: 'Herbivore',
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    emoji: '🦩',
    type: 'Carnivore',
  },
  {
    id: 'alligator',
    name: 'Alligator',
    emoji: '🐊',
    type: 'Carnivore',
  },
  {
    id: 't-rex',
    name: 'T-Rex',
    emoji: '🦖',
    type: 'Omnivore',
  },
];
