import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLoaderService } from 'src/app/services/form-loader.service';
import { NoTypeFormService } from 'src/app/services/no-types-form.service';

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  selectedEnv = new FormControl(0);

  constructor(
    private formService: NoTypeFormService,
    private formLoaderService: FormLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public get zones(): FormArray {
    return this.formService.form.get('zones') as FormArray;
  }

  public addZone() {
    this.router.navigate([
      {
        outlets: {
          edit: ['zone', 'add'],
        },
      },
    ]);
  }

  // onAddEnvironment(formGroup: FormGroup) {
  //   this.formService.addEnvironment(formGroup);

  //   console.log(this.formService.form);
  // }

  // loadSafeZoo() {
  //   this.formLoaderService.loadSafeZoo();
  // }

  // checkSafeZoo() {
  //   console.log(this.formService.form);
  // }

  // editEnvironment(env: FormGroup<EnvironmentForm>) {
  //   this.router.navigate([
  //     { outlets: { edit: ['environment', env.value.name] } },
  //   ]);
  // }
}
