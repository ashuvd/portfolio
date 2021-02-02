import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import {BadRequestException, Inject, UseGuards} from '@nestjs/common';
import Work from '../models/Work';
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import {GqlAuthGuard} from "../auth/jwt-auth.guard";

@Resolver(of => Work)
export class WorkResolver {
  constructor(@Inject('WORK_REPOSITORY') private readonly workRepository: typeof Work) {
  }
  @Query(returns => [Work])
  works(): Promise<Work[]> {
    return this.workRepository.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Query(returns => Work)
  work(@Args('id') id: number): Promise<Work> {
    return this.workRepository.findByPk(id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Work)
  async deleteWorkById(@Args('id') id: number): Promise<Work> {
    const work = await this.workRepository.findByPk(id);
    if (!work) {
      return work;
    }
    work.destroy();
    return work;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Work)
  async createWork(@Args('title') title: string, @Args('description') description: string, @Args('link') link: string, @Args('github_link') github_link: string, @Args({ name: 'file', type: () => GraphQLUpload }) upload: any): Promise<Work> {
    if (!upload) {
      throw new BadRequestException('Вы не загрузили изображение');
    }
    const file = await upload.promise;
    const fileName = uuid()+file.filename;
    await new Promise(async (resolve, reject) => {
      return file.createReadStream()
        .pipe(createWriteStream(join(__dirname, '..', '..', 'public', 'upload', fileName)))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
    return this.workRepository.create({title, description, link, github_link, image: `\\upload\\${fileName}`});
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Work)
  async changeWorkById(@Args('id') id: number, @Args('title') title: string, @Args('description') description: string, @Args('link') link: string, @Args('github_link') github_link: string, @Args({ name: 'file', type: () => GraphQLUpload }) upload: any): Promise<Work> {
    const work = await this.workRepository.findByPk(id);
    if (!work) {
      throw new BadRequestException('Работа не найдена');
    }
    if (!upload) {
      return work.update({title, description, link, github_link});
    }
    const file = await upload.promise;
    const fileName = uuid()+file.filename;
    await new Promise(async (resolve, reject) => {
      return file.createReadStream()
        .pipe(createWriteStream(join(__dirname, '..', '..', 'public', 'upload', fileName)))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
    return work.update({title, description, link, github_link, image: `\\upload\\${fileName}`});
  }
}
