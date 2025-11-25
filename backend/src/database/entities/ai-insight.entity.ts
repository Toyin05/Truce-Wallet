import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

export enum AIInsightType {
  PRICE_PREDICTION = 'price_prediction',
  MARKET_ANALYSIS = 'market_analysis',
  TRADING_SIGNAL = 'trading_signal',
  RISK_ASSESSMENT = 'risk_assessment',
  PORTFOLIO_ADVICE = 'portfolio_advice',
}

export enum AIInsightSentiment {
  VERY_BEARISH = -2,
  BEARISH = -1,
  NEUTRAL = 0,
  BULLISH = 1,
  VERY_BULLISH = 2,
}

@Entity('ai_insights')
@Index(['userId', 'type', 'createdAt'])
@Index(['type', 'symbol'])
export class AIInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'simple-enum', enum: AIInsightType })
  type: AIInsightType;

  @Column({ nullable: true })
  symbol: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-enum', enum: AIInsightSentiment, default: AIInsightSentiment.NEUTRAL })
  sentiment: AIInsightSentiment;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  confidence: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  riskLevel: string;

  @Column({ type: 'jsonb', nullable: true })
  recommendations: any[];

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any>;

  @Column({ nullable: true })
  aiModel: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.aiInsights)
  @JoinColumn({ name: 'userId' })
  user: User;
}