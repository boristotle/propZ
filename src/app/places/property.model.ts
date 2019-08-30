export class Property {
    constructor(
        public address: string,
        public purchaseDate: string,
        public purchasePrice: string,
        public homeValue: string,
        // public description: string,
        public imageUrl: string,
        public mortgage: string,
        public insurance: string,
        public taxes: string,
        public id?: number,
        ) {}
}
