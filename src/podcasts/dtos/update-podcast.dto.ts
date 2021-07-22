import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePodcastDto } from './create-podcast.dto';

@InputType()
export class UpdatePodcastInputType extends PartialType(CreatePodcastDto) {}

@InputType()
export class UpdatePodcastDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdatePodcastInputType)
  data: UpdatePodcastInputType;
}
