import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import {
  CreatePodcastDto,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  EpisodesOutput,
  EpisodesSearchInput,
  PodcastOutput,
  PodcastSearchInput,
  PodcastsOutput,
} from './dtos/podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => PodcastsOutput)
  getAllPodcasts(): Promise<PodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastDto: CreatePodcastDto,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => PodcastOutput)
  getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  updatePodcast(
    @Args('input') updatePodcastDto: UpdatePodcastDto,
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastDto);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query((returns) => EpisodesOutput)
  getEpisodes(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  createEpisode(
    @Args('input') createEpisodeDto: CreateEpisodeDto,
  ): Promise<CoreOutput> {
    return this.podcastService.createEpisode(createEpisodeDto);
  }

  @Mutation((returns) => CoreOutput)
  updateEpisode(
    @Args('input') updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeDto);
  }

  @Mutation((returns) => CoreOutput)
  deleteEpisode(
    @Args('input') episodesSearchInput: EpisodesSearchInput,
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }
}
