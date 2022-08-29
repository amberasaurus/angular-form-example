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
import { EnclosureDisplayComponent } from './components/enclosure-display/enclosure-display.component';
import { EnclosureFormComponent } from './components/enclosure-form/enclosure-form.component';
import { EnclosureListComponent } from './components/enclosure-list/enclosure-list.component';
import { HabitatDisplayComponent } from './components/habitat-display/habitat-display.component';
import { HabitatFormComponent } from './components/habitat-form/habitat-form.component';
import { ZooComponent } from './components/zoo/zoo.component';
import { AnimalResolver } from './services/animal-resolver.service';
import { EnclosureResolver } from './services/enclosure-resolver.service';
import { HabitatResolver } from './services/habitat-resolver.service';

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
        path: 'habitat/add',
        component: HabitatFormComponent,
      },
      {
        path: 'enclosure/add',
        component: EnclosureFormComponent,
        resolve: {
          habitat: HabitatResolver,
        },
      },
      {
        path: 'animal/add',
        component: AnimalFormComponent,
        resolve: {
          habitat: HabitatResolver,
          enclosure: EnclosureResolver,
        },
      },
      {
        path: 'habitat/:habId',
        component: HabitatFormComponent,
        resolve: {
          habitat: HabitatResolver,
        },
      },
      {
        path: 'habitat/:habId/enclosure/:enclosureId',
        component: EnclosureFormComponent,
        resolve: {
          habitat: HabitatResolver,
          enclosure: EnclosureResolver,
        },
      },
      {
        path: 'habitat/:habId/enclosure/:enclosureId/animal/:animalId',
        component: AnimalFormComponent,
        resolve: {
          habitat: HabitatResolver,
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
    HabitatDisplayComponent,
    HabitatFormComponent,
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
