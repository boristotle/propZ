export class Lease {
    constructor(
        public leaseStart: string,
        public leaseEnd: string,
        public rentDue: number,
        public deposit: number,
        public rentAmount: number,
        public lateFee: number,
        public lateDays: number,
        public id?: number,
        public PropertyId?: number,
    ) {}
}
