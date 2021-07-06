import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import {
  EpisodesOutput,
  FindEpisodeOutput,
  PodcastOutput,
} from './dtos/podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';
import { CoreOutput } from './dtos/output.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => [Podcast])
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CoreOutput)
  createPodcast(@Args('input') createPodcastDto: CreatePodcastDto): CoreOutput {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => PodcastOutput)
  getPodcast(@Args('podcastId') podcastId: number): PodcastOutput {
    return this.podcastsService.getPodcast(podcastId);
  }

  @Mutation((returns) => CoreOutput)
  deletePodcast(@Args('podcastId') podcastId: number): CoreOutput {
    return this.podcastsService.deletePodcast(podcastId);
  }

  @Mutation((returns) => CoreOutput)
  updatePodcast(
    @Args('podcastId') podcastId: number,
    @Args('input') updatePodcastDto: UpdatePodcastDto,
  ): CoreOutput {
    return this.podcastsService.updatePodcast(podcastId, updatePodcastDto);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly episodeService: PodcastsService) {}

  @Query((returns) => EpisodesOutput)
  getEpisodes(@Args('podcastId') podcastId: number): EpisodesOutput {
    return this.episodeService.getEpisodes(podcastId);
  }

  @Mutation((returns) => CoreOutput)
  createEpisode(
    @Args('podcastId') podcastId: number,
    @Args('input') createEpisodeDto: CreateEpisodeDto,
  ): CoreOutput {
    return this.episodeService.createEpisode(podcastId, createEpisodeDto);
  }

  @Query((returns) => FindEpisodeOutput)
  findEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): FindEpisodeOutput {
    return this.episodeService.findEpisode(podcastId, episodeId);
  }

  @Mutation((returns) => CoreOutput)
  deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): CoreOutput {
    return this.episodeService.deleteEpisode(podcastId, episodeId);
  }

  @Mutation((returns) => CoreOutput)
  updateEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodeDto: UpdateEpisodeDto,
  ): CoreOutput {
    return this.episodeService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }
}
