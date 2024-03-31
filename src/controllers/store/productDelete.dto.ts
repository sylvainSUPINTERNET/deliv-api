export class ProductDeleteDto {
    constructor(
        public readonly storeId: string,
        public readonly skuList: string[]
    ) {}
}