import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';
import { StakingPosition } from './staking-position.entity';
import { SwapOrder } from './swap-order.entity';
import { AIInsight } from './ai-insight.entity';
import { SecuritySettings } from './security-settings.entity';
import { PresaleParticipation } from './presale-participation.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'simple-enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'simple-enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  emailVerifiedAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  preferences: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];

  @OneToMany(() => Transaction, transaction => transaction.fromUser)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.toUser)
  receivedTransactions: Transaction[];

  @OneToMany(() => StakingPosition, position => position.user)
  stakingPositions: StakingPosition[];

  @OneToMany(() => SwapOrder, order => order.user)
  swapOrders: SwapOrder[];

  @OneToMany(() => AIInsight, insight => insight.user)
  aiInsights: AIInsight[];

  @OneToMany(() => SecuritySettings, settings => settings.user)
  securitySettings: SecuritySettings[];

  @OneToMany(() => PresaleParticipation, participation => participation.user)
  presaleParticipations: PresaleParticipation[];
}