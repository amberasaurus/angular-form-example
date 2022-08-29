import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { availableSpecies } from '../constants';
import {
  minCapacityValidator,
  enclosureCapacityFactory,
  enclosureSafetyValidator,
} from './form-validator.service';
import { Animal, Enclosure } from './form.service';

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

  describe('enclosureCapacityValidator', () => {
    it('should return max capacity error if trying to move an animal into a full enclosure', () => {
      const mockFormService = {
        getEnclosureById: (habId: string, enclosureId: string) => {
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
        selectedHabitat: new FormControl('1'),
        selectedEnclosure: new FormControl('1'),
        selectedAnimal: new FormControl('1'),
      });

      const validatorFn = enclosureCapacityFactory(mockFormService as any);
      validatorFn(formGroup);

      expect(formGroup.get('selectedEnclosure')?.errors).toEqual({
        maxCapacity: true,
      });
    });
  });

  // TODO: convert to jest and/or parameterized
  describe('enclosureSafetyValidator', () => {
    let enclosureForm: Enclosure;
    const carnivore = Object.values(availableSpecies).find(
      (s) => s.type === 'Carnivore',
    );
    const herbivore = Object.values(availableSpecies).find(
      (s) => s.type === 'Herbivore',
    );
    const hypercarnivore = Object.values(availableSpecies).find(
      (s) => s.type === 'Hypercarnivore',
    );

    if (!carnivore || !herbivore || !hypercarnivore) {
      throw 'availableSpecies is missing types';
    }

    function addAnimalToEnclosure(species: string, lifeStage: string) {
      enclosureForm.controls.animals.push(
        new FormGroup({
          species: new FormControl(species),
          lifeStage: new FormControl(lifeStage),
        }) as unknown as Animal,
      );
    }

    beforeEach(() => {
      enclosureForm = new FormGroup({
        animals: new FormArray<Animal>([]),
      }) as unknown as Enclosure;
    });
    it('should error if enclosure has herbivore and adult carnivore', () => {
      addAnimalToEnclosure(carnivore.id, 'Adult');
      addAnimalToEnclosure(herbivore.id, 'Adult');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result?.['unsafeEnclosure']).toBeTrue();
      expect(enclosureForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should error if enclosure has herbivore and adult hypercarnivore', () => {
      addAnimalToEnclosure(hypercarnivore.id, 'Adult');
      addAnimalToEnclosure(herbivore.id, 'Adult');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result?.['unsafeEnclosure']).toBeTrue();
      expect(enclosureForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should error if enclosure has carnivore and adult hypercarnivore', () => {
      addAnimalToEnclosure(hypercarnivore.id, 'Adult');
      addAnimalToEnclosure(carnivore.id, 'Adult');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result?.['unsafeEnclosure']).toBeTrue();
      expect(enclosureForm.controls.animals.at(1).errors?.['dead']).toBe(true);
    });
    it('should not error if enclosure has juvenile hypercarnivore', () => {
      addAnimalToEnclosure(hypercarnivore.id, 'Juvenile');
      addAnimalToEnclosure(herbivore.id, 'Adult');
      addAnimalToEnclosure(herbivore.id, 'Juvenile');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result).toBeNull();
      expect(enclosureForm.controls.animals.at(1).errors).toBeNull();
      expect(enclosureForm.controls.animals.at(2).errors).toBeNull();
    });
    it('should not error if enclosure has juvenile carnivore', () => {
      addAnimalToEnclosure(carnivore.id, 'Juvenile');
      addAnimalToEnclosure(herbivore.id, 'Adult');
      addAnimalToEnclosure(herbivore.id, 'Juvenile');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result).toBeNull();
      expect(enclosureForm.controls.animals.at(1).errors).toBeNull();
      expect(enclosureForm.controls.animals.at(2).errors).toBeNull();
    });
    it('should not error if enclosure has only herbivores', () => {
      addAnimalToEnclosure(herbivore.id, 'Adult');
      addAnimalToEnclosure(herbivore.id, 'Juvenile');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result).toBeNull();
      expect(enclosureForm.controls.animals.at(1).errors).toBeNull();
    });
    it('should not error if enclosure has only carnivores', () => {
      addAnimalToEnclosure(carnivore.id, 'Adult');
      addAnimalToEnclosure(carnivore.id, 'Juvenile');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result).toBeNull();
      expect(enclosureForm.controls.animals.at(1).errors).toBeNull();
    });
    it('should not error if enclosure has only hypercarnivores', () => {
      addAnimalToEnclosure(hypercarnivore.id, 'Adult');
      addAnimalToEnclosure(hypercarnivore.id, 'Juvenile');
      const result = enclosureSafetyValidator(enclosureForm);
      expect(result).toBeNull();
      expect(enclosureForm.controls.animals.at(1).errors).toBeNull();
    });
  });
});

/*
  Adult Hypercarnivore eats everything except hypers
  Adult Carnivore eats herbivore
*/
