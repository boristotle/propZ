import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Property } from './property.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _properties = new BehaviorSubject<Property[]>([
      new Property(
        '123 4th Street Cocoa Beach, FL 32931',
        new Date(),
        'Manhattan Mansion',
        'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        'In the heart of New York City',
        '149.99',
        '100',
        1
      ),
      new Property(
        '110 W Osceola Ln Cocoa Beach, FL 32931',
        new Date(),
        'L\'Amour Toujours',
        'https://www.parisperfect.com/g/apartment-hero-images/hi_lalande-64-new.jpg',
        'A romantic place in Paris ',
        '189.99',
        '100',
        2
      ),
      new Property(
        '6565 Akins Way Cumming, GA 30041',
        new Date(),
        'The Foggy Palace',
        'https://www.finestluxuryvacations.com/uploads/residences/img5ac5074b14e7e.jpg',
        'Not your average city trip',
        '99.99',
        '100',
        3
      )
    ]
  );

  get places() {
    return this._properties;
  }

  constructor(private authService: AuthService) { }

  getPlace(id: number) {
    return this._properties.pipe(take(1), map(properties => {
      return {...properties.find(p => p.id === id)};
    }));
  }

  addPlace(
    propertyAddress: string,
    purchaseDate: Date,
    purchasePrice: string,
    // description: string,
    imageUrl: string,
    mortgage: string,
    insurance: string,
    taxes: string) {
    const newPlace = new Property(
      propertyAddress,
      purchaseDate,
      purchasePrice,
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
        this._properties.next(places.concat(newPlace));
     }, 1000);
    }));
  }

  updatePlace(
    placeId: number,
    propertyAddress: string,
    purchaseDate: Date,
    purchasePrice: string,
    // description: string,
    imageUrl: string,
    mortgage: string,
    insurance: string,
    taxes: string
    ) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Property(
        propertyAddress,
        purchaseDate,
        purchasePrice,
        // description,
        imageUrl || 'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        mortgage,
        insurance,
        taxes,
        oldPlace.id
        );
      this._properties.next(updatedPlaces);
    }));
  }
}
