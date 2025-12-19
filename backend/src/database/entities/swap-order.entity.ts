import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

export enum SwapOrderStatus {
  PENDING = 'pending',
  EXECUTING = 'executing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum SwapOrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

@Entity('swap_orders')
@Index(['userId', 'status'])
@Index(['status', 'createdAt'])
export class SwapOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'simple-enum', enum: SwapOrderType, default: SwapOrderType.MARKET })
  type: SwapOrderType;

  @Column({ type: 'simple-enum', enum: SwapOrderStatus, default: SwapOrderStatus.PENDING })
  status: SwapOrderStatus;

  @Column()
  fromTokenSymbol: string;

  @Column()
  fromTokenAddress: string;

  @Column()
  toTokenSymbol: string;

  @Column()
  toTokenAddress: string;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  fromAmount: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, nullable: true })
  toAmount: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, nullable: true })
  minimumToAmount: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  slippageTolerance: string;

  @Column({ nullable: true })
  transactionHash: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  fee: string;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @Column({ type: 'jsonb', nullable: true })
  route: any[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.swapOrders)
  @JoinColumn({ name: 'userId' })
  user: User;
}