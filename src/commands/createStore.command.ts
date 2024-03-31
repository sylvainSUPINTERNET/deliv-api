import { StoreCreateDto } from "src/controllers/store/storeCreate.dto";

export class CreateStoreCommand {
    constructor(
        public readonly storeCreateDto: StoreCreateDto
    ) {}
}