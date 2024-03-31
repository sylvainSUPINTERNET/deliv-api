import { ProductDeleteDto } from "src/controllers/store/productDelete.dto";

export class DeleteProductCommand {
    constructor(
        public readonly productDeleteDto: ProductDeleteDto
    ) {}
}