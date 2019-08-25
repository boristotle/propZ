import { Component, OnInit } from '@angular/core';

import {LeasesService} from './leases.service';
import { Leases } from './leases.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-leases',
  templateUrl: './leases.page.html',
  styleUrls: ['./leases.page.scss'],
})
export class LeasesPage implements OnInit {
  loadedBookings: Leases[];

  constructor(private bookingsService: LeasesService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel booking with id offerId
  }

}
