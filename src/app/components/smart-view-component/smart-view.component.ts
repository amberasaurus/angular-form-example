import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateUser } from '../../state/actions';
import { AppState, selectUser, User } from '../../state/reducers';

@Component({
  selector: 'smart-view-component',
  templateUrl: 'smart-view.component.html',
})
export class SmartViewComponent implements OnInit {
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  ngOnInit() {}

  onFormChanged(data: User) {
    console.log(data);
    this.store.dispatch(updateUser({ user: data }));
  }
}
