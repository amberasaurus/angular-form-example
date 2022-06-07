import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentForm, FormService } from 'src/app/services/form.service';

const availableEnvironments = ['Forest', 'Jungle', 'Desert'];

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.scss'],
})
export class EnvironmentFormComponent {
  environmentTypes = availableEnvironments;
  environmentForm: FormGroup<EnvironmentForm>;

  constructor(private formService: FormService, private router: Router) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();
  }

  submit(): void {
    this.formService.addEnvironment(this.environmentForm);
    this.router.navigate(['']);
  }
}
