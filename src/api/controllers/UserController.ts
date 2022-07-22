import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  QueryParam,
  Req,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

import { UserNotFoundError } from '@api/errors/Users/UserNotFoundError';
import { User } from '@api/models/User';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { UserService } from '@api/services/UserService';

@OpenAPI({
  security: [{ basicAuth: [] }],
})
@Service()
@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Authorized(['user', 'admin'])
  @Get()
  public async find(@QueryParam('name') name: string): Promise<User[] | undefined> {
    const x = await this.userService.find(name);
    console.log('abc');
    return x;
  }

  @Authorized(['user', 'admin'])
  @Get('/me')
  public findMe(@Req() req: any): Promise<User[]> {
    return req.user;
  }

  @Authorized(['admin'])
  @Get('/policy/:id')
  @OnUndefined(UserNotFoundError)
  public oneByPolicyNumber(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findByPolicyNumber(id);
  }

  @Authorized(['user', 'admin'])
  @Get('/:id')
  @OnUndefined(UserNotFoundError)
  public one(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Authorized(['admin'])
  @Post()
  public create(@Body() user: UserCreateRequest): Promise<User> {
    return this.userService.create(user);
  }

  @Authorized(['admin'])
  @Put('/:id')
  public update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Authorized(['admin'])
  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
