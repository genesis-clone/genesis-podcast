import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdatePodcastDto {
  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly category?: string;

  @Field((type) => String, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly rating?: number;

  @Field((type) => [Episode], { nullable: true })
  @IsOptional()
  readonly episodes?: Episode[];
}
