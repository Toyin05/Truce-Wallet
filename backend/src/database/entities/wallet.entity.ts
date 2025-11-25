import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum WalletType {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BSC = 'bsc',
  BLOCKDAG = 'blockdag',
}

export enum WalletStatus {
  ACTIVE = 'active',
  FROZEN = 'frozen',
  DEACTIVATED = 'deactivated',
}

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'simple-enum', enum: WalletType })
  type: WalletType;

  @Column()
  address: string;

  @Column({ nullable: true })
  encryptedPrivateKey: string;

  @Column({ nullable: true })
  publicKey: string;

  @Column({ type: 'simple-enum', enum: WalletStatus, default: WalletStatus.ACTIVE })
  status: WalletStatus;

  @Column({ type: 'decimal', precision: 36, scale: 18, default: '0' })
  balance: string;

  @Column({ type: 'jsonb', nullable: true })
  tokenBalances: Record<string, string>;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.wallets)
  @JoinColumn({ name: 'userId' })
  user: User;
}