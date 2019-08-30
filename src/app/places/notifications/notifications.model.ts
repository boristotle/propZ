export class Notification {
    constructor(
        public description: string,
        public category: string,
        public createdAt: string,
        public LeaseId: number,
        public id?: number
    ) {}
}
