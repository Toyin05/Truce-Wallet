import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';
import { StakingPosition } from './entities/staking-position.entity';
import { SwapOrder } from './entities/swap-order.entity';
import { MarketData } from './entities/market-data.entity';
import { AIInsight } from './entities/ai-insight.entity';
import { SecuritySettings } from './entities/security-settings.entity';
import { PresaleParticipation } from './entities/presale-participation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_NAME', 'truce_wallet'),
        entities: [
          User,
          Wallet,
          Transaction,
          StakingPosition,
          SwapOrder,
          MarketData,
          AIInsight,
          SecuritySettings,
          PresaleParticipation,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Wallet,
      Transaction,
      StakingPosition,
      SwapOrder,
      MarketData,
      AIInsight,
      SecuritySettings,
      PresaleParticipation,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}