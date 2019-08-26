export class Lease {
    constructor(
        public propertyAddress: string,
        public leaseStart: Date,
        public leaseEnd: Date,
        public rentDue: string,
        public deposit: string,
        public rentAmount: string,
        public lateFee: string,
        public lateDays: string,
        public id?: number,
    ) {}
}
