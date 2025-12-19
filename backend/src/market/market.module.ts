import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { MarketData } from '../database/entities/market-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketData])],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}