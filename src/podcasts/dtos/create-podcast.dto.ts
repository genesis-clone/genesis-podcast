import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePodcastDto extends OmitType(Podcast, ['id', 'episodes']) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  id?: number;
}
