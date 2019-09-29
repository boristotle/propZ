import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: Notification[];
  filteredNotifications: Notification[];
  notificationCategories = ['Late Rent', 'Service Request', 'Lease Expiring'];
  category;
  propertyId;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getNotifications().subscribe((res: Notification[]) => {
      this.notifications = res;
      this.filteredNotifications = [...res];
     }, err => {
       console.log('err', err);
     });
  }

  filterNotifications() {
    console.log('this.category', this.category);
    console.log('this.propertyId', this.propertyId);
    if (this.propertyId && this.category) {
      this.filteredNotifications = this.notifications.filter(e => e.PropertyId === this.propertyId && e.category === this.category);
    } else if (this.propertyId && !this.category) {
        this.filteredNotifications = this.notifications.filter(e => e.PropertyId === this.propertyId);
    } else if (this.category && !this.propertyId) {
        this.filteredNotifications = this.notifications.filter(e => e.category === this.category);
    } else {
        this.filteredNotifications = this.notifications;
    }
  }

  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }

  // onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
  //  if (event.detail.value === 'all') {
  //    this.relevantPlaces = this.loadedPlaces;
  //  } else {
  //   //  this.relevantPlaces = this.loadedPlaces.filter(place => {
  //   //     place.userId !== this.authService.userId;
  //   //  });
  //  }
  // }

}
