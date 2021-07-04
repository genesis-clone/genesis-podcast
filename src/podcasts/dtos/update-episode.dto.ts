import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeDto {
  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => String, { nullable: true })
  category?: string;

  @Field((type) => Number, { nullable: true })
  rating?: number;
}
