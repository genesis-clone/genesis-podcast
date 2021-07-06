import { Injectable } from '@nestjs/common';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import {
  EpisodesOutput,
  FindEpisodeOutput,
  PodcastOutput,
} from './dtos/podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  createPodcast({ title, category }: CreatePodcastDto): CoreOutput {
    const id = Date.now();
    this.podcasts.push({
      id,
      title,
      category,
      rating: 0,
      episodes: [],
    });
    return { ok: true };
  }

  getPodcast(podcastID: number): PodcastOutput {
    const foundPodcast = this.podcasts.filter(
      (podcast) => podcast.id === +podcastID,
    );
    if (foundPodcast.length === 0) {
      return {
        ok: false,
        err: `podcast with ID: ${podcastID} not found.`,
      };
    }
    if (foundPodcast.length === 1) {
      return { podcast: foundPodcast[0], ok: true, err: null };
    }
    if (foundPodcast.length > 1) {
      return {
        ok: false,
        err: `more than one item with the same ID: ${podcastID}`,
      };
    }
  }

  deletePodcast(podcastID: number): CoreOutput {
    const { err } = this.getPodcast(podcastID);
    if (err) {
      return { ok: false, err };
    }
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== podcastID);
    return { ok: true };
  }

  updatePodcast(
    podcastID: number,
    updatePodcastDto: UpdatePodcastDto,
  ): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast(podcastID);
    if (deleteErr) {
      return { ok: false, err: deleteErr };
    }
    this.podcasts.push({
      ...podcast,
      ...updatePodcastDto,
    });
    return { ok: true };
  }

  getEpisodes(podcastID: number): EpisodesOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    return { episodes: podcast.episodes, ok: true };
  }

  createEpisode(
    podcastID: number,
    createEpisodeDto: CreateEpisodeDto,
  ): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const id = Date.now();
    podcast.episodes.push({
      id,
      ...createEpisodeDto,
    });
    return { ok: true };
  }

  findEpisode(podcastID: number, episodeID: number): FindEpisodeOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const episode = podcast.episodes.find(
      (episode) => episode.id === +episodeID,
    );
    if (!episode) {
      return { ok: false, err: `Episode with ID: ${episodeID} not found.` };
    }
    return { episode, ok: true, err: null };
  }

  deleteEpisode(podcastID: number, episodeID: number): CoreOutput {
    this.findEpisode(podcastID, episodeID);
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== +episodeID,
    );
    return { ok: true };
  }

  updateEpisode(
    podcastID: number,
    episodeID: number,
    updateEpisodeDto: UpdateEpisodeDto,
  ): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastID);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const { episode } = this.findEpisode(podcastID, episodeID);
    if (!episode) {
      return { ok: false, err: `Episode ID: ${episodeID} not found` };
    }
    this.deleteEpisode(podcastID, episodeID);
    podcast.episodes.push({
      ...episode,
      ...updateEpisodeDto,
    });
    return { ok: true };
  }
}
