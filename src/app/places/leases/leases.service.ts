import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Lease } from './leases.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data-service';

@Injectable({
  providedIn: 'root'
})
export class LeasesService {

  constructor(private dataService: DataService) {}

  private _leases = this.dataService.getLeases();

  get leases() {
    return this._leases;
  }

  getLease(id: number) {
    return this._leases.pipe(take(1), map((leases: Lease[]) => {
      return {...leases.find(p => p.id === id)};
    }));
  }

  addLease(
    leaseStart: string,
    leaseEnd: string,
    rentDueDay: number,
    deposit: number,
    rentAmountDue: number,
    dailyLateFee: number,
    lateDaysAllowed: number,
    PropertyId: number) {
    const newLease = new Lease(
        leaseStart,
        leaseEnd,
        rentDueDay,
        deposit,
        rentAmountDue,
        dailyLateFee,
        lateDaysAllowed,
        PropertyId
      );

    return this._leases.pipe(
      take(1),
      delay(1000),
      tap(leases => {
      setTimeout(() => {
        // this._leases.next(leases.concat(newLease));
     }, 1000);
    }));
  }

  updateLease(
    leaseStart: string,
    leaseEnd: string,
    rentDueDay: number,
    deposit: number,
    rentAmountDue: number,
    dailyLateFee: number,
    lateDaysAllowed: number,
    leaseId: number,
    PropertyId: number
    ) {
    return this._leases.pipe(
      take(1),
      delay(1000),
      tap((leases: Lease[]) => {
      const updatedLeaseIndex = leases.findIndex(pl => pl.id === leaseId);
      const updatedLeases = [...leases];
      const oldLease = updatedLeases[updatedLeaseIndex];
      updatedLeases[updatedLeaseIndex] = new Lease(
        leaseStart,
        leaseEnd,
        rentDueDay,
        deposit,
        rentAmountDue,
        dailyLateFee,
        lateDaysAllowed,
        oldLease.id,
        PropertyId
        );
      // this._leases.next(updatedLeases);
    }));
  }
}
