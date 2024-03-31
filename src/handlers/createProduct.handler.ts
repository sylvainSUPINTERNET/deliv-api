import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database/client/prisma.service";
import { CreateProductCommand } from "src/commands/createProduct.command";
import { nanoid } from "nanoid";
 
@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private db: PrismaService) {}

    readonly _limitStorePerUser: number = 3;

    readonly regexPhone = /^\+33[1-9]\d{8}$/;
    readonly regexPrice = /^\d+(\.\d{2})?$/;

    async execute(command: CreateProductCommand ) {

        if ( command.productCreateDto.name === "" || command.productCreateDto.name === null ) {
            throw new Error('Name is required');
        }

        if ( command.productCreateDto.price === "" || command.productCreateDto.price === null
         || this.regexPrice.test(command.productCreateDto.price) === false) {
            throw new Error('Price is required');
        }

        if ( command.productCreateDto.isDeliveryAvailable === null ) {
            throw new Error('Is Delivery Available is required');
        }

        const store = await this.db.store.findUnique({
            where: {
                id: command.productCreateDto.storeId
            }
        });

        if ( store === null ) {
            throw new Error('Store not found');
        }
        
        store.products.push({
            name: command.productCreateDto.name,
            price: command.productCreateDto.price,
            sku: `${command.productCreateDto.name.trim()}-${nanoid(5)}`,
            // TODO : generate QR code and upload to firebase 
            // TODO : generate upload image URL and upload to firebase

            // imageUrl: command.productCreateDto.imageUrl,
            //qrCodeImageUrl: command.productCreateDto.qrCodeImageUrl,

            imgageUrl: "https://firebasestorage.googleapis.com/v0/b/qrstore-3b3b4.appspot.com/o/qrstore%2Fproduct%2Fdefault.png?alt=media&token",
            qrCodeImageUrl: "https://firebasestorage.googleapis.com/v0/b/qrstore-3b3b4.appspot.com/o/qrstore%2Fproduct%2Fdefault.png?alt=media&token",
            isDeliveryAvailable: command.productCreateDto.isDeliveryAvailable
        });

        return await this.db.store.update({
            where: {
                id: store.id
            },
            data: {
                products: store.products
            }
        });
    }
}