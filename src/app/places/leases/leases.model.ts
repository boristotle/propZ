export class Lease {
    constructor(
        public propertyAddress: string,
        public leaseStart: string,
        public leaseEnd: string,
        public rentDue: string,
        public deposit: string,
        public rentAmount: string,
        public lateFee: string,
        public lateDays: string,
        public id?: number,
    ) {}
}
