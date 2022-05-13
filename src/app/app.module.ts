import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
