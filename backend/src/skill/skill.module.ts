import { Module } from '@nestjs/common'
import { SkillResolver } from './skill.resolver'
import { skillProviders } from './skill.providers';

@Module({
  providers: [SkillResolver, ...skillProviders],
})
export class SkillModule {}
