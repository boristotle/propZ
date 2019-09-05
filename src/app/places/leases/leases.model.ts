export class Lease {
    constructor(
        public leaseStart: string,
        public leaseEnd: string,
        public rentDue: number,
        public deposit: number,
        public rentAmountDue: number,
        public dailyLateFee: number,
        public lateDaysAllowed: number,
        public id?: number,
        public PropertyId?: number,
    ) {}
}
