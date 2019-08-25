import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit, OnDestroy{
  loadedPlaces: Place[];
  // listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
    });
    // this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
   if (event.detail.value === 'all') {
     this.relevantPlaces = this.loadedPlaces;
   } else {
     this.relevantPlaces = this.loadedPlaces.filter(place => {
        place.userId !== this.authService.userId;
     });
   }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
