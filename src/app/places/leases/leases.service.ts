import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Lease } from './leases.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeasesService {

  private _leases = new BehaviorSubject<Lease[]>([
      new Lease(
        '1234 5th Street',
        '10-22-2019',
        '10-22-2020',
        '22',
        '149.99',
        '100',
        '200',
        '20',
        1
      ),
      new Lease(
        '1234 6th Street',
        '10-22-2019',
        '10-22-2020',
        '22',
        '200',
        '100',
        '200',
        '20',
        2
      ),
    ]
  );

  get leases() {
    return this._leases;
  }

  constructor(private authService: AuthService) { }

  getLease(id: number) {
    return this._leases.pipe(take(1), map(leases => {
      return {...leases.find(p => p.id === id)};
    }));
  }

  addLease(
    propertyAddress: string,
    leaseStart: Date,
    leaseEnd: Date,
    rentDue: string,
    deposit: string,
    rentAmount: string,
    lateFee: string,
    lateDays: string) {
    const newLease = new Lease(
        propertyAddress,
        leaseStart,
        leaseEnd,
        rentDue,
        deposit,
        rentAmount,
        lateFee,
        lateDays
      );
// tslint:disable-next-line: align
    return this._leases.pipe(
      take(1),
      delay(1000),
      tap(places => {
      setTimeout(() => {
        this._leases.next(places.concat(newLease));
     }, 1000);
    }));
  }

  updateLease(
    propertyAddress: string,
    leaseStart: Date,
    leaseEnd: Date,
    rentDue: string,
    deposit: string,
    rentAmount: string,
    lateFee: string,
    lateDays: string,
    leaseId: number,
    ) {
    return this._leases.pipe(
      take(1),
      delay(1000),
      tap(leases => {
      const updatedLeaseIndex = leases.findIndex(pl => pl.id === leaseId);
      const updatedLeases = [...leases];
      const oldLease = updatedLeases[updatedLeaseIndex];
      updatedLeases[updatedLeaseIndex] = new Lease(
        propertyAddress,
        leaseStart,
        leaseEnd,
        rentDue,
        deposit,
        rentAmount,
        lateFee,
        lateDays,
        oldLease.id
        );
      this._leases.next(updatedLeases);
    }));
  }
}
