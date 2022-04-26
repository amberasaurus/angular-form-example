import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/state/reducers';

@Component({
  selector: 'dumb-component',
  templateUrl: 'dumb.component.html',
})
export class DumbComponent implements OnInit, OnDestroy {
  @Input()
  set data(value: User | undefined) {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }
  }

  @Output() formChanged = new EventEmitter<User>();

  private destroy$ = new Subject<void>();

  form: FormGroup = this.fb.group({
    firstName: [],
    lastName: [],
    email: [],
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('valueChanges fired');
      this.formChanged.emit(value);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
