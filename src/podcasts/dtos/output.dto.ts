import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreErrOutputDto {
  @Field((type) => String, { nullable: true })
  err?: string;
}
