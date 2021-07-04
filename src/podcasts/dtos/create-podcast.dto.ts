import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePodcastDto {
  @Field((type) => String)
  readonly title: string;

  @Field((type) => String)
  readonly category: string;
}

@ObjectType()
export class CreatePodcastOutputDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => String, { nullable: true })
  err?: string;
}
