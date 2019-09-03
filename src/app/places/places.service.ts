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
}
