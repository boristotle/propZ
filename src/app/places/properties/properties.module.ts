import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertiesPage } from './properties.page';
import { PropertyItemComponent } from './property-item/property-item.component';

const routes: Routes = [
  {
    path: '',
    component: PropertiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PropertiesPage, PropertyItemComponent]
})
export class PropertiesPageModule {}
