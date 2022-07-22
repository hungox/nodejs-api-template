import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';

import { Post as PostAds } from '@api/models/Post';
import { PostCreateRequest } from '@api/requests/Post/PostCreateRequest';
import { PostService } from '@api/services/PostService';

@Service()
@JsonController('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  public create(@Body() post: PostCreateRequest): Promise<PostAds> {
    return this.postService.create(post);
  }
}
