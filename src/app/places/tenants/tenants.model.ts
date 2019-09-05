export class Tenant {
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public SSN: string,
        public DOB: string,
        public DL: string,
        public id?: number,
        public LeaseId?: number,
        ) {}
}
