import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnimalDisplayComponent } from './components/animal-display/animal-display.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { EnvironmentDisplayComponent } from './components/environment-display/environment-display.component';
import { EnvironmentFormComponent } from './components/environment-form/environment-form.component';
import { ZoneDisplayComponent } from './components/zone-display/zone-display.component';
import { ZoneFormComponent } from './components/zone-form/zone-form.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
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
    outlet: 'edit',
  },
  {
    path: 'animal/add',
    component: AnimalFormComponent,
    outlet: 'edit',
  },
  {
    path: 'zone/add',
    component: ZoneFormComponent,
    outlet: 'edit',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ZooComponent,
    EnvironmentFormComponent,
    ZoneFormComponent,
    EnvironmentDisplayComponent,
    ZoneListComponent,
    AnimalFormComponent,
    ZoneDisplayComponent,
    AnimalDisplayComponent,
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
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
