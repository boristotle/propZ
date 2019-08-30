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
        '10-22-2019',
        '10-22-2020',
        1,
        2000,
        2000,
        20,
        3,
        1
      ),
      new Lease(
        '10-22-2019',
        '10-22-2020',
        30,
        1500,
        1500,
        20,
        3,
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
    leaseStart: string,
    leaseEnd: string,
    rentDue: number,
    deposit: number,
    rentAmount: number,
    lateFee: number,
    lateDays: number,
    PropertyId: number) {
    const newLease = new Lease(
        leaseStart,
        leaseEnd,
        rentDue,
        deposit,
        rentAmount,
        lateFee,
        lateDays,
        PropertyId
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
    leaseStart: string,
    leaseEnd: string,
    rentDue: number,
    deposit: number,
    rentAmount: number,
    lateFee: number,
    lateDays: number,
    leaseId: number,
    PropertyId: number
    ) {
    return this._leases.pipe(
      take(1),
      delay(1000),
      tap(leases => {
      const updatedLeaseIndex = leases.findIndex(pl => pl.id === leaseId);
      const updatedLeases = [...leases];
      const oldLease = updatedLeases[updatedLeaseIndex];
      updatedLeases[updatedLeaseIndex] = new Lease(
        leaseStart,
        leaseEnd,
        rentDue,
        deposit,
        rentAmount,
        lateFee,
        lateDays,
        oldLease.id,
        PropertyId
        );
      this._leases.next(updatedLeases);
    }));
  }
}
