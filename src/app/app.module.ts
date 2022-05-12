import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EnvironmentFormComponent } from './components/environment-form/environment-form.component';
import { SpeciesFormComponent } from './components/species-form/species-form.component';
import { TeamMembersComponent } from './components/team-members-component/team-members.component';
import { ZooComponent } from './components/zoo/zoo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/zoo',
  },
  {
    path: 'zoo',
    component: ZooComponent,
  },
  {
    path: 'environment/add',
    component: EnvironmentFormComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TeamMembersComponent,
    ZooComponent,
    EnvironmentFormComponent,
    SpeciesFormComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
