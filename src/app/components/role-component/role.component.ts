import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Role } from 'src/app/state/reducers';

@Component({
  selector: 'role-selection',
  templateUrl: 'role.component.html',
})
export class RoleComponent implements OnInit {
  Role = Role;

  formControl: FormControl = this.fb.control('');

  @Input()
  set data(value: Role | undefined) {
    this.formControl.setValue(value);
  }

  @Output() roleChanged = this.formControl.valueChanges;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
