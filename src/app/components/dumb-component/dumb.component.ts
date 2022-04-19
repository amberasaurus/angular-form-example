import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/state/reducers';

@Component({
  selector: 'dumb-component',
  templateUrl: 'dumb.component.html',
})
export class DumbComponent implements OnInit {
  @Input()
  set data(value: User | undefined) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  @Output() formChanged = new EventEmitter<User>();

  form: FormGroup = this.fb.group({
    firstName: [],
    lastName: [],
    email: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log('submitted');
    this.formChanged.emit(this.form.value);
  }
}
