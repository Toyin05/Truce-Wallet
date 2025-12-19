import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { DexModule } from './dex/dex.module';
import { StakingModule } from './staking/staking.module';
import { MarketModule } from './market/market.module';
import { AiModule } from './ai/ai.module';
import { PresaleModule } from './presale/presale.module';
import { SecurityModule } from './security/security.module';
import { DatabaseModule } from './database/database.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    DatabaseModule,
    BlockchainModule,
    AuthModule,
    WalletModule,
    DexModule,
    StakingModule,
    MarketModule,
    AiModule,
    PresaleModule,
    SecurityModule,
  ],
})
export class AppModule {}