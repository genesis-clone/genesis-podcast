import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Column()
  @Field((_) => String, { nullable: true })
  @IsString()
  title: string;

  @Column()
  @Field((_) => String, { nullable: true })
  @IsString()
  category: string;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  @Field((type) => Podcast)
  podcast: Podcast;
}
