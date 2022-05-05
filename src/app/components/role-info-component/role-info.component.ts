import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/state/reducers';

@Component({
  selector: 'role-info',
  templateUrl: 'role-info.component.html',
})
export class RoleInfoComponent implements OnInit {
  Role = Role;

  constructor() {}

  ngOnInit() {}
}
