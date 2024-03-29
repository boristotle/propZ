import { Component, OnInit, OnDestroy } from '@angular/core';
import { Property } from '../../property.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit, OnDestroy {
  property: Property;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propertyId')) {
        this.navCtrl.navigateBack('/places/tabs/properties');
        return;
      }
      this.placeSub = this.placesService.getPlace(+paramMap.get('propertyId')).subscribe(property => {
        this.property = property;
      });
    });
  }

  // selectDocumentOrPhoto() {
  //   this.actionSheetCtrl.create({
  //     header: 'Choose an Action',
  //     buttons: [
  //       {
  //         text: 'Select Date',
  //         handler: () => {
  //           // this.openBookingModal('select');
  //         }
  //       },
  //       {
  //         text: 'Random Date',
  //         handler: () => {
  //           // this.openBookingModal('random');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   }).then(actionSheetEl => {
  //     actionSheetEl.present();
  //   });
  // }

  openBookingModal(mode: 'select' | 'random') {
    // console.log(mode);
    // this.modalCtrl
    // .create({
    //   component: CreateBookingComponent,
    //   componentProps: {selectedPlace: this.place, selectedMode: mode}
    // })
    // .then(modalEl => {
    //   modalEl.present();
    //   return modalEl.onDidDismiss();
    // })
    // .then(resultData => {
    //   console.log(resultData.data, resultData.role);
    //   if (resultData.role === 'confirm') {
    //     console.log('Booked!');
    //   }
    // });
  }


  get propertyId() {
    if (this.property) {
      return this.property.id;
    }
  }

  get revenue() {
    if (this.property && this.property.Leases[0]) {
      return this.property.Leases[0].LeasePayments.reduce((acc, lp) => {
        return acc + lp.amountPaid;
      }, 0);
    }
    return 0;
  }

  get expenses() {
    if (this.property) {
      return this.property.Expenses.reduce((acc, exp) => {
        return acc + exp.amount;
      }, 0);
    }
    return 0;
  }


  // get totalMonthlyIncome() {
  //   if (this.properties) {
  //     return this.properties.reduce((acc, prop) => {
  //       return acc + prop.Leases[0].rentAmountDue;
  //     }, 0);
  //   }
  //   return 0;
  // }

  // get totalMonthlyExpenses() {
  //   if (this.properties) {
  //     return this.properties.reduce((acc, prop) => {
  //       console.log('prop', prop);
  //       return acc + ((prop.mortgage + prop.insurance + prop.taxes) / 12);
  //     }, 0);
  //   }
  //   return 0;
  // }

  get leaseId() {
    if (this.property && this.property.Leases) {
      return this.property.Leases[0].id;
    }
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
