import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { SecuritySettings } from '../database/entities/security-settings.entity';
import { Transaction } from '../database/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecuritySettings, Transaction])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}