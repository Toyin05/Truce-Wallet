import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DexService } from './dex.service';
import { DexController } from './dex.controller';
import { SwapOrder } from '../database/entities/swap-order.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SwapOrder, Transaction]),
    BlockchainModule,
  ],
  controllers: [DexController],
  providers: [DexService],
  exports: [DexService],
})
export class DexModule {}