export class StoreCreateDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly phoneNumber: string
    ) {}
}