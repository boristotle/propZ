import { Injectable } from '@angular/core';
import { catchError, map, } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Property } from '../places/property.model';
import { Lease } from '../places/leases/leases.model';
import { Observable } from 'rxjs';
import { Expense } from '../places/expenses/expenses.model';
import { Tenant } from '../places/tenants/tenants.model';
const EMULATOR_URL = '10.0.2.2:3000';
// const EMULATOR_URL = 'localhost:3000';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    // LEASES
    getLeases() {
        return this.http.get(`http://${EMULATOR_URL}/api/leases`).pipe(
            catchError(err => err)
        );
    }

    createLease(lease: Lease) {
        return this.http.post(`http://${EMULATOR_URL}/api/leases`, lease).pipe(
            map(res => res),
            catchError(err => err)
        );
    }


    // PROPERTIES
    getProperties() {
        return this.http.get(`http://${EMULATOR_URL}/api/properties`).pipe(
            catchError(err => err)
        );
    }

    createProperty(property: Property) {
        return this.http.post(`http://${EMULATOR_URL}/api/properties`, property).pipe(
            map(res => res),
            catchError(err => err)
        );
    }

    updateProperty(property: Property) {
        return this.http.post(`http://${EMULATOR_URL}/api/properties/${property.id}`, property).pipe(
            map(res => res),
            catchError(err => err)
        );
    }


    // TENANTS

    getTenants() {
        return this.http.get(`http://${EMULATOR_URL}/api/tenants`).pipe(
            catchError(err => err)
        );
    }

    createTenant(tenant: Tenant) {
        return this.http.post(`http://${EMULATOR_URL}/api/tenants`, tenant).pipe(
            map(res => res),
            catchError(err => err)
        );
    }

    updateTenant(tenant: Tenant) {
        return this.http.post(`http://${EMULATOR_URL}/api/tenants/${tenant.id}`, tenant).pipe(
            map(res => res),
            catchError(err => err)
        );
    }

    // EXPENSES

    getExpenses() {
        return this.http.get(`http://${EMULATOR_URL}/api/expenses`).pipe(
            catchError(err => err)
        );
    }

    getExpense(id) {
        return this.http.get(`http://${EMULATOR_URL}/api/expenses/${id}`).pipe(
            catchError(err => err)
        );
    }

    createExpense(expense: Expense) {
        return this.http.post(`http://${EMULATOR_URL}/api/expenses`, expense).pipe(
            map(res => res),
            catchError(err => err)
        );
    }
}
