import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Get('/:podcastID')
  getOnePodcast(@Param('podcastID') podcastID: string): Podcast {
    return this.podcastsService.getOnePodcast(podcastID);
  }

  @Post()
  createPodcast(@Body() podcastData: Podcast) {
    return this.podcastsService.createPodcast(podcastData);
  }

  @Delete('/:podcastID')
  deletePodcast(@Param('podcastID') podcastID: string) {
    return this.podcastsService.deletePodcast(podcastID);
  }

  @Patch('/:podcastID')
  updatePodcast(
    @Param('pdocastID') podcastID: string,
    @Body() updatePodcastData: Podcast,
  ) {
    return this.podcastsService.updatePodcast(podcastID, updatePodcastData);
  }

  @Get('/:podcastID/episodes')
  getAllEpisodes(@Param('podcastID') podcastID: string): Episode[] {
    return this.podcastsService.getAllEpisodes(podcastID);
  }

  @Get('/:podcastID/episodes/:episodeID')
  getOneEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
  ): Episode {
    return this.podcastsService.getOneEpisode(podcastID, episodeID);
  }

  @Post('/:podcastID/episodes')
  createEpisode(
    @Param('podcastID') podcastID: string,
    @Body() episodeData: Episode,
  ) {
    return this.podcastsService.createEpisode(podcastID, episodeData);
  }

  @Delete('/:podcastID/episodes/:episodeID')
  deleteEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
  ) {
    return this.podcastsService.deleteEpisode(podcastID, episodeID);
  }

  @Patch('/:podcastID/episodes/:episodeID')
  updateEpisode(
    @Param('podcastID') podcastID: string,
    @Param('episodeID') episodeID: string,
    @Body() updateEpisodeData: Episode,
  ) {
    return this.podcastsService.updateEpisode(
      podcastID,
      episodeID,
      updateEpisodeData,
    );
  }
}
