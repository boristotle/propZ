export class Notification {
    constructor(
        public description: string,
        public category: string,
        public createdAt: string,
        public PropertyId: number,
        public id?: number
    ) {}
}
