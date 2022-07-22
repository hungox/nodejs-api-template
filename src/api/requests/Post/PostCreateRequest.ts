import { IsNotEmpty } from 'class-validator';

import { AutoMap } from '@automapper/classes';

export class PostCreateRequest {
  @IsNotEmpty()
  @AutoMap()
  public merchantId: number;
}
