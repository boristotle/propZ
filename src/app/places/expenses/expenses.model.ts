export class Expense {
    constructor(
        public PropertyId: number,
        public date: string,
        public amount: number,
        public category: string,
        public originalUUID: string,
        public id?: number,
        ) {}
}
