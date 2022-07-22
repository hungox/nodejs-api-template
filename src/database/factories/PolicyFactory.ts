import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Policy } from '../../api/models/Policy';

define(Policy, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const pet = new Policy();
  pet.id = uuid.v1();
  pet.email = name;
  // pet.age = faker.random.number();
  return pet;
});
