import { User } from './../entity/User';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }
}
