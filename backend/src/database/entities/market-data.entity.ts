import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum MarketDataSource {
  COINGECKO = 'coingecko',
  BINANCE = 'binance',
  COINBASE = 'coinbase',
  KRAKEN = 'kraken',
  AI_ORACLE = 'ai_oracle',
}

@Entity('market_data')
@Index(['symbol', 'timestamp'])
@Index(['source', 'timestamp'])
export class MarketData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  symbol: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  price: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceChange24h: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceChangePercentage24h: string;

  @Column({ type: 'decimal', precision: 20, scale: 0, nullable: true })
  marketCap: string;

  @Column({ type: 'decimal', precision: 20, scale: 0, nullable: true })
  volume24h: string;

  @Column({ type: 'simple-enum', enum: MarketDataSource })
  source: MarketDataSource;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'jsonb', nullable: true })
  additionalData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}