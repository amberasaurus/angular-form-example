import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent implements OnInit {
  environmentTypes = availableEnvironments;
  environmentForm: FormGroup;

  constructor(private formService: FormService) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();
    this.formService.addEnvironment(this.environmentForm);
  }

  ngOnInit(): void {}

  submit(form: FormGroup): void {}
}
