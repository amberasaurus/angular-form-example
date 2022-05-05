import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private formService: FormService) {
    this.form = this.formService.form;
  }

  ngOnInit() {}
}
