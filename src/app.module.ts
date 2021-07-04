import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PodcastsModule } from './podcasts/podcasts.module';

@Module({
  imports: [PodcastsModule, GraphQLModule.forRoot({ autoSchemaFile: true })],
})
export class AppModule {}
