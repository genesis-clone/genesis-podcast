import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { EpisodeResolver, PodcastsResolver } from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [PodcastsResolver, EpisodeResolver, PodcastsService],
  exports: [PodcastsService],
})
export class PodcastsModule {}
