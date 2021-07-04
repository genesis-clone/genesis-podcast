import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreatePodcastDto } from './create-podcast.dto';
import { CoreErrOutputDto } from './output.dto';

@InputType()
export class CreateEpisodeDto extends CreatePodcastDto {}

@ObjectType()
export class CreateEpisodeOutputDto extends CoreErrOutputDto {
  @Field((type) => Number)
  id: number;
}
