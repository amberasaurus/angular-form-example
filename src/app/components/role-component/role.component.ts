import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { Role } from 'src/app/state/reducers';

@Component({
  selector: 'role-selection',
  templateUrl: 'role.component.html',
})
export class RoleComponent implements OnInit {
  Role = Role;

  public roleFormControl: FormControl;

  constructor(private formService: FormService) {
    this.roleFormControl = this.formService.form.get('role') as FormControl;
  }

  ngOnInit() {}
}
