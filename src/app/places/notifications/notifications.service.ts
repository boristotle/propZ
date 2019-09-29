import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Notification } from './notifications.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
      // insert into "Notifications" values (default, 1, 'Lease Expiring', '10-22-2020', '10-22-2020', 'Lease expiring in 7 days');
      // insert into "Notifications" values (default, 1, 'Late Rent', '10-22-2020', '10-22-2020', 'Rent is 11 days late');
      // insert into "Notifications" values (default, 1, 'Service Request', '10-22-2020', '10-22-2020', 'Toilet is plugged and wont flush');

  private _notifications = new BehaviorSubject<Notification[]>([
      new Notification(
        'Lease expiring in 7 days',
        'Lease Expiring',
        '10-22-2020',
        1,
        2
      ),
      new Notification(
        'Rent is 11 days late',
        'Late Rent',
        '10-22-2020',
        1,
        2
      ),
      new Notification(
        'Toilet is plugged and won\'t flush',
        'Service Request',
        '10-22-2020',
        1,
        3
      ),
    ]
  );

  get notifications() {
    return this._notifications;
  }

  constructor(private authService: AuthService) { }

  getNotification(id: number) {
    return this._notifications.pipe(take(1), map(leases => {
      return {...leases.find(p => p.id === id)};
    }));
  }

  addNotification(
    description: string,
    category: string,
    date: string,
    propertyId: number,
    leaseId: number) {
    const newNotification = new Notification(
        description,
        category,
        date,
        propertyId,
        leaseId
      );
// tslint:disable-next-line: align
    return this._notifications.pipe(
      take(1),
      delay(1000),
      tap(places => {
      setTimeout(() => {
        this._notifications.next(places.concat(newNotification));
     }, 1000);
    }));
  }

  closeNotification(notificationId: number) {
    return this._notifications.pipe(
      take(1),
      delay(1000),
      tap(notifications => {
      const updatedNotificationIndex = notifications.findIndex(pl => pl.id === notificationId);
      const updatedNotifications = [...notifications].splice(updatedNotificationIndex, 1);
      this._notifications.next(updatedNotifications);
    }));
  }
}
