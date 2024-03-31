import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from 'src/commands/createProduct.command';
import { CreateStoreCommand } from 'src/commands/createStore.command';
import { DeleteProductCommand } from 'src/commands/deleteProduct.command';
import { ProductCreateDto } from 'src/controllers/store/productCreate.dto';
import { ProductDeleteDto } from 'src/controllers/store/productDelete.dto';
import { StoreCreateDto } from 'src/controllers/store/storeCreate.dto';

@Injectable()
export class StoreService {
    constructor(private commandBus: CommandBus) {}

    async createStore(storeCreateDto: StoreCreateDto) {
        try {
            return this.commandBus.execute(new CreateStoreCommand(storeCreateDto));
        } catch ( error ) {
            console.log("Store service creation failed : ", error);
            throw new BadRequestException('Error occured', { cause: new Error(), description: "Error occured" })
        }
    }

    async addProductToStore(productCreateDto: ProductCreateDto) {
        try {
            return this.commandBus.execute(new CreateProductCommand(productCreateDto));
        } catch ( error ) {
            console.log("Store service add product failed : ", error);
            throw new BadRequestException('Error occured', { cause: new Error(), description: "Error occured" })
        }
    }

    async deleteProduct(productDeleteDto: ProductDeleteDto) {
        try {
            return this.commandBus.execute(new DeleteProductCommand(productDeleteDto));
        } catch ( error ) {
            console.log("Store service delete product failed : ", error);
            throw new BadRequestException('Error occured', { cause: new Error(), description: "Error occured" })
        }
    }
}
