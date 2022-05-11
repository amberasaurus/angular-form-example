import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
  styleUrls: ['./zoo.component.scss'],
})
export class ZooComponent implements OnInit {
  showAddEnvironment = false;
  showAddSpecies = false;
  activeEnv = '';

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  public get environments(): FormArray {
    return this.formService.form.get('environments') as FormArray;
  }

  onAddEnvironment(formGroup: FormGroup) {
    this.formService.addEnvironment(formGroup);
    this.showAddEnvironment = false;

    console.log(this.formService.form);
  }
}
