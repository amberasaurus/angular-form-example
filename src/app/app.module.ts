import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TeamMembersComponent } from './components/team-members-component/team-members.component';
import { ZooComponent } from './components/zoo/zoo.component';
import { EnvironmentFormComponent } from './components/environment-form/environment-form.component';
import { SpeciesFormComponent } from './components/species-form/species-form.component';

@NgModule({
  declarations: [AppComponent, TeamMembersComponent, ZooComponent, EnvironmentFormComponent, SpeciesFormComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
