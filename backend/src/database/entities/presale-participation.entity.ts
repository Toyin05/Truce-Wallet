import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

export enum PresaleParticipationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CLAIMED = 'claimed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export enum PaymentCurrency {
  ETH = 'eth',
  USDC = 'usdc',
  USDT = 'usdt',
  BNB = 'bnb',
  MATIC = 'matic',
}

@Entity('presale_participations')
@Index(['userId', 'status'])
@Index(['status', 'createdAt'])
export class PresaleParticipation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'simple-enum', enum: PresaleParticipationStatus, default: PresaleParticipationStatus.PENDING })
  status: PresaleParticipationStatus;

  @Column({ type: 'simple-enum', enum: PaymentCurrency })
  paymentCurrency: PaymentCurrency;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  paymentAmount: string;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  tokenAmount: string;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  tokenPrice: string;

  @Column({ nullable: true })
  transactionHash: string;

  @Column({ nullable: true })
  claimTransactionHash: string;

  @Column({ type: 'timestamp', nullable: true })
  claimedAt: Date;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  claimedAmount: string;

  @Column({ type: 'jsonb', nullable: true })
  vestingSchedule: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.presaleParticipations)
  @JoinColumn({ name: 'userId' })
  user: User;
}