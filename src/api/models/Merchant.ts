import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Post } from './Post';

@Entity({ name: 'merchant' })
export class Merchant {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @OneToMany((type) => Post, (post) => post.merchant)
  public posts: Post[];
}
