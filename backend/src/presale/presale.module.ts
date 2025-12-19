import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresaleService } from './presale.service';
import { PresaleController } from './presale.controller';
import { PresaleParticipation } from '../database/entities/presale-participation.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PresaleParticipation]),
    BlockchainModule,
  ],
  controllers: [PresaleController],
  providers: [PresaleService],
  exports: [PresaleService],
})
export class PresaleModule {}