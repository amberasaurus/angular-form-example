import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { userReducer } from './state/reducers';
import { AddressListComponent } from './components/address-list-component/address-list.component';
import { RoleComponent } from './components/role-component/role.component';
import { TeamMembersComponent } from './components/team-members-component/team-members.component';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoComponent } from './components/basic-info-component/basic-info.component';
import { UserDetailsComponent } from './components/user-details-component/user-details.component';
import { RoleInfoComponent } from './components/role-info-component/role-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basicInfo',
    pathMatch: 'full',
  },
  {
    path: 'basicInfo',
    component: BasicInfoComponent,
  },
  {
    path: 'routeTwo',
    component: RoleInfoComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    UserDetailsComponent,
    AddressListComponent,
    RoleComponent,
    TeamMembersComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ user: userReducer }),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
