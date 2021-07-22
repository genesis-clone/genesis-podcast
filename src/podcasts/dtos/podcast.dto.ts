import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class PodcastSearchInput {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}

@InputType()
export class EpisodesSearchInput {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;

  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}

@ObjectType()
export class FindEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;
}
