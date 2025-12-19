import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

export enum StakingStatus {
  ACTIVE = 'active',
  UNSTAKING = 'unstaking',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('staking_positions')
@Index(['userId', 'status'])
@Index(['poolId', 'status'])
export class StakingPosition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  poolId: string;

  @Column()
  tokenSymbol: string;

  @Column()
  tokenAddress: string;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  stakedAmount: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  rewardsEarned: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  apy: string;

  @Column({ type: 'simple-enum', enum: StakingStatus, default: StakingStatus.ACTIVE })
  status: StakingStatus;

  @Column({ nullable: true })
  lockPeriod: number; // in seconds

  @Column({ nullable: true })
  unlockTime: Date;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  lastRewardClaim: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.stakingPositions)
  @JoinColumn({ name: 'userId' })
  user: User;
}