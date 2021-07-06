import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreatePodcastDto } from './create-podcast.dto';

@InputType()
export class CreateEpisodeDto extends CreatePodcastDto {
  @Field((type) => String)
  @IsString()
  readonly title: string;

  @Field((type) => String)
  @IsString()
  readonly category: string;
}
