import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { StoreService } from 'src/services/store/store.service';
import { StoreCreateDto } from './storeCreate.dto';
import { ProductCreateDto } from './productCreate.dto';
import { ProductDeleteDto } from './productDelete.dto';

@Controller('/api/store')
export class StoreController {
    constructor(private readonly storeService:StoreService) {}

    @Put("/products")
    async addProductToStore(@Body() productCreate: ProductCreateDto): Promise<any> {
      return await this.storeService.addProductToStore(productCreate);
    }

    @Post()
    async createStore(@Body() storeCreate: StoreCreateDto): Promise<any>  {
      return await this.storeService.createStore(new StoreCreateDto(storeCreate.name, storeCreate.email, storeCreate.phoneNumber));
    }

    @Delete("/products")
    async deleteProduct(@Body() productDeleteDto: ProductDeleteDto): Promise<any> {
      return await this.storeService.deleteProduct(productDeleteDto);
    }
    
}
