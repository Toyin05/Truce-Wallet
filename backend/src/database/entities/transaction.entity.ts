import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

export enum TransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
  SWAP = 'swap',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
  CLAIM_REWARDS = 'claim_rewards',
  PRESALE_BUY = 'presale_buy',
  PRESALE_CLAIM = 'presale_claim',
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum ChainType {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BSC = 'bsc',
  BLOCKDAG = 'blockdag',
}

@Entity('transactions')
@Index(['fromUserId', 'toUserId'])
@Index(['chain', 'status'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  fromUserId: string;

  @Column({ type: 'uuid', nullable: true })
  toUserId: string;

  @Column({ type: 'simple-enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'simple-enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column({ type: 'simple-enum', enum: ChainType })
  chain: ChainType;

  @Column({ nullable: true })
  fromAddress: string;

  @Column({ nullable: true })
  toAddress: string;

  @Column({ nullable: true })
  tokenAddress: string;

  @Column({ nullable: true })
  tokenSymbol: string;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  amount: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  fee: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, nullable: true })
  usdValue: string;

  @Column({ nullable: true })
  transactionHash: string;

  @Column({ nullable: true })
  blockNumber: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.sentTransactions)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ManyToOne(() => User, user => user.receivedTransactions)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;
}