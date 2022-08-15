// import { FormControl, FormArray, FormGroup } from '@angular/forms';
// import { AnimalForm, EnclosureForm, EnvironmentForm } from '../services/form.service';

// export type GetFormValue<T> = {
//   [Property in keyof T]: T[Property] extends FormControl<infer C>
//     ? C
//     : T[Property] extends FormGroup<infer G>
//     ? GetFormValue<G>
//     : T[Property] extends FormArray<FormControl<infer AC>>
//     ? AC[]
//     : T[Property] extends FormArray<FormGroup<infer AG>>
//     ? GetFormValue<AG>[]
//     : never;
// };

// export type Environment = GetFormValue<EnvironmentForm>;
// export type Enclosure = GetFormValue<EnclosureForm>;
// export type Animal = GetFormValue<AnimalForm>;

export interface Species {
  id: string;
  name: string;
  emoji: string;
  type: string;
}
