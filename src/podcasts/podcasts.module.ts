import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { EpisodeResolver, PodcastsResolver } from './podcasts.resolver';

@Module({
  providers: [PodcastsResolver, EpisodeResolver, PodcastsService],
})
export class PodcastsModule {}
