import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateEpisodeDto {
  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;
}
