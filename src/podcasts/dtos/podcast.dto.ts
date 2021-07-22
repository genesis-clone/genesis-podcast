import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class PodcastSearchInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  @IsOptional()
  podcasts?: Podcast[];
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  @IsOptional()
  podcast?: Podcast;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  @IsOptional()
  episodes?: Episode[];
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
export class FindEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  @IsOptional()
  episode?: Episode;
}
