import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database/client/prisma.service";
import { DeleteProductCommand } from "src/commands/deleteProduct.command";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private db: PrismaService) {}

    async execute(command: DeleteProductCommand ) {

        const store = await this.db.store.findUnique({
            where: { id: command.productDeleteDto.storeId }
        });

        const productsToDelete = store.products.filter( (product:any) => !command.productDeleteDto.skuList.includes(product.sku));

        const updatedStore = await this.db.store.update({
            where: { id: command.productDeleteDto.storeId },
            data: {
                products: productsToDelete
            }
        });

        return updatedStore;
    }
}