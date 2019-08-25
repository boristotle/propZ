import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationDetailsPage } from './notification-details.page';
// import { CreateBookingComponent } from '../../../leases/create-booking/create-booking.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationDetailsPage,
    // CreateBookingComponent
  ],
  entryComponents: [
    // CreateBookingComponent
  ]
})
export class NotificationDetailsPageModule {}
