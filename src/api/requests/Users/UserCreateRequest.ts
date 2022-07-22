import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { AutoMap } from '@automapper/classes';

export class UserCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public name: string;

  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public email: string;

  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public role: string;

  public toString(): string {
    return `${this.name} (${this.email})`;
  }
}
