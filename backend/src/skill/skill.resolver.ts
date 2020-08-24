import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import {Inject, BadRequestException, UseGuards} from '@nestjs/common';
import Skill from '../models/Skill';
import {GqlAuthGuard} from "../auth/jwt-auth.guard";

@Resolver(of => Skill)
export class SkillResolver {
  constructor(@Inject('SKILL_REPOSITORY') private readonly skillRepository: typeof Skill) {
  }
  @Query(returns => [Skill])
  skills(): Promise<Skill[]> {
    return this.skillRepository.findAll({
      order: [['id', 'ASC']]
    });
  }
  @UseGuards(GqlAuthGuard)
  @Query(returns => Skill)
  skill(@Args('id') id: number): Promise<Skill> {
    return this.skillRepository.findByPk(id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Skill)
  async deleteSkillById(@Args('id') id: string): Promise<Skill> {
    const skill = await this.skillRepository.findByPk(id);
    if (!skill) {
      return skill;
    }
    skill.destroy();
    return skill;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Skill)
  async createSkill(@Args('title') title: string, @Args('percents') percents: number, @Args('category') category: string): Promise<Skill> {
    return this.skillRepository.create({title, percents, category});
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Skill)
  async changeSkillById(@Args('title') title: string, @Args('percents') percents: number, @Args('category') category: string, @Args('id') id: number): Promise<Skill> {
    const skill = await this.skillRepository.findByPk(id);
    if (!skill) {
      throw new BadRequestException('Скил не найден');
    }
    return skill.update({title, percents, category});
  }
}
