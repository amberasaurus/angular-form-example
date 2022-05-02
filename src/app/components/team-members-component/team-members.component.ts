import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Role } from 'src/app/state/reducers';

@Component({
  selector: 'team-members-selection',
  templateUrl: 'team-members.component.html',
})
export class TeamMembersComponent {
  @Input()
  set data(values: string[]) {
    this.teamMembers.clear();

    if (values) {
      values.forEach((teamMember) => {
        this.teamMembers.push(new FormControl(teamMember));
      });
    }
  }

  teamMembers = new FormArray([]);

  addTeamMember() {
    this.teamMembers.push(new FormControl());
  }

  getControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
