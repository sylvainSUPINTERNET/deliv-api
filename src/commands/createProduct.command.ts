import { ProductCreateDto } from "src/controllers/store/productCreate.dto";

export class CreateProductCommand {
    constructor(
        public readonly productCreateDto: ProductCreateDto
    ) {}
}