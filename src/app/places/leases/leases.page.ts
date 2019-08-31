import { Component, OnInit } from '@angular/core';

import {LeasesService} from './leases.service';
import { Lease } from './leases.model';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-leases',
  templateUrl: './leases.page.html',
  styleUrls: ['./leases.page.scss'],
})
export class LeasesPage implements OnInit {
  leases$: Observable<Lease[]>;

  constructor(
    private leasesService: LeasesService,
    private dataService: DataService) { }

  ngOnInit() {
    this.leases$ = this.dataService.getLeases();
  }

  // onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
  //   slidingEl.close();
  //   // cancel booking with id offerId
  // }

  // get leaseId() {
  //   return 1;
  // }

}
