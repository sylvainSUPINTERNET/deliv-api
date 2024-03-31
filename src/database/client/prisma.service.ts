
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    
    app.enableShutdownHooks();

    process.on('exit', () => {
      this.$disconnect();
    })
    process.on('beforeExit', () => {
      this.$disconnect();
    })
    process.on('SIGINT', () => {
      this.$disconnect();
    })
    process.on('SIGTERM', () => {
      this.$disconnect();
    })
    process.on('SIGUSR2', () => {
      this.$disconnect();
    })
  }
}