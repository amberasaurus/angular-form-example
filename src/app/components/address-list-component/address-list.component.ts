import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'address-list',
  templateUrl: 'address-list.component.html',
})
export class AddressListComponent implements OnInit {
  public form: FormGroup;

  constructor(private formService: FormService, private fb: FormBuilder) {
    this.form = this.formService.form;
  }

  public get addresses() {
    return this.form.get('addresses') as FormArray;
  }

  public addAddress() {
    this.addresses.controls.push(
      this.fb.group({
        street: [''],
        city: [''],
        state: [''],
      })
    );
  }

  ngOnInit() {}
}
