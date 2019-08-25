import { Component, OnInit } from '@angular/core';


import { IonItemSliding } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Leases } from '../leases.model';

@Component({
  selector: 'app-lease-details',
  templateUrl: './lease-details.page.html',
  styleUrls: ['./lease-details.page.scss'],
})
export class LeaseDetailsPage implements OnInit {
  loadedBookings: Leases[];

  constructor(private bookingsService: LeasesService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap => {
    //   if (!paramMap.has('propertyId')) {
    //     this.navCtrl.navigateBack('/places/tabs/notifications');
    //     return;
    //   }
    //   this.placeSub = this.placesService.getPlace(paramMap.get('propertyId')).subscribe(place => {
    //     this.place = place;
    //     console.log(this.place);
    //   });

    // });
    // this.loadedBookings = this.bookingsService.bookings;
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel booking with id offerId
  }

}
