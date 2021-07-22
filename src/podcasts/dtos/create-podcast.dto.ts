import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class CreatePodcastDto extends OmitType(Podcast, ['id', 'episodes']) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  id?: number;
}
