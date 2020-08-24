import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import {BadRequestException, Inject, UseGuards} from '@nestjs/common';
import Work from '../models/Work';
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from 'fs';
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
  async createWork(@Args('title') title: string, @Args('description') description: string, @Args('link') link: string, @Args({ name: 'file', type: () => GraphQLUpload }) upload: FileUpload): Promise<Work> {
    const fileName = uuid()+upload.filename;
    const file = await new Promise(async (resolve, reject) => {
      return upload.createReadStream()
        .pipe(createWriteStream(`./public/upload/${fileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
    return this.workRepository.create({title, description, link, image: `\\upload\\${fileName}`});
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Work)
  async changeWorkById(@Args('id') id: number, @Args('title') title: string, @Args('description') description: string, @Args('link') link: string, @Args({ name: 'file', type: () => GraphQLUpload }) upload: FileUpload): Promise<Work> {
    const work = await this.workRepository.findByPk(id);
    if (!work) {
      throw new BadRequestException('Работа не найдена');
    }
    if (!upload) {
      return work.update({title, description, link});
    }
    const fileName = uuid()+upload.filename;
    await new Promise(async (resolve, reject) => {
      return upload.createReadStream()
        .pipe(createWriteStream(`./public/upload/${fileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
    return work.update({title, description, link, image: `\\upload\\${fileName}`});
  }
}
