import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { Policy } from './Policy';

@Entity()
export class User {
  public static comparePassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(password === user.name);
    });
  }

  @PrimaryColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column()
  @AutoMap()
  public name: string;

  @IsNotEmpty()
  @Column()
  @AutoMap()
  public email: string;

  @IsNotEmpty()
  @Column()
  @AutoMap()
  public role: string;

  @OneToMany(() => Policy, (policy) => policy.client)
  public policies?: Policy[];

  public toString(): string {
    return `${this.name} (${this.email})`;
  }
}
