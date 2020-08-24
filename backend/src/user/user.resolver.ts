import { Resolver } from '@nestjs/graphql'
import { Inject } from '@nestjs/common';
import User from '../models/User';

@Resolver(of => User)
export class UserResolver {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: typeof User) {
  }
}
