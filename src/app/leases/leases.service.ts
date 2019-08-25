import {Injectable} from '@angular/core';
import { Leases } from './leases.model';

@Injectable({providedIn: 'root'})
export class LeasesService {
    private _bookings: Leases[] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            userId: 'abc',
            guestNumber: 2
        }
    ];

    get bookings() {
        return [...this._bookings];
    }
}
