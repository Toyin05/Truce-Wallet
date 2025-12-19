import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { StakingPosition } from '../database/entities/staking-position.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StakingPosition, Transaction]),
    BlockchainModule,
  ],
  controllers: [StakingController],
  providers: [StakingService],
  exports: [StakingService],
})
export class StakingModule {}