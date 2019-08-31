import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Property } from '../property.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  constructor(private placesService: PlacesService, private router: Router) { }
  properties$: Observable<Property[]>;

  ngOnInit() {
    this.properties$ = this.placesService.places;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'properties', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

}
