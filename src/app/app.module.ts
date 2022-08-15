import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AnimalDisplayComponent} from './components/animal-display/animal-display.component';
import {AnimalFormComponent} from './components/animal-form/animal-form.component';
import {EnvironmentDisplayComponent} from './components/environment-display/environment-display.component';
import {EnvironmentFormComponent} from './components/environment-form/environment-form.component';
import {EnclosureDisplayComponent} from './components/enclosure-display/enclosure-display.component';
import {EnclosureFormComponent} from './components/enclosure-form/enclosure-form.component';
import {EnclosureListComponent} from './components/enclosure-list/enclosure-list.component';
import {ZooComponent} from './components/zoo/zoo.component';
import {AnimalResolver} from './services/animal-resolver.service';
import {EnvironmentResolver} from './services/environment-resolver.service';
import {EnclosureResolver} from './services/enclosure-resolver.service';

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
        path: 'environment/add',
        component: EnvironmentFormComponent,
      },
      {
        path: 'enclosure/add',
        component: EnclosureFormComponent,
        resolve: {
          environment: EnvironmentResolver,
        },
      },
      {
        path: 'animal/add',
        component: AnimalFormComponent,
        resolve: {
          environment: EnvironmentResolver,
          enclosure: EnclosureResolver,
        },
      },
      {
        path: 'environment/:envId',
        component: EnvironmentFormComponent,
        resolve: {
          environment: EnvironmentResolver,
        },
      },
      {
        path: 'environment/:envId/enclosure/:enclosureId',
        component: EnclosureFormComponent,
        resolve: {
          environment: EnvironmentResolver,
          enclosure: EnclosureResolver,
        },
      },
      {
        path: 'environment/:envId/enclosure/:enclosureId/animal/:animalId',
        component: AnimalFormComponent,
        resolve: {
          environment: EnvironmentResolver,
          enclosure: EnclosureResolver,
          animal: AnimalResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AnimalDisplayComponent,
    AnimalFormComponent,
    EnclosureDisplayComponent,
    EnclosureFormComponent,
    EnclosureListComponent,
    EnvironmentDisplayComponent,
    EnvironmentFormComponent,
    ZooComponent,
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
