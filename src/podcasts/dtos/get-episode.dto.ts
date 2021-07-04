import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { CoreErrOutputDto } from './output.dto';

@ObjectType()
export class GetEpisodesOutputDto extends CoreErrOutputDto {
  @Field((type) => [Episode])
  episodes: Episode[];
}

@ObjectType()
export class FindEpisodeOutputDto extends CoreErrOutputDto {
  @Field((type) => Episode)
  episode: Episode;
}
