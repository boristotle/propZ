import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateLeasePage } from './create-lease.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLeasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateLeasePage]
})
export class CreateLeasePageModule {}
