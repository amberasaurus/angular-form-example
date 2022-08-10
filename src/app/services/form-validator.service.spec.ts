import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { availableSpecies } from '../constants';
import {
  minCapacityValidator,
  zoneCapacityFactory,
  zoneSafetyValidator,
} from './form-validator.service';
import { Animal, Zone } from './form.service';

describe('FormValidatorService', () => {
  describe('minCapacityValidator', () => {
    function createFormGroup(numAnimals: number, maxCapacity: number) {
      const animals: FormGroup[] = [];
      for (let i = 0; i < numAnimals; i++) {
        animals.push(new FormGroup({}));
      }
      return new FormGroup({
        animals: new FormArray(animals),
        maxCapacity: new FormControl(maxCapacity),
      });
    }

    it('should return minCapacity error if capacity value < animals.length', () => {
      const formGroup = createFormGroup(2, 1);
      const result = minCapacityValidator(formGroup.get('maxCapacity')!);

      expect(result).toEqual({ minCapacity: true });
    });

    it('should return null if capacity value >= animals.length', () => {
      const formGroup = createFormGroup(2, 2);
      const result = minCapacityValidator(formGroup.get('maxCapacity')!);

      expect(result).toEqual(null);
    });
  });

  describe('zoneCapacityValidator', () => {
    it('should return max capacity error if trying to move an animal into a full zone', () => {
      const mockFormService = {
        getZoneById: (envId: string, zoneId: string) => {
          return new FormGroup({
            animals: new FormArray([
              new FormGroup({
                id: new FormControl('2'),
              }),
            ]),
            maxCapacity: new FormControl(1),
          });
        },
      };

      const formGroup = new FormGroup({
        selectedEnvironment: new FormControl('1'),
        selectedZone: new FormControl('1'),
        selectedAnimal: new FormControl('1'),
      });

      const validatorFn = zoneCapacityFactory(mockFormService as any);
      validatorFn(formGroup);

      expect(formGroup.get('selectedZone')?.errors).toEqual({
        maxCapacity: true,
      });
    });
  });

  // TODO: convert to jest and/or parameterized
  fdescribe('zoneSafetyValidator', () => {
    let zoneForm: Zone;
    const carnivore = Object.values(availableSpecies).find(s => s.type === 'Carnivore');
    const herbivore = Object.values(availableSpecies).find(s => s.type === 'Herbivore');
    const hypercarnivore = Object.values(availableSpecies).find(s => s.type === 'Hypercarnivore');

    if (!carnivore || !herbivore || !hypercarnivore) {
      throw 'availableSpecies is missing types';
    }

    function addAnimalToZone(species: string, lifeStage: string) {
      zoneForm.controls.animals.push(new FormGroup({
        species: new FormControl(species),
        lifeStage: new FormControl(lifeStage)
      }) as unknown as Animal)
    }

    beforeEach(() => {
      zoneForm = new FormGroup(
        { animals: new FormArray<Animal>([]) }
      ) as unknown as Zone;
    })
    it('should error if zone has herbivore and adult carnivore', () => {
      addAnimalToZone(carnivore.id, 'Adult');
      addAnimalToZone(herbivore.id, 'Adult');
      const result = zoneSafetyValidator(zoneForm);
      expect(result?.['unsafeZone']).toBeTrue();
      expect(zoneForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should error if zone has herbivore and adult hypercarnivore', () => {
      addAnimalToZone(hypercarnivore.id, 'Adult');
      addAnimalToZone(herbivore.id, 'Adult');
      const result = zoneSafetyValidator(zoneForm);
      expect(result?.['unsafeZone']).toBeTrue();
      expect(zoneForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should error if zone has carnivore and adult hypercarnivore', () => {
      addAnimalToZone(hypercarnivore.id, 'Adult');
      addAnimalToZone(carnivore.id, 'Adult');
      const result = zoneSafetyValidator(zoneForm);
      expect(result?.['unsafeZone']).toBeTrue();
      expect(zoneForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should not error if zone has juvenile hypercarnivore', () => {
      addAnimalToZone(hypercarnivore.id, 'Juvenile');
      addAnimalToZone(herbivore.id, 'Adult');
      addAnimalToZone(herbivore.id, 'Juvenile');
      const result = zoneSafetyValidator(zoneForm);
      expect(result).toBeNull();
      expect(zoneForm.controls.animals.at(1).errors).toBeNull();
      expect(zoneForm.controls.animals.at(2).errors).toBeNull();
    });
    it('should not error if zone has juvenile carnivore', () => {
      addAnimalToZone(carnivore.id, 'Juvenile');
      addAnimalToZone(herbivore.id, 'Adult');
      addAnimalToZone(herbivore.id, 'Juvenile');
      const result = zoneSafetyValidator(zoneForm);
      expect(result).toBeNull();
      expect(zoneForm.controls.animals.at(1).errors).toBeNull();
      expect(zoneForm.controls.animals.at(2).errors).toBeNull();
    });
    it('should not error if zone has only herbivores', () => {
      addAnimalToZone(herbivore.id, 'Adult');
      addAnimalToZone(herbivore.id, 'Juvenile');
      const result = zoneSafetyValidator(zoneForm);
      expect(result).toBeNull();
      expect(zoneForm.controls.animals.at(1).errors).toBeNull();
    });
    it('should not error if zone has only carnivores', () => {
      addAnimalToZone(carnivore.id, 'Adult');
      addAnimalToZone(carnivore.id, 'Juvenile');
      const result = zoneSafetyValidator(zoneForm);
      expect(result).toBeNull();
      expect(zoneForm.controls.animals.at(1).errors).toBeNull();
    });
    it('should not error if zone has only hypercarnivores', () => {
      addAnimalToZone(hypercarnivore.id, 'Adult');
      addAnimalToZone(hypercarnivore.id, 'Juvenile');
      const result = zoneSafetyValidator(zoneForm);
      expect(result).toBeNull();
      expect(zoneForm.controls.animals.at(1).errors).toBeNull();
    });
  });
});

/*
  Adult Hypercarnivore eats everything except hypers
  Adult Carnivore eats herbivore
*/
