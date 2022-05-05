import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'team-members-selection',
  templateUrl: 'team-members.component.html',
})
export class TeamMembersComponent {
  public form: FormGroup;

  constructor(private formService: FormService) {
    this.form = this.formService.form;
  }

  public get teamMembersFormArray() {
    return this.form.get('teamMembers') as FormArray;
  }

  addTeamMember() {
    this.teamMembersFormArray.controls.push(new FormControl());
  }
}
