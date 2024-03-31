
export class ProductCreateDto {
    constructor(
        public readonly name: string,
        public readonly price: string,
        public readonly isDeliveryAvailable: boolean,
        public readonly storeId: string
    ) {}
}