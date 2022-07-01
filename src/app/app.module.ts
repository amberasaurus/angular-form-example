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
import { AnimalResolver } from './services/animal-resolver.service';
import { EnvironmentResolver } from './services/environment-resolver.service';
import { ZoneResolver } from './services/zone-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/zoo',
  },
  {
    path: 'zoo',
    component: ZooComponent,
    children: [
      {
        path: 'environment/:envName',
        component: EnvironmentFormComponent,
        resolve: {
          environment: EnvironmentResolver,
        },
      },
      {
        path: 'environment/:envName/zone/:zoneName',
        component: ZoneFormComponent,
        resolve: {
          environment: EnvironmentResolver,
          zone: ZoneResolver,
        },
      },
      {
        path: 'environment/:envName/zone/:zoneName/animal/:animalName',
        component: AnimalFormComponent,
        resolve: {
          environment: EnvironmentResolver,
          zone: ZoneResolver,
          animal: AnimalResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ZooComponent,
    EnvironmentFormComponent,
    ZoneFormComponent,
    AnimalFormComponent,
    EnvironmentDisplayComponent,
    ZoneListComponent,
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
