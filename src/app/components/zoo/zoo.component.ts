import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormLoaderService } from 'src/app/services/form-loader.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  selectedEnv = new FormControl(0);

  constructor(
    private formService: FormService,
    private formLoaderService: FormLoaderService
  ) {}

  ngOnInit(): void {}

  public get environments(): FormArray {
    return this.formService.form.get('environments') as FormArray;
  }

  onAddEnvironment(formGroup: FormGroup) {
    this.formService.addEnvironment(formGroup);

    console.log(this.formService.form);
  }

  loadSafeZoo() {
    this.formLoaderService.loadSafeZoo();
  }
}
