import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, ModalController, ActionSheetController} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
// import { CreateBookingComponent } from '../../../leases/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propertyId')) {
        this.navCtrl.navigateBack('/places/tabs/notifications');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('propertyId')).subscribe(place => {
        this.place = place;
        console.log(this.place);
      });

    });
  }

  onBookPlace() {
    // this.navCtrl.navigateBack('/places/tabs/discover');

    // removes last page from stack of pages- 
    // need to make sure you have other pages there
    // guarantee there is a previous page
    // this.navCtrl.pop();

    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            // this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            // this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });

  }

  // openBookingModal(mode: 'select' | 'random') {
  //   console.log(mode);
  //   this.modalCtrl
  //   .create({
  //     component: CreateBookingComponent,
  //     componentProps: {selectedPlace: this.place, selectedMode: mode}
  //   })
  //   .then(modalEl => {
  //     modalEl.present();
  //     return modalEl.onDidDismiss();
  //   })
  //   .then(resultData => {
  //     console.log(resultData.data, resultData.role);
  //     if (resultData.role === 'confirm') {
  //       console.log('Booked!');
  //     }
  //   });
  // }

  get placeId() {
    if (this.place) {
      return this.place.id;
    }
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
