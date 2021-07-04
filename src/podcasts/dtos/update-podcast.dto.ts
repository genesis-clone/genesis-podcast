import { Field, InputType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdatePodcastDto {
  @Field((type) => String, { nullable: true })
  readonly title?: string;

  @Field((type) => String, { nullable: true })
  readonly category?: string;

  @Field((type) => String, { nullable: true })
  readonly rating?: number;

  @Field((type) => String, { nullable: true })
  readonly episodes?: Episode[];
}
