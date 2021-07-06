import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';
import { CoreOutput } from './output.dto';

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

@ObjectType()
export class FindEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  @IsOptional()
  episode?: Episode;
}
