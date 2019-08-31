import { Injectable } from '@angular/core';
import { catchError, map, } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { Lease } from '../places/leases/leases.model';
// import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    getLeases() {
        return this.http.get('http://localhost:3000/api/leases').pipe(
            catchError(err => err)
        );
    }

    getTenants() {
        return this.http.get('http://localhost:3000/api/tenants').pipe(
            catchError(err => err)
        );
    }

    getProperties() {
        return this.http.get('http://localhost:3000/api/properties').pipe(
            catchError(err => err)
        );
    }
}
