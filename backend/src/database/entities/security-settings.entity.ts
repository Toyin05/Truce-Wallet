import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum TwoFactorMethod {
  NONE = 'none',
  SMS = 'sms',
  EMAIL = 'email',
  AUTHENTICATOR = 'authenticator',
}

export enum SecurityLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  HIGH = 'high',
  MAXIMUM = 'maximum',
}

@Entity('security_settings')
export class SecuritySettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'simple-enum', enum: TwoFactorMethod, default: TwoFactorMethod.NONE })
  twoFactorMethod: TwoFactorMethod;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ type: 'simple-enum', enum: SecurityLevel, default: SecurityLevel.BASIC })
  securityLevel: SecurityLevel;

  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: true })
  smsNotifications: boolean;

  @Column({ default: true })
  transactionNotifications: boolean;

  @Column({ default: false })
  suspiciousActivityAlerts: boolean;

  @Column({ default: true })
  loginAlerts: boolean;

  @Column({ type: 'jsonb', nullable: true })
  trustedDevices: any[];

  @Column({ type: 'jsonb', nullable: true })
  trustedIPs: string[];

  @Column({ default: 3 })
  maxLoginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChange: Date;

  @Column({ type: 'jsonb', nullable: true })
  biometricSettings: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  sessionSettings: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.securitySettings)
  @JoinColumn({ name: 'userId' })
  user: User;
}