export class Tenant {
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public SSN: string,
        public DOB: Date,
        public DL: string,
        public id?: number,
        ) {}
}
