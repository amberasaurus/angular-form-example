import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddressListComponent } from './components/address-list-component/address-list.component';
import { BasicInfoComponent } from './components/basic-info-component/basic-info.component';
import { RoleComponent } from './components/role-component/role.component';
import { TeamMembersComponent } from './components/team-members-component/team-members.component';
import { UserDetailsComponent } from './components/user-details-component/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    UserDetailsComponent,
    AddressListComponent,
    RoleComponent,
    TeamMembersComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
