import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Lease } from '../leases.model';
import { LeasesService } from '../leases.service';

@Component({
  selector: 'app-lease-details',
  templateUrl: './lease-details.page.html',
  styleUrls: ['./lease-details.page.scss'],
})
export class LeaseDetailsPage implements OnInit, OnDestroy {
  lease: Lease;
  private leaseSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private leasesService: LeasesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('leaseId')) {
        this.navCtrl.navigateBack('/places/tabs/properties');
        return;
      }
      this.leaseSub = this.leasesService.getLease(+paramMap.get('leaseId')).subscribe(lease => {
        this.lease = lease;
      });
    });
  }

  get leaseId() {
    if (this.lease) {
      return this.lease.id;
    }
  }

  ngOnDestroy() {
    if (this.leaseSub) {
      this.leaseSub.unsubscribe();
    }
  }

}
