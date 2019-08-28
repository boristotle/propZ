export class Notification {
    constructor(
        public description: string,
        public category: string,
        public date: string,
        public propertyId: number,
        public leaseId: number,
        public id?: number
    ) {}
}
