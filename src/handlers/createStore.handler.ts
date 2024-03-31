import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateStoreCommand } from "src/commands/createStore.command";
import { PrismaService } from "src/database/client/prisma.service";
import { nanoid } from 'nanoid'

@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
    constructor(private db: PrismaService) {}

    readonly _limitStorePerUser: number = 3;

    readonly regexPhone = /^\+33[1-9]\d{8}$/;

    async execute(command: CreateStoreCommand ) {

        let storesExistingCount = await this.db.store.count({
            where: {
                email: command.storeCreateDto.email
            }
        })

        if ( storesExistingCount >= this._limitStorePerUser ) {
            console.log(`Store cannot be created. Limit of ${this._limitStorePerUser} stores per user reached`)
            throw new Error('You have reached the limit of stores you can create');
        }

        if ( command.storeCreateDto.email === "" || command.storeCreateDto.email === null ) {
            throw new Error('Email is required');
        }

        if ( command.storeCreateDto.name === "" || command.storeCreateDto.name === null ) {
            throw new Error('Name is required');
        }

        if ( command.storeCreateDto.phoneNumber === "" || command.storeCreateDto.phoneNumber === null || this.regexPhone.test(command.storeCreateDto.phoneNumber) === false) {
            throw new Error('Phone number is required');
        }

        const store = await this.db.store.create({
            data: {
                ...command.storeCreateDto,
                slug: `${command.storeCreateDto.name.replace(/ /g, '-')}-${nanoid(5)}`
            }
        });
        
        return store;
    }
}