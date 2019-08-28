export class Property {
    constructor(
        public propertyAddress: string,
        public purchaseDate: string,
        public purchasePrice: string,
        // public description: string,
        public imageUrl: string,
        public mortgage: string,
        public insurance: string,
        public taxes: string,
        public id?: number,
        ) {}
}
