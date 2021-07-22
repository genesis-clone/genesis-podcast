import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import {
  CreatePodcastDto,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { CoreOutput } from '../common/dtos/output.dto';
import {
  EpisodesOutput,
  EpisodesSearchInput,
  FindEpisodeOutput,
  PodcastOutput,
  PodcastsOutput,
} from './dtos/podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
  ) {}

  async getAllPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcasts.find({ relations: ['episodes'] });
      return {
        podcasts,
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: `Something went wrong`,
      };
    }
  }

  async createPodcast(
    createPodcastDto: CreatePodcastDto,
  ): Promise<CreatePodcastOutput> {
    try {
      const newPodcast = this.podcasts.create({
        ...createPodcastDto,
      });
      await this.podcasts.save(newPodcast);
      return {
        id: newPodcast.id,
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: `Podcast not created`,
      };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(id, {
        relations: ['episodes'],
      });
      if (!podcast) {
        return {
          ok: false,
          error: `id: ${id} Podcast doesn't exist!`,
        };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (e) {
      return {
        ok: false,
        error: `Something went wrong!`,
      };
    }
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      await this.podcasts.delete(id);
      return { ok };
    } catch (error) {
      return { ok: false, error: `Something went wrong!` };
    }
  }

  async updatePodcast({ id, ...rest }: UpdatePodcastDto): Promise<CoreOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      await this.podcasts.save({ ...podcast, ...rest });
      return { ok };
    } catch (error) {
      return { ok: false, error: `Something went wrong!` };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const { ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const episodes = await this.episodes.find({
        where: { podcast: { id: podcastId } },
        order: { id: 1 },
      });
      return { ok: true, episodes };
    } catch (error) {
      return { ok: false, error: `Something went wrong` };
    }
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<CoreOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const newEpisode = { title, category, podcast };
      this.episodes.save(this.episodes.create(newEpisode));
      return { ok };
    } catch (error) {
      return { ok: false, error: `Something went wrong!` };
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    try {
      const { podcast, error, ok } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      if (!podcast.episodes.find((episode) => episode.id === episodeId)) {
        return { ok: false, error: `episode doesn't exist` };
      }
      await this.episodes.delete(episodeId);
      return { ok };
    } catch (error) {
      return { ok: false, error: `Something went wrong` };
    }
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const episode = this.episodes.findOne(episodeId, {
        where: { podcast: { id: podcastId } },
      });
      if (!episode) {
        return { ok: false, error: `episode doesn't exist` };
      }
      this.episodes.save({ ...episode, ...rest });
      return { ok };
    } catch (error) {
      return { ok: false, error: `Something went wrong` };
    }
  }
}
