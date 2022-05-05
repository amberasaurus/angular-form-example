import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    role: [''],
    teamMembers: this.fb.array([]),
    addresses: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}
}
