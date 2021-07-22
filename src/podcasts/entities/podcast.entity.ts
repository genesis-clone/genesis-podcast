import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @Column()
  @Field((type) => Number, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  rating: number;

  @Field((type) => [Episode], { nullable: true })
  @OneToMany((type) => Episode, (episode) => episode.podcast, { cascade: true })
  episodes?: Episode[];
}
