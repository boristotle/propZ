import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications$: Observable<Notification[]>;
  notificationCategories = ['Late Rent', 'Service Request', 'Lease Ending Soon'];
  private notificationsSub: Subscription;

  constructor(
    private notificationsService: NotificationsService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.notifications$ = this.notificationsService.notifications;
  }

  filterByCategory(category) {
    // this.category = category;
    // this.filteredNotifications = this.notifications.filter(n => n.category === category);
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
