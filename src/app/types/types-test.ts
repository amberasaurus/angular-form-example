// import { FormControl, FormGroup, FormArray } from '@angular/forms';
// import { GetFormValue } from './types';

// // TODO: Make this a real test

// interface SimpleForm {
//   stringCtrl: FormControl<string>;
//   numberCtrl: FormControl<number>;
//   boolCtrl: FormControl<boolean>;
// }
// interface ComplexForm extends SimpleForm{
//   group: FormGroup<SimpleForm>;
//   strArray: FormArray<FormControl<string>>;
//   groupArray: FormArray<FormGroup<SimpleForm>>;
// }

// const testVal: GetFormValue<ComplexForm> = {
//   stringCtrl: 'foo',
//   numberCtrl: 123,
//   boolCtrl: false,
//   group: {
//     stringCtrl: 'bar',
//     numberCtrl: 456,
//     boolCtrl: true,
//   },
//   strArray: ['abc', 'def', 'ghi'],
//   groupArray: [
//     {
//       stringCtrl: 'jkl',
//       numberCtrl: 789,
//       boolCtrl: false,
//     },
//     {
//       stringCtrl: 'mno',
//       numberCtrl: 987,
//       boolCtrl: true,
//     },
//   ],
// };
