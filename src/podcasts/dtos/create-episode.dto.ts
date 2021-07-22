import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Episode } from 'src/podcasts/entities/episode.entity';

@InputType()
class CreateEpisodeInputType extends OmitType(Episode, ['id', 'podcast']) {}

@InputType()
export class CreateEpisodeDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => CreateEpisodeInputType)
  data: CreateEpisodeInputType;
}
