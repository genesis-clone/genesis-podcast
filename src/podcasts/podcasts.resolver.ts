import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePodcastDto,
  CreatePodcastOutputDto,
} from './dtos/create-podcast.dto';
import {
  GetAllPodcastOutputDto,
  GetPodcastOutputDto,
} from './dtos/get-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';
import { CoreErrOutputDto } from './dtos/output.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import {
  FindEpisodeOutputDto,
  GetEpisodesOutputDto,
} from './dtos/get-episode.dto';
import {
  CreateEpisodeDto,
  CreateEpisodeOutputDto,
} from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetAllPodcastOutputDto)
  getAllPodcasts(): GetAllPodcastOutputDto {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutputDto)
  createPodcast(
    @Args('input') createPodcastDto: CreatePodcastDto,
  ): CreatePodcastOutputDto {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => GetPodcastOutputDto)
  getPodcast(@Args('podcastId') podcastId: number): GetPodcastOutputDto {
    return this.podcastsService.getPodcast(podcastId);
  }

  @Mutation((returns) => CoreErrOutputDto)
  deletePodcast(@Args('podcastId') podcastId: number): CoreErrOutputDto {
    return this.podcastsService.deletePodcast(podcastId);
  }

  @Mutation((returns) => CoreErrOutputDto)
  updatePodcast(
    @Args('podcastId') podcastId: number,
    @Args('input') updatePodcastDto: UpdatePodcastDto,
  ): CoreErrOutputDto {
    return this.podcastsService.updatePodcast(podcastId, updatePodcastDto);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly episodeService: PodcastsService) {}

  @Query((returns) => GetEpisodesOutputDto)
  getEpisodes(@Args('podcastId') podcastId: number): GetEpisodesOutputDto {
    return this.episodeService.getEpisodes(podcastId);
  }

  @Mutation((returns) => CreateEpisodeOutputDto)
  createEpisode(
    @Args('podcastId') podcastId: number,
    @Args('input') createEpisodeDto: CreateEpisodeDto,
  ): CreateEpisodeOutputDto {
    return this.episodeService.createEpisode(podcastId, createEpisodeDto);
  }

  @Query((returns) => FindEpisodeOutputDto)
  findEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): FindEpisodeOutputDto {
    return this.episodeService.findEpisode(podcastId, episodeId);
  }

  @Mutation((returns) => CoreErrOutputDto)
  deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): CoreErrOutputDto {
    return this.episodeService.deleteEpisode(podcastId, episodeId);
  }

  @Mutation((returns) => CoreErrOutputDto)
  updateEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodeDto: UpdateEpisodeDto,
  ): CoreErrOutputDto {
    return this.episodeService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }
}
