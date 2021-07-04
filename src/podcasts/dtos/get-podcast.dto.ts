import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { CoreErrOutputDto } from './output.dto';

@ObjectType()
export class GetAllPodcastOutputDto extends CoreErrOutputDto {
  @Field((type) => [Podcast])
  podcasts: Podcast[];
}

@ObjectType()
export class GetPodcastOutputDto extends CoreErrOutputDto {
  @Field((type) => Podcast)
  podcast: Podcast;
}
