import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() addEnvironment = new EventEmitter<FormGroup>();

  constructor(private formService: FormService) {
    this.environmentForm = this.formService.getEnvironmentFormGroup();
  }

  ngOnInit(): void {}

  submit(form: FormGroup): void {
    this.addEnvironment.emit(form);
  }
}
