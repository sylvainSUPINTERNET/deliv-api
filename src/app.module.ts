import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { StoreService } from './services/store/store.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateStoreHandler } from './handlers/createStore.handler';
import { StoreController } from './controllers/store/store.controller';
import { CreateProductHandler } from './handlers/createProduct.handler';
import { DeleteProductHandler } from './handlers/deleteProduct.handler';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [StoreController],
  providers: [StoreService, CreateStoreHandler, CreateProductHandler, DeleteProductHandler],
})
export class AppModule {}
