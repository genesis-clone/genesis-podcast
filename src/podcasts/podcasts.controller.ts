import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('/podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts(): { podcasts: Podcast[]; err: string | null } {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  createPodcast(@Body() createPodcastDto: CreatePodcastDto): {
    id: number;
    err: string | null;
  } {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Get('/:podcastID')
  getPodcast(@Param('podcastID') podcastID: string): {
    podcast: Podcast;
    err: string | null;
  } {
    return this.podcastsService.getPodcast(podcastID);
  }

  @Delete('/:podcastID')
  deletePodcast(@Param('podcastID') podcastID: string): { err: string | null } {
    return this.podcastsService.deletePodcast(podcastID);
  }

  @Patch('/:podcastID')
  updatePodcast(
    @Param('pdocastID') podcastID: string,
    @Body() updatePodcastData: Podcast,
  ): { err: string | null } {
    return this.podcastsService.updatePodcast(podcastID, updatePodcastData);
  }

  @Get('/:podcastID/episodes')
  getEpisodes(@Param('podcastID') podcastID: string): {
    episodes: Episode[];
    err: string | null;
  } {
    return this.podcastsService.getEpisodes(podcastID);
  }

  @Get('/:podcastID/episodes/:episodeID')
  findEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
  ): { episode: Episode; err: string | null } {
    return this.podcastsService.findEpisode(podcastID, episodeID);
  }

  @Post('/:podcastID/episodes')
  createEpisode(
    @Param('podcastID') podcastID: string,
    @Body() episodeData: Episode,
  ): { id: number; err: string | null } {
    return this.podcastsService.createEpisode(podcastID, episodeData);
  }

  @Delete('/:podcastID/episodes/:episodeID')
  deleteEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
  ): { err: string | null } {
    return this.podcastsService.deleteEpisode(podcastID, episodeID);
  }

  @Patch('/:podcastID/episodes/:episodeID')
  updateEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
    @Body() updateEpisodeData: Episode,
  ): { err: string | null } {
    return this.podcastsService.updateEpisode(
      podcastID,
      episodeID,
      updateEpisodeData,
    );
  }
}
