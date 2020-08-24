import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { WorkModule } from './work/work.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLUpload } from 'apollo-server-express';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    SkillModule,
    WorkModule,
    AuthModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      // installSubscriptionHandlers: true, // For subscriptions
      // autoSchemaFile: 'schema.gql', // For code first
      typePaths: ['./src/**/*.graphql'], // For schema first
      // resolvers: { Upload: GraphQLUpload },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        // outputAs: 'class',
      },
      // schemaDirectives: {
      //   upper: UpperCaseDirective,
      // },
      // uploads: {
      //   maxFileSize: 10000000, // 10 MB
      //   maxFiles: 5
      // }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
