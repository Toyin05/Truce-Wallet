import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlockchainService } from './blockchain.service';
import { TokenService } from './token.service';
import { StakingService } from './staking.service';
import { DexService } from './dex.service';
import { PresaleService } from './presale.service';
import { AIOracleService } from './ai-oracle.service';

@Module({
  imports: [ConfigModule],
  providers: [
    BlockchainService,
    TokenService,
    StakingService,
    DexService,
    PresaleService,
    AIOracleService,
  ],
  exports: [
    BlockchainService,
    TokenService,
    StakingService,
    DexService,
    PresaleService,
    AIOracleService,
  ],
})
export class BlockchainModule {}