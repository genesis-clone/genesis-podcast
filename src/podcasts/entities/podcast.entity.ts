import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Episode } from './episode.entity';

enum PodcastCategory {
  COMEDY = 'COMEDY',
  ENTERTAINMENT = 'ENTERTAINMENT',
  EDUCATION = 'EDUCATION',
  NEWS = 'NEWS',
  BUSINESS = 'BUSINESS',
  FITNESS = 'FITNESS',
}

registerEnumType(PodcastCategory, { name: 'PodcastCategory' });
@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => PodcastCategory)
  @IsString()
  category: PodcastCategory;

  @Column()
  @Field((type) => Number, { defaultValue: 0 })
  @IsNumber()
  rating: number;

  @Field((type) => [Episode], { nullable: true })
  @OneToMany((type) => Episode, (episode) => episode.podcast, { cascade: true })
  episodes?: Episode[];
}
