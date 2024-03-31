import { Module } from '@nestjs/common';
import { PrismaService } from './client/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class DatabaseModule {}
