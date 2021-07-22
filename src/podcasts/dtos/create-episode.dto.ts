import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { PodcastSearchInput } from './podcast.dto';

@InputType()
export class CreateEpisodeDto extends IntersectionType(
  PodcastSearchInput,
  PickType(Episode, ['title', 'category'] as const),
) {}
