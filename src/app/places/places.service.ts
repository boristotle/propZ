import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import {Place} from './place.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>([
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City',
        'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        149.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ),
      new Place(
        'p2',
        'L\'Amour Toujours',
        'A romantic place in Paris ',
        'https://www.parisperfect.com/g/apartment-hero-images/hi_lalande-64-new.jpg',
        189.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ),
      new Place(
        'p3',
        'The Foggy Palace',
        'Not your average city trip',
        'https://www.finestluxuryvacations.com/uploads/residences/img5ac5074b14e7e.jpg',
        99.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      )
    ]
  );

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
      );
// tslint:disable-next-line: align
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
      setTimeout(() => {
        this._places.next(places.concat(newPlace));
     }, 1000);
    }));
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
        );
      this._places.next(updatedPlaces);
    }));
  }
}
