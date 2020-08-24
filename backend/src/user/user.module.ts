import { Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { userProviders } from './user.providers';

@Module({
  providers: [UserResolver, ...userProviders],
  exports: [UserResolver, ...userProviders]
})
export class UserModule {}
