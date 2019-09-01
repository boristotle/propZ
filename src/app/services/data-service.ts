import { Injectable } from '@angular/core';
import { catchError, map, } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Property } from '../places/property.model';
import { Lease } from '../places/leases/leases.model';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    // LEASES
    getLeases() {
        return this.http.get('http://localhost:3000/api/leases').pipe(
            catchError(err => err)
        );
    }


    // PROPERTIES
    getProperties() {
        return this.http.get('http://localhost:3000/api/properties').pipe(
            catchError(err => err)
        );
    }

    createProperty(property: Property) {
        return this.http.post('http://localhost:3000/api/properties', property).pipe(
            map(res => res),
            catchError(err => err)
        );
    }

    updateProperty(property: Property) {
        return this.http.post(`http://localhost:3000/api/properties/${property.id}`, property).pipe(
            map(res => res),
            catchError(err => err)
        );
    }


    // TENANTS

    getTenants() {
        return this.http.get('http://localhost:3000/api/tenants').pipe(
            catchError(err => err)
        );
    }

    // EXPENSES

    getExpenses() {
        return this.http.get('http://localhost:3000/api/expenses').pipe(
            catchError(err => err)
        );
    }
}
