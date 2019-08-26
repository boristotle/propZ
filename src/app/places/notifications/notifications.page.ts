import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class NotificationsPage implements OnInit, OnDestroy {
  notifications$: Observable<Notification[]>;
  private notificationsSub: Subscription;

  constructor(
    private notificationsService: NotificationsService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.notifications$ = this.notificationsService.notifications;
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

  ngOnDestroy() {
    if (this.notificationsSub) {
      this.notificationsSub.unsubscribe();
    }
  }
}
