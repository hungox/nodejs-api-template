import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { Merchant } from './Merchant';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({ name: 'merchant_id' })
  @AutoMap()
  public merchantId: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.posts, { nullable: false })
  @JoinColumn({ name: 'merchant_id' })
  public merchant: Merchant;
}
