import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Property } from './property.model';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data-service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private dataService: DataService,
    private authService: AuthService) { }

    private _properties = this.dataService.getProperties();

    get places() {
      return this._properties;
    }

  getPlace(id: number) {
    return this._properties.pipe(take(1), map((properties: Property[]) => {
      return {...properties.find(p => p.id === id)};
    }));
  }

  addPlace(
    address: string,
    purchaseDate: string,
    purchasePrice: string,
    homeValue: string,
    // description: string,
    imageUrl: string,
    mortgage: string,
    insurance: string,
    taxes: string) {
    const newPlace = new Property(
      address,
      purchaseDate,
      purchasePrice,
      homeValue,
      // description,
      imageUrl || 'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
      mortgage,
      insurance,
      taxes
      );
// tslint:disable-next-line: align
    return this._properties.pipe(
      take(1),
      delay(1000),
      tap(places => {
      setTimeout(() => {
        // this._properties.next(places.concat(newPlace));
     }, 1000);
    }));
  }

  updatePlace(
    placeId: number,
    address: string,
    purchaseDate: string,
    purchasePrice: string,
    homeValue: string,
    // description: string,
    imageUrl: string,
    mortgage: string,
    insurance: string,
    taxes: string
    ) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places: Property[]) => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Property(
        address,
        purchaseDate,
        purchasePrice,
        homeValue,
        // description,
        imageUrl || 'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        mortgage,
        insurance,
        taxes,
        oldPlace.id
        );
      // this._properties.next(updatedPlaces);
    }));
  }
}
