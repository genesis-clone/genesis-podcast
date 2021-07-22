import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class CoreOutput {
  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  error?: string;

  @Field((type) => Boolean)
  @IsBoolean()
  ok: boolean;
}
