import { Property } from '../property.model';

export class Lease {
    constructor(
        public leaseStart: string,
        public leaseEnd: string,
        public rentDueDay: number,
        public deposit: number,
        public rentAmountDue: number,
        public dailyLateFee: number,
        public lateDaysAllowed: number,
        public id?: number,
        public PropertyId?: number,
        public Property?: Property,
        public LeasePayments?: {amountPaid: number}[]
    ) {}
}
