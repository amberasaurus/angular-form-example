import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addAddress, updateUser, changeRole } from '../../state/actions';
import { selectUser, Role, User } from '../../state/reducers';

@Component({
  selector: 'smart-view-component',
  templateUrl: 'smart-view.component.html',
})
export class SmartViewComponent implements OnInit {
  user$ = this.store.select(selectUser);
  Role = Role;

  constructor(private store: Store) {}

  ngOnInit() {}

  onFormChanged(data: User) {
    this.store.dispatch(updateUser({ user: data }));
  }

  onAddAddress() {
    this.store.dispatch(addAddress());
  }

  onRoleChange(role: Role) {
    this.store.dispatch(changeRole({ role }));
  }
}
