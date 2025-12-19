import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { AIInsight } from '../database/entities/ai-insight.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AIInsight]),
    BlockchainModule,
  ],
  controllers: [AIController],
  providers: [AIService],
  exports: [AIService],
})
export class AiModule {}