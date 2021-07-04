import { Injectable } from '@nestjs/common';
import {
  CreatePodcastDto,
  CreatePodcastOutputDto,
} from './dtos/create-podcast.dto';
import { GetPodcastOutputDto } from './dtos/get-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { CoreErrOutputDto } from './dtos/output.dto';
import {
  FindEpisodeOutputDto,
  GetEpisodesOutputDto,
} from './dtos/get-episode.dto';
import {
  CreateEpisodeDto,
  CreateEpisodeOutputDto,
} from './dtos/create-episode.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): { podcasts: Podcast[]; err: string | null } {
    return { podcasts: this.podcasts, err: null };
  }

  createPodcast({ title, category }: CreatePodcastDto): CreatePodcastOutputDto {
    const id = Date.now();
    this.podcasts.push({
      id,
      title,
      category,
      rating: 0,
      episodes: [],
    });
    return { id, err: null };
  }

  getPodcast(podcastID: number): GetPodcastOutputDto {
    const foundPodcast = this.podcasts.filter(
      (podcast) => podcast.id === +podcastID,
    );
    if (foundPodcast.length === 0) {
      return { podcast: null, err: `podcast with ID: ${podcastID} not found.` };
    }
    if (foundPodcast.length === 1) {
      return { podcast: foundPodcast[0], err: null };
    }
    if (foundPodcast.length > 1) {
      return {
        podcast: null,
        err: `more than one item with the same ID: ${podcastID}`,
      };
    }
  }

  deletePodcast(podcastID: number): CoreErrOutputDto {
    const { err } = this.getPodcast(podcastID);
    if (err) {
      return { err };
    }
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== podcastID);
    return { err: null };
  }

  updatePodcast(
    podcastID: number,
    updatePodcastDto: UpdatePodcastDto,
  ): CoreErrOutputDto {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast(podcastID);
    if (deleteErr) {
      return { err: deleteErr };
    }
    this.podcasts.push({
      ...podcast,
      ...updatePodcastDto,
    });
  }

  getEpisodes(podcastID: number): GetEpisodesOutputDto {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { episodes: null, err: findErr };
    }
    return { episodes: podcast.episodes, err: null };
  }

  createEpisode(
    podcastID: number,
    createEpisodeDto: CreateEpisodeDto,
  ): CreateEpisodeOutputDto {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { id: null, err: findErr };
    }
    const id = Date.now();
    podcast.episodes.push({
      id,
      rating: 0,
      ...createEpisodeDto,
    });
    return { id, err: null };
  }

  findEpisode(podcastID: number, episodeID: number): FindEpisodeOutputDto {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { episode: null, err: findErr };
    }
    const episode = podcast.episodes.find(
      (episode) => episode.id === +episodeID,
    );
    if (!episode) {
      return { episode: null, err: `Episode with ID: ${episodeID} not found.` };
    }
    return { episode, err: null };
  }

  deleteEpisode(podcastID: number, episodeID: number): CoreErrOutputDto {
    this.findEpisode(podcastID, episodeID);
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { err: findErr };
    }
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== +episodeID,
    );
    return { err: null };
  }

  updateEpisode(
    podcastID: number,
    episodeID: number,
    updateEpisodeDto: UpdateEpisodeDto,
  ): CoreErrOutputDto {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { err: findErr };
    }
    const { episode } = this.findEpisode(podcastID, episodeID);
    if (!episode) {
      return { err: `Episode ID: ${episodeID} not found` };
    }
    this.deleteEpisode(podcastID, episodeID);
    podcast.episodes.push({
      ...episode,
      ...updateEpisodeDto,
    });
    return { err: null };
  }
}
