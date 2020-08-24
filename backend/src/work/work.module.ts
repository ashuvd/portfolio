import { Module } from '@nestjs/common'
import { WorkResolver } from './work.resolver'
import { workProviders } from './work.providers';

@Module({
  providers: [WorkResolver, ...workProviders],
})
export class WorkModule {}
