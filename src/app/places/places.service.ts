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
        'p1',
        new Date(),
        'Manhattan Mansion',
        'In the heart of New York City',
        'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        '149.99',
        '100',
      ),
      new Property(
        'p2',
        new Date(),
        'L\'Amour Toujours',
        'A romantic place in Paris ',
        'https://www.parisperfect.com/g/apartment-hero-images/hi_lalande-64-new.jpg',
        '189.99',
        '100',
      ),
      new Property(
        'p3',
        new Date(),
        'The Foggy Palace',
        'Not your average city trip',
        'https://www.finestluxuryvacations.com/uploads/residences/img5ac5074b14e7e.jpg',
        '99.99',
        '100',
      )
    ]
  );

  get places() {
    return this._properties.asObservable();
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
