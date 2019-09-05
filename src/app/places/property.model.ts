import { Lease } from './leases/leases.model';

export class Property {
    constructor(
        public address: string,
        public purchaseDate: string,
        public purchasePrice: number,
        public mortgageDebt: number,
        public homeValue: number,
        public Leases: Lease[],
        // public description: string,
        public imageUrl: string,
        public mortgage: number,
        public insurance: number,
        public taxes: number,
        public id?: number,
        ) {}
}
