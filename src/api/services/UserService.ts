import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { v4 as uudiv4 } from 'uuid';

import { mapper } from '@api/mapping/mapper';
import { User } from '@api/models/User';
import { UserRepository } from '@api/repositories/UserRepository';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { events } from '@api/subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { Logger, LoggerInterface } from '@base/decorators/Logger';

@Service()
export class UserService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(name?: string): Promise<User[]> {
    this.log.info('Find all users by query');
    const query = name ? { name } : {};

    return this.userRepository.find({
      relations: ['policies'],
      where: query,
    });
  }

  public findOne(id: string): Promise<User | undefined> {
    this.log.info('Find one user');
    return this.userRepository.findOne({
      relations: ['policies'],
      where: { id },
    });
  }

  public findByPolicyNumber(id: string): Promise<User | undefined> {
    this.log.info('Find one user by policy number');
    return this.userRepository.findByPolicyNumber(id);
  }

  public async create(userRequest: UserCreateRequest): Promise<User> {
    this.log.info('Create a new user1 => ', userRequest.toString());
    const user = mapper.map(userRequest, UserCreateRequest, User);
    user.id = uudiv4();
    console.log('yy', user.toString());
    const newUser = await this.userRepository.save(user);
    this.eventDispatcher.dispatch(events.user.created, newUser);
    return newUser;
  }

  public update(id: string, user: User): Promise<User> {
    this.log.info('Update a user');
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    this.log.info('Delete a user');
    await this.userRepository.delete(id);
    return;
  }
}
