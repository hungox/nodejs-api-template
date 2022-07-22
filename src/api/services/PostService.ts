import { Service } from 'typedi';

import { mapper } from '@api/mapping/mapper';
import { Post } from '@api/models/Post';
import { PostCreateRequest } from '@api/requests/Post/PostCreateRequest';

@Service()
export class PostService {
  // constructor(
  //   // @InjectRepository() private userRepository: UserRepository,
  //   // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  //   // @Logger(__filename) private log: LoggerInterface
  // ) {}

  public create(postRequest: PostCreateRequest): Promise<Post> {
    const post = mapper.map(postRequest, PostCreateRequest, Post);
    console.log('x', post, postRequest);
    return new Promise((resolve) => {
      resolve(post);
    });
  }
}
