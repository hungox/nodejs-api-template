import { Post } from '@api/models/Post';
import { User } from '@api/models/User';
import { PostCreateRequest } from '@api/requests/Post/PostCreateRequest';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, UserCreateRequest, User);

createMap(mapper, PostCreateRequest, Post);
