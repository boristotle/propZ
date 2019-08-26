import { Component, OnInit } from '@angular/core';

import {LeasesService} from './leases.service';
import { Lease } from './leases.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-leases',
  templateUrl: './leases.page.html',
  styleUrls: ['./leases.page.scss'],
})
export class LeasesPage implements OnInit {
  loadedLeases: Lease[];

  constructor(private leasesService: LeasesService) { }

  ngOnInit() {
    // this.loadedLeases = this.leasesService.leases;
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel booking with id offerId
  }

  get leaseId() {
    return 1;
  }

}
