import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Tenant } from './tenants.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  private _tenants = new BehaviorSubject<Tenant[]>([
      new Tenant(
        'Bob Bobberson',
        '2309-420-9990',
        'bob@bob.com',
        '123-34-4555',
        '01/02/1977',
        '4-4444-444',
        1
      )
    ]
  );

  get tenants() {
    return this._tenants;
  }

  constructor(private authService: AuthService) { }

  getTenant(id: number) {
    return this._tenants.pipe(take(1), map(tenant => {
      return {...tenant.find(p => p.id === id)};
    }));
  }

  addTenant(
    name: string,
    phone: string,
    email: string,
    SSN: string,
    DOB: string,
    DL: string) {
    const newTenant = new Tenant(
        name,
        phone,
        email,
        SSN,
        DOB,
        DL,
      );

    return this._tenants.pipe(
      take(1),
      delay(1000),
      tap(places => {
      setTimeout(() => {
        this._tenants.next(places.concat(newTenant));
     }, 1000);
    }));
  }

  updateTenant(
    tenantId: number,
    name: string,
    phone: string,
    email: string,
    SSN: string,
    DOB: string,
    DL: string
    ) {
    return this.tenants.pipe(
      take(1),
      delay(1000),
      tap(tenants => {
      const updatedTenantIndex = tenants.findIndex(pl => pl.id === tenantId);
      const updatedTenants = [...tenants];
      const oldTenant = updatedTenants[updatedTenantIndex];
      updatedTenants[updatedTenantIndex] = new Tenant(
        name,
        phone,
        email,
        SSN,
        DOB,
        DL,
        oldTenant.id
        );
      this._tenants.next(updatedTenants);
    }));
  }
}
