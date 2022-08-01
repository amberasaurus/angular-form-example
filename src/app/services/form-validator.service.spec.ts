import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  minCapacityValidator,
  zoneCapacityFactory,
} from './form-validator.service';

describe('FormValidatorService', () => {
  describe('minCapacityValidator', () => {
    function createFormGroup(numAnimals: number, maxCapacity: number) {
      const animals = [];
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
    fit('should return max capacity error if trying to move an animal into a full zone', () => {
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
});
